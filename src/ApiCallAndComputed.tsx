import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { LogsStore } from "./store/LogsStore";

const ApiCallAndComputed = () => {
  const { countryData, getCountryData } = useContext(LogsStore);
  const [value, setValue] = useState("");

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e: any, value: string) => {
    e.preventDefault();
    await getCountryData(value);
  };

  return (
    <div>
      <h1>Load country data</h1>
      <form>
        <label>
          Name:
          <input type="text" value={value} onChange={handleChange} />
        </label>
        <input
          type="submit"
          value="Submit"
          onClick={(e: React.MouseEvent<HTMLInputElement, MouseEvent>) =>
            handleSubmit(e, value)
          }
        />
      </form>
      {countryData && (
        <div>
          <pre>{JSON.stringify(countryData)}</pre>
        </div>
      )}
    </div>
  );
};

export default observer(ApiCallAndComputed);
