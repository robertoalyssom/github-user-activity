# GitHub User Activity

Built as part of the [roadmap.sh Task Tracker challenge](https://roadmap.sh/projects/github-user-activity).

A simple Node.js command-line app that shows the recent public activity of any GitHub user.

The project fetches events from the GitHub API, groups repeated actions by repository and event type, then prints a short colored summary in the terminal.

## Features

- Search public GitHub activity by username.
- Summarize repeated events instead of printing every raw API item.
- Show readable messages for commits, issues, pull requests, stars, forks, releases, and more.
- Print colored output with `chalk` to make activity easier to scan.
- Handle API errors by showing a message and returning an empty activity list.

## Requirements

- Node.js 18 or newer
- npm

## Installation

Clone the repository.

Install the project dependencies:

```bash
npm install
```

To use the command locally from anywhere, link the package:

```bash
npm link
```

## Usage

Run the CLI with a GitHub username:

```bash
github-activity <username>
```

Example:

```bash
github-activity octocat
```

Example output:

```text
User: octocat
- Pushed 3 commits to octocat/Hello-World
- Starred 1 repository on example/project
- Opened, closed, or updated 2 issue on example/repo
```

## Project Structure

```text
.
|-- index.js                     # CLI entry point
|-- services/fetchGithub.js      # Fetches user events from the GitHub API
`-- src/
    |-- countType.js             # Counts matching event types per repository
    |-- eventActions.js          # Converts GitHub event types into messages
    |-- printEventsWithColors.js # Prints colored terminal output
    |-- setEventMessage.js       # Builds the final list of messages
    `-- summarizeEvents.js       # Groups events by repository and type
```

## How It Works

1. The CLI receives a GitHub username.
2. `fetchGithub` requests recent public events from `https://api.github.com/users/<username>/events`.
3. `summarizeEvents` groups the events by repository and event type.
4. `setEventMessage` turns each grouped event into a readable sentence.
5. `printEventsWithColors` prints each sentence with a color based on the action.

## License

ISC
