import React, { useContext } from "react";
import { LogsStoreContext } from "./store/logsStore/LogsStore";
import NumberOfLogs from "./NumberOfLogs";
import NumberOfLogsAndData from "./NumberOfLogsAndData";
import ApiCallAndComputed from "./ApiCallAndComputed";

const App = () => {
  const { incrementNumberOfLogs, updateLogData } = useContext(LogsStoreContext);

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
