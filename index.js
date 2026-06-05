#!/usr/bin/env nodeiimport process from "process";
import { fetchGithub } from "./services/fetchGithub.js";
import { setEventMessage } from "./src/setEventMessage.js";
import { summarizeEvents } from "./src/summarizeEvents.js";
import printEventsWithColors from "./src/printEventsWithColors.js";

const [, , ...args] = process.argv;
const [username] = args;

if (!username) {
  console.log("Usage: gh-act <username>");
  process.exit(1);
}
console.log(`User: ${username}`);

const githubEvents = await fetchGithub(username);
const repoEvents = summarizeEvents(githubEvents);
const eventsMessages = setEventMessage(repoEvents);

eventsMessages.forEach((message) => printEventsWithColors(message));
