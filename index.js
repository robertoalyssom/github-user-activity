#!/usr/bin/env node
import process from "process";

const [, , ...args] = process.argv;
const [name] = args;

if (!name) {
  console.log("Usage: gh-act <username>");
  process.exit(1);
}

console.log(`Name received: ${name}`);
