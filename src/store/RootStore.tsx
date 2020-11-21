import { createContext } from "react";
import { CountryStore } from "./countryStore/CountryStore";
import { LogsStore } from "./logsStore/LogsStore";

export class RootStore {
  logsStore: LogsStore
  countryStore: CountryStore

  constructor() {
    this.logsStore = new LogsStore();
    this.countryStore = new CountryStore();
  }
}

export const RootStoreContext = createContext(new RootStore());
