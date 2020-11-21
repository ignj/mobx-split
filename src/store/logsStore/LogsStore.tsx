import { action, computed, makeAutoObservable } from "mobx";
import { createContext } from "react";
import { incrementNumberOfLogsAction } from "./actions/incrementNumberOfLogsAction";
import { updateLogDataAction } from "./actions/updateLogDataAction";
import { getCountryDataAction } from "./actions/getCountryDataAction";
import { isCountryLoadedComputed } from "./computed/isCountryLoadedComputed";
import { clearCountryDataAction } from "./actions/clearCountryDataAction";
import { isEuropeanCountryComputed } from "./computed/isEuropeanCountryComputed";

export class Store {
  numberOfLogs: number = 0;
  logData: string = "";
  countryData: any = null;

  incrementNumberOfLogs = action(() => incrementNumberOfLogsAction(this));
  updateLogData = action(() => updateLogDataAction(this));
  getCountryData = action(
    async (name: string) => await getCountryDataAction(this, name)
  );
  clearCountryData = action(() => clearCountryDataAction(this));
  isCountryLoaded = () =>
    computed(() => isCountryLoadedComputed(this.countryData)).get();
  isEuropeanCountry = () => computed(() => isEuropeanCountryComputed(this.countryData)).get()

  constructor() {
    makeAutoObservable(this);
  }
}

export const LogsStore = createContext(new Store());
