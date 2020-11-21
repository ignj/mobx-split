import React, { useContext } from "react";
import NumberOfLogs from "./NumberOfLogs";
import NumberOfLogsAndData from "./NumberOfLogsAndData";
import ApiCallAndComputed from "./ApiCallAndComputed";
import { RootStoreContext } from "./store/RootStore";

const App = () => {
  const rootStore = useContext(RootStoreContext);
  const { incrementNumberOfLogs, updateLogData } = rootStore.logsStore;

  return (
    <>
      <button
        data-testid="increment-logs"
        onClick={() => incrementNumberOfLogs()}
      >
        Add new log
      </button>
      <button data-testid="update-logs" onClick={() => updateLogData()}>
        Update Log data
      </button>
      <NumberOfLogs />
      <NumberOfLogsAndData />
      <ApiCallAndComputed />
    </>
  );
};

export default App;
