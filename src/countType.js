export function countType(events, accRepo) {
  let count = 0;

  events.forEach((event) => {
    const isSameRepo = event.repo.name === accRepo.name;
    const isSameType = event.type === accRepo.type;

    if (isSameRepo && isSameType) count++;
  });
  return count;
}
