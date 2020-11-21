import { Store } from "../LogsStore";

export function updateLogDataAction(parentStore: Store) {
    parentStore.logData = new Date().getTime().toString();
}