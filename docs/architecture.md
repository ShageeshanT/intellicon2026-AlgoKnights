# How WAYLO is built

This is a tour of the private codebase, so the panel can see how it's put together without us publishing the code.

## The flow

1. A requester posts what they need: each item exactly as it should be bought, the most they'll pay for it, a reward and a deadline. They can also browse travellers landing in their city in the next 3 days, week, two weeks, month or three months and send the request straight to one of them.
2. Verified travellers whose trip fits the route, the arrival date and their spare luggage make offers.
3. The requester accepts one offer and pays everything into escrow in one go: the item budget, the reward, a duty allowance and our 8% fee.
4. The traveller buys each item new, uploads the receipt and a photo, and confirms the purchase. From that point the order can no longer be cancelled.
5. They declare the items at customs with a sheet the app prepares and record any duty they paid.
6. They meet in a public place. The requester checks the items and reads out a six digit code. When the traveller enters it, escrow pays them the item cost, the duty and the reward, and anything unused goes back to the requester.

If something goes wrong either side can open a dispute. Escrow freezes and an admin decides: pay the traveller, refund the requester, or split it.

## Stack

* Next.js 16 with the App Router and server actions, written in TypeScript in strict mode
* Tailwind CSS 4
* PostgreSQL through Drizzle ORM, with versioned SQL migrations that run when the app starts
* An embedded Postgres (PGlite) for local development and for the tests, so tests never touch real data

## How the code is organised

```
src/app             one folder per screen, plus API routes for files, health checks and the scheduled job
src/app/actions.ts  every form posts to a server action here
src/lib             the business rules, kept away from the UI
  workflow.ts       the order state machine, the escrow ledger, disputes and deadlines
  money.ts          fees, currency conversion and the quote
  rules.ts          which items are allowed, held for review or blocked, and the value limits
  masking.ts        hiding phone numbers, emails and links in chat
src/components      shared UI and the panels of the order page
src/db              the database schema
drizzle             SQL migrations
scripts             workflow tests, a browser walkthrough and demo data
deploy/aws          server setup and the deploy script
```

The rule we stuck to: pages never change data on their own. Every change goes through one function in `workflow.ts`, which checks who is asking and whether the order is in the right state, then writes everything in a single database transaction. The server actions are thin. They read the form, call the workflow, and show either the result or a plain error message.

## Orders

An order moves through In review (only if an item needs a look), Open, Accepted, Purchased and Delivered. It can also end as Expired, Cancelled, Not approved, or go to In dispute and then Resolved. Each step has exactly one function that can make it happen, and each of those refuses if the order isn't in the state it expects.

## Money

* Amounts are stored as whole numbers in the smallest unit of the currency, so nothing drifts through rounding.
* Item prices are entered in the shop's currency and converted at a rate that is locked when the request is posted.
* Every payment, release, refund and fee is a row in an append only ledger. When an order closes, its rows add up to exactly zero, and the tests check that for every way an order can end.

## Trust and safety

* **Identity checks (KYC).** Every member who wants to pay or carry uploads a photo of their national ID or passport and a selfie. An admin compares them before the member can make an offer or pay. The documents are only visible to admins.
* **Value limits.** A new member can request or carry up to USD 150 per order. The limit rises by USD 100 with every completed order, up to USD 1,000.
* **Item rules.** Medicines, food, phones, power banks and used items are blocked. Cosmetics and wireless electronics are held until an admin reviews them.
* **Chat.** Phone numbers, emails, links and numbers spelled out in words are hidden before a message is saved, and repeated attempts are flagged to the admins.
* **Handover code.** It's derived from a secret key with HMAC, so nothing about it is stored in the database. Five wrong tries lock the order and send it to an admin.
* **Uploads.** Receipts and photos can only be opened by the two people on that order and by admins.
* **Deadlines.** A scheduled job expires requests nobody took, cancels orders the traveller never bought for, and escalates handovers that are late.

## Tests

The order workflow has 17 automated checks. They run against an in memory database on every push, and nothing deploys unless they pass. They cover:

1. Contact details are hidden in chat
2. Blocked items are refused and items that need review are held
3. Escrow is funded with the items, reward, duty allowance and fee
4. A traveller can't spend more than the agreed budget
5. The requester can't cancel once the items are bought
6. A wrong handover code doesn't release any money
7. The right code settles the order and the ledger adds up to zero
8. Both sides can rate each other once, and their limits go up
9. A held request waits for an admin and can be rejected
10. Cancelling before purchase refunds everything, fee included
11. A traveller who pulls out puts the request back on the board
12. Members who aren't verified can't offer or pay
13. Duty above the allowance blocks the handover until the requester pays the difference
14. A dispute freezes escrow and an admin can split it
15. Five wrong codes lock the order into a dispute
16. Deadlines apply their automatic outcomes
17. Trying to share contact details is counted against the member

There is also a browser walkthrough that clicks through the app as real users: signing in, posting a request, paying into escrow, chatting, uploading receipts, a wrong and then the right handover code, a dispute, and the admin desk.

## Deployment

The app runs on AWS:

* One EC2 instance (t4g.small, ARM) in the Mumbai region, the closest to Sri Lanka, on Ubuntu 24.04
* Node.js 22, PostgreSQL 16 and Caddy for HTTPS on the same machine, each managed by systemd
* A systemd timer runs the deadline job every 15 minutes
* API Gateway gives it a stable public HTTPS address
* SSH is closed to the internet

## CI/CD

Every push is linted, type checked and has to pass the workflow tests. A push to main that passes is deployed by GitHub Actions:

1. It signs in to AWS with OpenID Connect, so there are no AWS keys stored in GitHub
2. It opens SSH on the server for its own IP address only
3. It uploads the code, builds it on the server and switches to the new release
4. It checks the health endpoint, then closes SSH again, even if something failed along the way

The previous release stays on the server, so we can roll back quickly.

## Still in demo mode

Sign in codes are shown on screen instead of being sent by SMS, and payments are recorded on the escrow ledger without charging a card. Connecting an SMS provider and a payment gateway is the next step before launch.
