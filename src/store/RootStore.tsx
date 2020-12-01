import { Children, createContext } from "react";
import { CountryStore } from "./countryStore/CountryStore";
import { LogsStore } from "./logsStore/LogsStore";
import React from "react";
export class RootStore {
  logsStore: LogsStore;
  countryStore: CountryStore;

  constructor() {
    // console.log("Store ID", Math.random());
    this.logsStore = new LogsStore();
    this.countryStore = new CountryStore();
  }
}

export const RootStoreContext = createContext(new RootStore());

export const RootProvider = ({
  children,
  store,
}: {
  children: React.ReactNode;
  store: RootStore;
}) => {
  return (
    <RootStoreContext.Provider value={store}>
      {React.Children.map(children, (child) => child)}
    </RootStoreContext.Provider>
  );
};
