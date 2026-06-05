import shalk from "chalk";

const log = console.log;
const VERB_COLORS = {
  Created: "cyanBright",
  Deleted: "red",
  Commented: "white",
  Followed: "yellow",
  Forked: "yellowBright",
  Updated: "blue",
  Opened: "green",
  Added: "cyan",
  Triggered: "white",
  Made: "cyanBright",
  Reviewed: "blueBright",
  Pushed: "greenBright",
  Imported: "bgCyan",
  Published: "bgGreen",
  Starred: "bgYellow",
};

export default function printEventsWithColors(message) {
  const messageArr = message.split(" ");
  const verb = messageArr[0].replace(",", "");
  const next = messageArr[1];
  const color = getColor(verb, next);

  log(shalk[color]("-", message));
}

function getColor(verb, next) {
  if (verb === "Created" && next === "or") return "cyan";
  return VERB_COLORS[verb] ?? "white";
}
