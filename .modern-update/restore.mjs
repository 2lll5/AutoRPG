import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import zlib from "node:zlib";

const root = process.cwd();
const stableCommit = "3c8305e67bb69c746e91aa347f525a2e5664422c";
const stableBase = `https://raw.githubusercontent.com/2lll5/AutoRPG/${stableCommit}/.modern-update`;

async function fetchText(url) {
  const response = await fetch(url, {
    headers: { "User-Agent": "AutoRPG-Modern-Source-Restore" },
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Unable to restore modern source (${response.status}): ${url}`);
  return response.text();
}

const manifest = JSON.parse(await fetchText(`${stableBase}/manifest.json`));
let encoded = "";
for (let index = 0; index < manifest.parts; index += 1) {
  const partName = `part${String(index).padStart(2, "0")}`;
  encoded += (await fetchText(`${stableBase}/parts/${partName}`)).trim();
}

const raw = zlib.gunzipSync(Buffer.from(encoded, "base64"));
const digest = crypto.createHash("sha256").update(raw).digest("hex");
if (digest !== manifest.sha256) {
  throw new Error(`Stable modern source checksum mismatch: expected ${manifest.sha256}, received ${digest}`);
}

const files = JSON.parse(raw.toString("utf8"));
for (const [relativePath, content] of Object.entries(files)) {
  const target = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content, "utf8");
}

console.log(`Restored ${Object.keys(files).length} stable modern-fantasy source files from ${stableCommit}.`);
