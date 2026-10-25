// Generates the static images in src/app/ (Open Graph image and its alt text, Apple touch icon, favicon.ico, icon.svg).
// They are committed, so the site build never depends on this script or on the network. Re-run after changing them:
//
//   npm run generate:images
//
// Uses Next's bundled ImageResponse (Satori + Resvg) with the site's typeface, Inter Tight: from Google Fonts while
// it runs, or from a folder of @fontsource/inter-tight files when INTER_TIGHT_DIR names one
// (inter-tight-latin-500-normal.woff and -700-normal.woff).
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createElement as h } from "react";
import { ImageResponse } from "next/og.js";

const OUT_DIR = fileURLToPath(new URL("../src/app/", import.meta.url));
const ALT = "winerybooks by Rhea: the tasting room’s books and staffing, daily.";

const INK = "#0e1116";
const PAPER = "#f5f2ed";
const MUTED = "#545961";
const SUBTLE = "#62676f";
const SAGE = "#7f9886";

async function loadFont(weight) {
  if (process.env.INTER_TIGHT_DIR) {
    return readFile(path.join(process.env.INTER_TIGHT_DIR, `inter-tight-latin-${weight}-normal.woff`));
  }
  const css = await fetch(`https://fonts.googleapis.com/css2?family=Inter+Tight:wght@${weight}`).then((r) => r.text());
  const url = css.match(/src:\s*url\(([^)]+\.ttf)\)/)?.[1];
  if (!url) throw new Error(`Could not find a TTF URL for Inter Tight ${weight}`);
  return fetch(url).then((r) => r.arrayBuffer());
}

/** The square mark, as src/components/Logo.tsx draws it: a lower-case w on ink. */
const markSvg = (rounded) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="${rounded ? 15 : 0}" fill="${INK}"/><path d="M15 22l7.5 21L32 26l9.5 17L49 22" fill="none" stroke="#fff" stroke-width="5" stroke-linejoin="miter"/></svg>`;
const dataUri = (svg) => `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

async function png(element, width, height, fonts) {
  const response = new ImageResponse(element, { width, height, fonts });
  return Buffer.from(await response.arrayBuffer());
}

function ogImage() {
  return h(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "64px 80px",
        background: `linear-gradient(100deg, #f8f6f2 0%, ${PAPER} 45%, #ece6dd 100%)`,
        fontFamily: "Inter Tight",
        color: INK,
      },
    },
    h(
      "div",
      { style: { display: "flex", alignItems: "baseline", gap: 12 } },
      h("div", { style: { fontSize: 46, fontWeight: 700, letterSpacing: -1.9 } }, "winerybooks"),
      h("div", { style: { fontSize: 22, fontWeight: 500, color: SUBTLE } }, "by Rhea"),
    ),
    h(
      "div",
      { style: { marginTop: 70, fontSize: 20, fontWeight: 500, letterSpacing: 3.2, color: SUBTLE } },
      "FOR OWNER-RUN WINERIES",
    ),
    h(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          marginTop: 22,
          fontSize: 84,
          fontWeight: 700,
          lineHeight: 1.0,
          letterSpacing: -3,
        },
      },
      h("span", null, "The tasting room’s books"),
      h("span", null, "and staffing, daily."),
    ),
    h(
      "div",
      {
        style: { display: "flex", alignItems: "center", gap: 12, marginTop: "auto", fontSize: 22, fontWeight: 500, color: MUTED },
      },
      h("div", { style: { width: 10, height: 10, borderRadius: 999, background: SAGE } }),
      "winerybooks.com · Rhea is in pilot.",
    ),
  );
}

const icon = (size, rounded) => h("img", { src: dataUri(markSvg(rounded)), width: size, height: size });

/** Packs PNG images into a single .ico file (PNG-in-ICO, supported everywhere). */
function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = 6 + images.length * 16;
  const entries = images.map(({ size, data }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size, 0);
    entry.writeUInt8(size, 1);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });
  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

const [medium, bold] = await Promise.all([loadFont(500), loadFont(700)]);
const fonts = [
  { name: "Inter Tight", data: medium, weight: 500, style: "normal" },
  { name: "Inter Tight", data: bold, weight: 700, style: "normal" },
];

await writeFile(`${OUT_DIR}opengraph-image.png`, await png(ogImage(), 1200, 630, fonts));
await writeFile(`${OUT_DIR}opengraph-image.alt.txt`, ALT);
// iOS rounds the corners itself, so the Apple icon is a full square.
await writeFile(`${OUT_DIR}apple-icon.png`, await png(icon(180, false), 180, 180, fonts));
const icoImages = [];
for (const size of [16, 32, 48]) icoImages.push({ size, data: await png(icon(size, true), size, size, fonts) });
await writeFile(`${OUT_DIR}favicon.ico`, ico(icoImages));
await writeFile(`${OUT_DIR}icon.svg`, `${markSvg(true)}\n`);
console.log(`Wrote opengraph-image.png, its alt text, apple-icon.png, favicon.ico and icon.svg to ${OUT_DIR}`);
