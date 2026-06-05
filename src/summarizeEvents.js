import { countType } from "./countType.js";

export function summarizeEvents(events) {
  const repos = [];
  let accRepo = {};

  events.forEach((event) => {
    const hasRepoAndEvent = repos.some(
      (repo) => event.repo.name === repo.name && event.type === repo.type,
    );

    if (!hasRepoAndEvent) {
      accRepo.name = event.repo.name;
      accRepo.type = event.type;
      accRepo.count = countType(events, accRepo);
      repos.push(accRepo);
      accRepo = {};
    }
  });
  return repos;
}
