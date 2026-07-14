import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const readyFile = path.join(root, "app", "page.js");
if (fs.existsSync(readyFile)) {
  console.log("AutoRPG source already restored.");
  process.exit(0);
}

const bootstrapDir = path.join(root, ".bootstrap");
const parts = fs.readdirSync(bootstrapDir)
  .filter((name) => name.startsWith("part"))
  .sort()
  .map((name) => fs.readFileSync(path.join(bootstrapDir, name), "utf8"));

if (!parts.length) throw new Error("AutoRPG bootstrap archive is missing.");

const archive = path.join(os.tmpdir(), "autorpg-project.tar.gz");
fs.writeFileSync(archive, Buffer.from(parts.join(""), "base64"));
execFileSync("tar", ["-xzf", archive, "-C", root], { stdio: "inherit" });
console.log("AutoRPG source restored for build.");
