import { makeAutoObservable } from "mobx";
import { clearCountryDataAction } from "./actions/clearCountryDataAction";
import { getCountryDataAction } from "./actions/getCountryDataAction";
import { isCountryLoadedComputed } from "./computed/isCountryLoadedComputed";
import { isEuropeanCountryComputed } from "./computed/isEuropeanCountryComputed";

export class CountryStore {
  countryData: any = null;

  getCountryData = async (name: string) =>
    await getCountryDataAction(this, name);
  clearCountryData = () => clearCountryDataAction(this);
  isCountryLoaded = () => isCountryLoadedComputed(this.countryData);
  isEuropeanCountry = () => isEuropeanCountryComputed(this.countryData);

  constructor() {
    makeAutoObservable(this);
  }
}
