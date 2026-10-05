// The app itself lives in a private repo. Every button on this page leads to it.
export const APP_URL = (process.env.NEXT_PUBLIC_APP_URL ?? "https://odcaum2ste.execute-api.ap-south-1.amazonaws.com").replace(/\/$/, "");
export const SIGN_IN_URL = `${APP_URL}/login`;

// Used to build absolute links for link previews. CI sets it to the GitHub Pages address.
export const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";
