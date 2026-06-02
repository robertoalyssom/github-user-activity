export function countType(events, accRepo) {
  return events.filter((event) => {
    const isSameRepo = event.repo.name === accRepo.name;
    const isSameType = event.type === accRepo.type;

    return isSameRepo && isSameType;
  }).length;
}
