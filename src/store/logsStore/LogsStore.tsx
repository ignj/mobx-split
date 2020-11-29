import { makeAutoObservable } from "mobx";
import { incrementNumberOfLogsAction } from "./actions/incrementNumberOfLogsAction";
import { updateLogDataAction } from "./actions/updateLogDataAction";

export class LogsStore {
  numberOfLogs: number = 0;
  logData: string = "";
  countryData: any = null;

  incrementNumberOfLogs = () => incrementNumberOfLogsAction(this);
  updateLogData = () => updateLogDataAction(this);

  constructor() {
    makeAutoObservable(this);
  }
}
