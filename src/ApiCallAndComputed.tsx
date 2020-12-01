import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { RootStoreContext } from "./store/RootStore";
const ApiCallAndComputed = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    countryData,
    getCountryData,
    isCountryLoaded,
    clearCountryData,
    isEuropeanCountry,
  } = rootStore.countryStore;
  const [value, setValue] = useState("");

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e: any, value: string) => {
    e.preventDefault();
    await getCountryData(value);
  };

  const clearData = async (e: any) => {
    e.preventDefault();
    clearCountryData();
  };

  return (
    <div>
      <h1>Load country data</h1>
      <div>
        <form>
          <label>
            Name:
            <input
              type="text"
              value={value}
              onChange={handleChange}
              data-testid="country-input"
            />
          </label>
          <input
            disabled={!value}
            type="submit"
            value="Load data"
            onClick={(e: React.MouseEvent<HTMLInputElement, MouseEvent>) =>
              handleSubmit(e, value)
            }
            data-testid="search-country-button"
          />
          <input
            type="submit"
            value="Clear data"
            onClick={(e: React.MouseEvent<HTMLInputElement, MouseEvent>) =>
              clearData(e)
            }
            data-testid="clear-data-button"
          />
        </form>
      </div>
      {countryData && (
        <div>
          <pre>{JSON.stringify(countryData)}</pre>
        </div>
      )}
      {isCountryLoaded() ? (
        <>
          <div data-testid="country-data">There is some country data</div>
          <div>
            Is European country?
            {isEuropeanCountry() ? (
              <div data-testid="european-label">Yes it is</div>
            ) : (
              <div data-testid="european-label">Bad luck</div>
            )}
          </div>
        </>
      ) : (
        <div data-testid="country-data">No country data</div>
      )}
    </div>
  );
};

export default observer(ApiCallAndComputed);
