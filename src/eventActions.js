// This file contains functions that generate readable descriptions of GitHub events.

const onRepo = (text, { name }) => `${text} on ${name}`;
const withCount = (verb, noun) => (event) =>
  onRepo(`${verb} ${event.count} ${noun}`, event);

export const eventActions = {
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
