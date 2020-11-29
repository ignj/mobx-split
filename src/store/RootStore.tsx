import { createContext } from "react";
import { CountryStore } from "./countryStore/CountryStore";
import { LogsStore } from "./logsStore/LogsStore";

export class RootStore {
  logsStore: LogsStore;
  countryStore: CountryStore;

  constructor() {
    // console.log("Store ID", Math.random());
    this.logsStore = new LogsStore();
    this.countryStore = new CountryStore();
  }
}

export let RootStoreContext = createContext(new RootStore());

export const getRenewedRootStore = () =>
  (RootStoreContext = createContext(new RootStore()));
