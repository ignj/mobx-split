import { action, makeAutoObservable } from "mobx";
import { createContext } from "react";
import { incrementNumberOfLogsAction } from "./incrementNumberOfLogsAction";
import { updateLogDataAction } from "./updateLogDataAction";
import { getCountryDataAction } from "./getCountryDataAction";

export class Store {
  numberOfLogs: number = 0;
  logData: string = "";
  countryData: any = null;

  incrementNumberOfLogs = action(() => incrementNumberOfLogsAction(this));
  updateLogData = action(() => updateLogDataAction(this));
  getCountryData = action(async (name: string) => await getCountryDataAction(this, name));

  constructor() {
    makeAutoObservable(this);
  }
}

export const LogsStore = createContext(new Store());
