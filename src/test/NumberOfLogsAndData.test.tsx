import { render, screen } from "@testing-library/react";
import { HookResult, renderHook } from "@testing-library/react-hooks";
import React, { useContext } from "react";
import NumberOfLogsAndData from "../NumberOfLogsAndData";
import { getRenewedRootStore, RootStore } from "../store/RootStore";

let context: HookResult<RootStore> | null = null;

beforeEach(() => {
  const { result } = renderHook(() => useContext(getRenewedRootStore()));
  context = result;
});

test("number of logs is rendered", () => {
  render(<NumberOfLogsAndData />);

  const counter = screen.getByTestId("number-of-logs");
  expect(counter.textContent).toContain("0");

  context!.current.logsStore.incrementNumberOfLogs();
  expect(counter.textContent).toContain("1");
});

test("logs data is rendered", () => {
  render(<NumberOfLogsAndData />);

  const logData = screen.getByTestId("log-data");
  const initialData = logData.textContent;
  expect(initialData).toContain("");

  context!.current.logsStore.updateLogData();
  const updatedData = logData.textContent;
  expect(updatedData).not.toEqual(initialData);
});
