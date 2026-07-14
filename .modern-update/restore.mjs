import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import zlib from "node:zlib";

const root = process.cwd();
const base = path.join(root, ".modern-update");
const manifest = JSON.parse(fs.readFileSync(path.join(base, "manifest.json"), "utf8"));
let encoded = "";
for (let index = 0; index < manifest.parts; index += 1) {
  encoded += fs.readFileSync(path.join(base, "parts", `part${String(index).padStart(2, "0")}`), "utf8").trim();
}
const raw = zlib.gunzipSync(Buffer.from(encoded, "base64"));
const digest = crypto.createHash("sha256").update(raw).digest("hex");
if (digest !== manifest.sha256) throw new Error(`Modern story bundle checksum mismatch: ${digest}`);
const files = JSON.parse(raw.toString("utf8"));
for (const [relativePath, content] of Object.entries(files)) {
  const target = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content, "utf8");
}
console.log(`Restored ${Object.keys(files).length} modern commercial-fantasy source files.`);
