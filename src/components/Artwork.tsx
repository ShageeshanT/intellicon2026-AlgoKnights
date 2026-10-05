import { preload } from "react-dom";
import small from "@/images/hero_640.webp";
import medium from "@/images/hero_1080.webp";
import large from "@/images/hero_1920.webp";

// The site is a static export, so nothing can resize images on request.
// The artwork ships in three sizes instead and the browser picks the one that fits.
const srcSet = `${small.src} 640w, ${medium.src} 1080w, ${large.src} 1920w`;

export function Artwork({ sizes, priority, alt = "", className }: { sizes: string; priority?: boolean; alt?: string; className?: string }) {
  if (priority) preload(large.src, { as: "image", imageSrcSet: srcSet, imageSizes: sizes, fetchPriority: "high" });
  return (
    // A plain img on purpose: next/image would serve the full size file on a static export.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={large.src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={large.width}
      height={large.height}
      fetchPriority={priority ? "high" : "auto"}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={className}
    />
  );
}
