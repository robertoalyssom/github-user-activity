import { eventActions } from "./eventActions.js";

export function setEventMessage(repoEvents) {
  const eventMessages = repoEvents.map((event) =>
    eventActions[event.type]?.(event),
  );
  return eventMessages.filter(Boolean);
}
