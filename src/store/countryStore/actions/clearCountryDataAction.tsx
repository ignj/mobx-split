import { CountryStore } from "../CountryStore";

export const clearCountryDataAction = (parentStore: CountryStore) => parentStore.countryData = null;