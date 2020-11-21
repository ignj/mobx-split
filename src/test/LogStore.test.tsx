// import React, { useContext } from "react";
// import { renderHook, act } from "@testing-library/react-hooks";
// import { LogsStore } from "../LogsStore";

// test("log counter increments by 1", () => {
//   const { result: context } = renderHook(() => useContext(LogsStore));
//   expect(context.current.numberOfLogs).toBe(0);

//   context.current.incrementNumberOfLogs();
//   expect(context.current.numberOfLogs).toBe(1);
  
//   context.current.incrementNumberOfLogs();
//   expect(context.current.numberOfLogs).toBe(2);
// });

// test("log data gets updated", async () => {
//   const { result: context } = renderHook(() => useContext(LogsStore));
//   const initialLogData = context.current.logData;
//   expect(initialLogData).toBe("");

//   context.current.updateLogData();
//   const firstDataUpdate = context.current.logData;
//   expect(firstDataUpdate).not.toEqual(initialLogData);

//   await new Promise((r) => setTimeout(r, 1000));

//   context.current.updateLogData();
//   const secondDataUpdate = context.current.logData;
//   expect(secondDataUpdate).not.toEqual(firstDataUpdate);
// });