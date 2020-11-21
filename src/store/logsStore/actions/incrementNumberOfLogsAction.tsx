import { Store } from "../LogsStore";

export function incrementNumberOfLogsAction(parentStore: Store) {
    parentStore.numberOfLogs += 1;
}