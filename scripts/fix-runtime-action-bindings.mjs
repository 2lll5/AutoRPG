import fs from "node:fs";
import path from "node:path";

const target = path.join(process.cwd(), "lib", "runtimeStory.js");
let source = fs.readFileSync(target, "utf8");

const fixes = [
  [
    'result: ({ revelation, stake }) =>\n        `你把${artifact}',
    'result: ({ artifact, revelation, stake }) =>\n        `你把${artifact}',
  ],
  [
    'result: ({ revelation, sensory }) =>\n        `你當眾說出一個錯誤地點。${figure}',
    'result: ({ figure, revelation, sensory }) =>\n        `你當眾說出一個錯誤地點。${figure}',
  ],
  [
    'result: ({ revelation, stake }) =>\n        `${figure}說自己從未見過${artifact}',
    'result: ({ figure, artifact, revelation, stake }) =>\n        `${figure}說自己從未見過${artifact}',
  ],
  [
    'result: ({ revelation, stake }) =>\n        `你命令其他人收起武器，給${figure}',
    'result: ({ figure, revelation, stake }) =>\n        `你命令其他人收起武器，給${figure}',
  ],
  [
    'result: ({ pressure, stake }) =>\n        `你先把${artifact}',
    'result: ({ artifact, figure, pressure, stake }) =>\n        `你先把${artifact}',
  ],
  [
    'result: ({ pressure, stake }) =>\n        `你讓傷者和證人先撤',
    'result: ({ figure, pressure, stake }) =>\n        `你讓傷者和證人先撤',
  ],
];

let applied = 0;
for (const [before, after] of fixes) {
  if (!source.includes(before)) {
    if (!source.includes(after)) {
      throw new Error(`Dynamic action binding pattern not found: ${before.slice(0, 80)}`);
    }
    continue;
  }
  source = source.replace(before, after);
  applied += 1;
}

const forbidden = [
  /result:\s*\(\{ revelation, stake \}\)[\s\S]{0,120}\$\{artifact\}/,
  /result:\s*\(\{ revelation, sensory \}\)[\s\S]{0,180}\$\{figure\}/,
  /result:\s*\(\{ pressure, stake \}\)[\s\S]{0,180}\$\{(?:artifact|figure)\}/,
];
for (const pattern of forbidden) {
  if (pattern.test(source)) throw new Error(`Unbound dynamic action variable remains: ${pattern}`);
}

fs.writeFileSync(target, source, "utf8");
console.log(`Verified dynamic action bindings; applied ${applied} fixes.`);
