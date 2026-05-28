#!/usr/bin/env node
import fs from "fs";
import path from "path";

const root = process.cwd();
const skip = new Set(["node_modules", ".next", ".git", "package-lock.json"]);

const replacements = [
  [/Dunrite Global/g, "Dunrite Global"],
  [/Dunrite Global/g, "Dunrite Global"],
  [/dunriteglobal/g, "dunriteglobal"],
  [/dunrite-global-bot/g, "dunrite-global-bot"],
  [/ref=dunriteglobal/g, "ref=dunriteglobal"],
  ['"metadata[source]": "dunrite-global"', '"metadata[source]": "dunrite-global"'],
];

function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (skip.has(ent.name)) continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p);
    else if (/\.(md|mjs|tsx?|json|html|yml)$/.test(ent.name)) {
      let c = fs.readFileSync(p, "utf8");
      let n = c;
      for (const [re, rep] of replacements) n = n.replace(re, rep);
      if (n !== c) {
        fs.writeFileSync(p, n);
        console.log("updated", path.relative(root, p));
      }
    }
  }
}

walk(root);
