import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import {incrementNumberOfLogsAction} from "./incrementNumberOfLogsAction"
import {updateLogDataAction} from "./updateLogDataAction"

export class Store {
  numberOfLogs: number = 0;
  logData: string = "";

  incrementNumberOfLogs: () => void;
  updateLogData: () =>  void;

  constructor() {
    makeAutoObservable(this)
    this.incrementNumberOfLogs = () => incrementNumberOfLogsAction(this);
    this.updateLogData = () => updateLogDataAction(this)
  }
}

export const LogsStore = createContext(new Store());
