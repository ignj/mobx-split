import { runInAction } from "mobx";
import { CountryStore } from "../CountryStore";

export const getCountryDataAction = async (
  parentStore: CountryStore,
  name: string
) => {
  const response = await fetch(
    `https://restcountries.eu/rest/v2/name/${name}?fullText=true`
  );
  const data = (await response.json())[0] ?? null;
  runInAction(() => {
    parentStore.countryData = data;
  });
};
