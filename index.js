#!/usr/bin/env node
const fs = require("node:fs");

function argsOf(argv) {
  const out = { all: false, rules: "sample/rules.json", input: "sample/records.json" };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--all") out.all = true;
    else if (argv[i] === "--rules" || argv[i] === "--input") {
      const key = argv[i].slice(2);
      if (!argv[i + 1]) throw new Error("Missing value for " + argv[i]);
      out[key] = argv[++i];
    } else if (argv[i] === "--help") out.help = true;
    else throw new Error("Unknown argument: " + argv[i]);
  }
  return out;
}
function readJson(file) {
  try { return JSON.parse(fs.readFileSync(file, "utf8")); }
  catch (error) { throw new Error("Cannot read " + file + ": " + error.message); }
}
function getField(record, field) {
  return field.split(".").reduce((value, key) => value != null ? value[key] : undefined, record);
}
function test(condition, record) {
  const actual = getField(record, condition.field);
  const expected = condition.value;
  switch (condition.op) {
    case "exists": return (actual !== undefined) === (expected !== false);
    case "eq": return actual === expected;
    case "neq": return actual !== expected;
    case "gt": return typeof actual === "number" && actual > expected;
    case "gte": return typeof actual === "number" && actual >= expected;
    case "lt": return typeof actual === "number" && actual < expected;
    case "lte": return typeof actual === "number" && actual <= expected;
    case "in": return Array.isArray(expected) && expected.includes(actual);
    case "contains": return Array.isArray(actual) ? actual.includes(expected) : typeof actual === "string" && actual.includes(String(expected));
    default: throw new Error("Unsupported operator: " + condition.op);
  }
}
function evaluate(record, rules, all) {
  const trace = [];
  const matches = [];
  for (const rule of rules) {
    if (!rule || typeof rule.id !== "string" || !Array.isArray(rule.when)) throw new Error("Each rule needs a string id and a when array.");
    const checks = rule.when.map(condition => ({ field: condition.field, op: condition.op, expected: condition.value, passed: test(condition, record) }));
    const matched = checks.every(check => check.passed);
    trace.push({ rule: rule.id, matched, checks });
    if (matched) {
      matches.push({ rule: rule.id, action: rule.then });
      if (!all) break;
    }
  }
  return { record, matches, selected: matches[0] || null, trace };
}
function main() {
  const options = argsOf(process.argv.slice(2));
  if (options.help) {
    console.log("Usage: node index.js [--rules file] [--input file] [--all]");
    return;
  }
  const ruleFile = readJson(options.rules), recordsFile = readJson(options.input);
  const rules = Array.isArray(ruleFile) ? ruleFile : ruleFile.rules;
  const records = Array.isArray(recordsFile) ? recordsFile : [recordsFile];
  if (!Array.isArray(rules) || !Array.isArray(records)) throw new Error("Rules must contain a rules array and input must be a record or array.");
  console.log(JSON.stringify(records.map(record => evaluate(record, rules, options.all)), null, 2));
}
try { main(); } catch (error) { console.error(error.message); process.exitCode = 1; }
