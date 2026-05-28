#!/usr/bin/env node
import { error } from "console";
import process from "process";
import { eventActions } from "./eventActions.js";

const [, , ...args] = process.argv;
const [username] = args;

if (!username) {
  console.log("Usage: gh-act <username>");
  process.exit(1);
}
console.log(`User: ${username}`);

const githubEvents = await fetchGithub();
const repoEvents = filterRepo(githubEvents);
const eventsMessages = setEventMessage(repoEvents);

eventsMessages.forEach((message) => console.log("-", message));

async function fetchGithub() {
  try {
    const endpoint = `https://api.github.com/users/${username}/events`;
    const response = await fetch(endpoint);
    const events = await response.json();

    if (response.status !== 200) throw Error("Error fetching GitHub events");

    return events;
  } catch (e) {
    console.log(e.message);
    return [];
  }
}

function filterRepo(events) {
  const repos = [];

  events.forEach((event, i, events) => {
    const hasRepoAndEvent = repos.some(
      (repo) => event.repo.name === repo.name && event.type === repo.type,
    );

    if (!hasRepoAndEvent) {
      const accRepo = {};
      accRepo.name = event.repo.name;
      accRepo.type = event.type;
      accRepo.count = countType(events, accRepo);
      repos.push(accRepo);
    }
  });
  return repos;
}

function countType(events, accRepo) {
  return events.filter((event) => {
    const isSameRepo = event.repo.name === accRepo.name;
    const isSameType = event.type === accRepo.type;

    return isSameRepo && isSameType;
  }).length;
}

function setEventMessage(repoEvents) {
  const eventMessages = repoEvents.map((event) =>
    eventActions[event.type]?.(event),
  ); // If the event type is not in the eventActions object, undefined is returned
  return eventMessages.filter(Boolean); // Filter out any falsy values (undefined)
}
