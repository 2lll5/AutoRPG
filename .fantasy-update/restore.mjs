import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import os from "node:os";
import { spawnSync } from "node:child_process";

const expectedSha256 = "6fe3c85f243ca6ff00c3644d374a04709b5a9a78bc0e229439b99ebf47e22276";
const partsDir = path.join(process.cwd(), ".fantasy-update", "parts");
const partNames = (await fs.readdir(partsDir)).filter((name) => /^part\d+$/.test(name)).sort();
if (partNames.length !== 8) throw new Error(`Expected 8 fantasy bundle parts, found ${partNames.length}.`);

const encoded = (await Promise.all(partNames.map((name) => fs.readFile(path.join(partsDir, name), "utf8")))).join("").replace(/\s+/g, "");
const archive = Buffer.from(encoded, "base64");
const actualSha256 = crypto.createHash("sha256").update(archive).digest("hex");
if (actualSha256 !== expectedSha256) {
  throw new Error(`Fantasy bundle checksum mismatch: expected ${expectedSha256}, got ${actualSha256}.`);
}

const archivePath = path.join(os.tmpdir(), "starfall-crown-world.tar.gz");
await fs.writeFile(archivePath, archive);
const result = spawnSync("tar", ["-xzf", archivePath, "-C", process.cwd()], { stdio: "inherit" });
if (result.status !== 0) throw new Error(`Fantasy bundle extraction failed with status ${result.status}.`);
console.log(`Restored the Starfall Crown world from ${partNames.length} verified parts.`);
