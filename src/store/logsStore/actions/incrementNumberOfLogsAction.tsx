import { LogsStore } from "../LogsStore";

export function incrementNumberOfLogsAction(parentStore: LogsStore) {
  parentStore.numberOfLogs += 1;
}
