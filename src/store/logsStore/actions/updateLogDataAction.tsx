import { LogsStore } from "../LogsStore";

export function updateLogDataAction(parentStore: LogsStore) {
    parentStore.logData = new Date().getTime().toString();
}