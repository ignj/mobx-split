import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { CountryStoreContext } from "./store/countryStore/CountryStore";

const ApiCallAndComputed = () => {
  const {
    countryData,
    getCountryData,
    isCountryLoaded,
    clearCountryData,
    isEuropeanCountry,
  } = useContext(CountryStoreContext);
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
            <input type="text" value={value} onChange={handleChange} />
          </label>
          <input
            disabled={!value}
            type="submit"
            value="Load data"
            onClick={(e: React.MouseEvent<HTMLInputElement, MouseEvent>) =>
              handleSubmit(e, value)
            }
          />
          <input
            type="submit"
            value="Clear data"
            onClick={(e: React.MouseEvent<HTMLInputElement, MouseEvent>) =>
              clearData(e)
            }
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
          <div>There is some country data</div>
          <div>
            Is European country?
            {isEuropeanCountry() ? <div>Yes it is</div> : <div>Bad luck</div>}
          </div>
        </>
      ) : (
        <div>No country data</div>
      )}
    </div>
  );
};

export default observer(ApiCallAndComputed);
