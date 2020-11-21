import { action, computed, makeAutoObservable } from "mobx";
import { createContext } from "react";
import { clearCountryDataAction } from "./actions/clearCountryDataAction";
import { getCountryDataAction } from "./actions/getCountryDataAction";
import { isCountryLoadedComputed } from "./computed/isCountryLoadedComputed";
import { isEuropeanCountryComputed } from "./computed/isEuropeanCountryComputed";

export class CountryStore {
  countryData: any = null;

  getCountryData = action(
    async (name: string) => await getCountryDataAction(this, name)
  );
  clearCountryData = action(() => clearCountryDataAction(this));
  isCountryLoaded = () =>
    computed(() => isCountryLoadedComputed(this.countryData)).get();
  isEuropeanCountry = () =>
    computed(() => isEuropeanCountryComputed(this.countryData)).get();

  constructor() {
    makeAutoObservable(this);
  }
}

export const CountryStoreSingleton = createContext(new CountryStore());
