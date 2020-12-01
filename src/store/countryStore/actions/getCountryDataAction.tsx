import { runInAction } from "mobx";
import { getCountryApiCall } from "../api/getCountryApiCall";
import { CountryStore } from "../CountryStore";

export const getCountryDataAction = async (
  parentStore: CountryStore,
  name: string
) => {
  console.log("llamando al get");
  const countryData = await getCountryApiCall(name);
  runInAction(() => {
    parentStore.countryData = countryData;
  });
};
