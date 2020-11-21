import { runInAction } from "mobx";
import { Store } from "./LogsStore";

export const getCountryDataAction = async (
  parentStore: Store,
  name: string
) => {
  const response = await fetch(
    `https://restcountries.eu/rest/v2/name/${name}?fullText=true`
  );
  const data = (await response.json())[0];
  runInAction(() => {
    parentStore.countryData = data;
  });
};
