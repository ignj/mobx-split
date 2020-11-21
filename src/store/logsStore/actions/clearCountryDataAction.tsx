import { Store } from "../LogsStore";

export const clearCountryDataAction = (parentStore: Store) => parentStore.countryData = null;