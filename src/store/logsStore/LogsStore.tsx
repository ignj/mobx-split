import { action, makeAutoObservable } from "mobx";
import { createContext } from "react";
import { incrementNumberOfLogsAction } from "./actions/incrementNumberOfLogsAction";
import { updateLogDataAction } from "./actions/updateLogDataAction";

export class Store {
  numberOfLogs: number = 0;
  logData: string = "";
  countryData: any = null;

  incrementNumberOfLogs = action(() => incrementNumberOfLogsAction(this));
  updateLogData = action(() => updateLogDataAction(this));

  constructor() {
    makeAutoObservable(this);
  }
}

export const LogsStore = createContext(new Store());