// `node scripts/check-seo.mjs out` (the last step of `npm run build`): checks every built page in out/ for a title
// under 60 characters, a description of at most 155, one H1, a canonical link ending in a slash and JSON-LD that
// parses; and every page, the 404 included, for words the site never uses: "AI" as a word, Claude, Anthropic,
// "machine learning", "smart", "fake", "forecast" outside a sentence about the National Weather Service, and the em
// dash (U+2014). Exits 1 on any problem.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const out = path.resolve(process.argv[2] ?? "out");
const pages = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (name === "_next" || name === "_not-found" || name === "404") continue;
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) walk(full);
    else if (name === "index.html") pages.push(full);
  }
})(out);
const notFound = path.join(out, "404.html");

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
let problems = 0;
const fail = (page, message) => {
  problems += 1;
  console.log(`  FAIL ${page}: ${message}`);
};

/** What a visitor or a search engine reads: visible text, meta content, alt and aria labels, and the JSON-LD. */
function readable(html) {
  const jsonLd = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  const attributes = [...html.matchAll(/\s(?:content|alt|aria-label|title|placeholder)="([^"]*)"/g)].map((m) => m[1]);
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
  const visible = html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ");
  return decode([title, visible, ...attributes, ...jsonLd].join("\n"));
}

function checkWords(url, text) {
  const words = [
    [/\bAI\b/, '"AI"'],
    [/\bClaude\b/i, "Claude"],
    [/\bAnthropic\b/i, "Anthropic"],
    [/machine learning/i, '"machine learning"'],
    [/\bsmart\b/i, '"smart"'],
    [/\bfake\b/i, '"fake"'],
    [/\u2014/, "an em dash"],
  ];
  for (const [pattern, name] of words) if (pattern.test(text)) fail(url, `contains ${name}`);
  // "forecast" only for the weather: each sentence that says it must be about the National Weather Service.
  for (const sentence of text.split(/(?<=[.!?])\s+|\n+/)) {
    if (/forecast/i.test(sentence) && !/Weather Service/.test(sentence)) {
      fail(url, `"forecast" outside the National Weather Service: "${sentence.trim().slice(0, 120)}"`);
    }
  }
}

for (const file of pages.sort()) {
  const url = "/" + path.relative(out, path.dirname(file)).replace(/\\/g, "/") + (file === path.join(out, "index.html") ? "" : "/");
  const html = readFileSync(file, "utf8");
  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
  const description = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "");
  const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? "";
  console.log(`${url}  title ${title.length}  description ${description.length}  h1 ${h1s}\n    ${title}`);
  if (!title) fail(url, "no title");
  if (title.length >= 60) fail(url, `title is ${title.length} characters`);
  if (!description) fail(url, "no description");
  if (description.length > 155) fail(url, `description is ${description.length} characters`);
  if (h1s !== 1) fail(url, `${h1s} H1s`);
  if (!canonical.startsWith("https://winerybooks.com/") || !canonical.endsWith("/")) fail(url, `canonical "${canonical}"`);
  if (!/<meta property="og:image" content="https:\/\/winerybooks\.com\/opengraph-image\.png/.test(html)) fail(url, "no Open Graph image");
  const jsonLd = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (jsonLd.length === 0) fail(url, "no JSON-LD");
  for (const [, json] of jsonLd) {
    try {
      JSON.parse(json);
    } catch {
      fail(url, "JSON-LD does not parse");
    }
  }
  checkWords(url, readable(html));
}

if (existsSync(notFound)) {
  const html = readFileSync(notFound, "utf8");
  if ((html.match(/<h1[\s>]/g) ?? []).length !== 1) fail("/404", "not one H1");
  checkWords("/404", readable(html));
} else {
  fail("/404", "out/404.html is missing");
}
for (const file of ["CNAME", "robots.txt", "sitemap.xml", "favicon.ico", "opengraph-image.png"]) {
  if (!existsSync(path.join(out, file))) fail(file, "missing from out/");
}

console.log(problems ? `\n${problems} problem(s)` : `\n${pages.length} pages and the 404 OK`);
process.exit(problems ? 1 : 0);
