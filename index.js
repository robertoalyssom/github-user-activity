#!/usr/bin/env node
import { error } from "console";
import process from "process";

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

eventsMessages.forEach((message) => console.log("- ", message));

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
  const onRepo = (text, { name }) => `${text} on ${name}`;
  const withCount = (verb, noun) => (event) =>
    onRepo(`${verb} ${event.count} ${noun}`, event);

  const actions = {
    CommitCommentEvent: withCount("Created", "commit comment"),
    CreateEvent: withCount("Created, branch or tag"),
    DeleteEvent: withCount("Deleted", "branch or tag"),
    DiscussionCommentEvent: withCount("Commented on", "discussion"),
    DiscussionEvent: withCount("Created or updated", "discussion"),
    DeploymentEvent: withCount("Created", "deployment"),
    DeploymentStatusEvent: withCount("Updated", "deployment status"),
    DownloadEvent: withCount("Created", "download"),
    FollowEvent: withCount("Followed", "user"),
    ForkEvent: withCount("Forked", "repository"),
    GollumEvent: withCount("Updated", "wiki page"),
    IssueCommentEvent: withCount("Commented on", "issue"),
    IssuesEvent: withCount("Opened, closed, or updated", "issue"),
    MemberEvent: withCount("Added", "collaborator"),
    PageBuildEvent: withCount("Triggered", "GitHub Pages build"),
    ProjectCardEvent: withCount("Updated", "project card"),
    ProjectColumnEvent: withCount("Updated", "project column"),
    ProjectEvent: withCount("Updated", "project"),
    PublicEvent: withCount("Made", "repository public"),
    PullRequestEvent: withCount("Opened, closed, or updated", "pull request"),
    PullRequestReviewEvent: withCount("Reviewed", "pull request"),
    PullRequestReviewCommentEvent: withCount(
      "Commented on",
      "pull request review",
    ),
    PullRequestReviewThreadEvent: withCount(
      "Updated",
      "pull request review thread",
    ),
    PushEvent: ({ name, count }) => `Pushed ${count} commits to ${name}`,
    RepositoryEvent: withCount("Created or updated", "repository"),
    RepositoryImportEvent: withCount("Imported", "repository"),
    ReleaseEvent: withCount("Published", "release"),
    StatusEvent: withCount("Updated", "commit status"),
    SponsorshipEvent: withCount("Created or updated", "sponsorship"),
    TeamAddEvent: withCount("Added", "user or repository to a team"),
    WatchEvent: withCount("Starred", "repository"),
  };

  const eventMessages = repoEvents.map((event) => actions[event.type]?.(event)); // If the event type is not in the actions object, undefined is returned
  return eventMessages.filter(Boolean); // Filter out any falsy values (undefined)
}
