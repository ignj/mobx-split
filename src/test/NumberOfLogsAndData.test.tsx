import { render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import React, { useContext } from "react";
import { LogsStore } from "../LogsStore";
import NumberOfLogsAndData from "../NumberOfLogsAndData";

test("number of logs is rendered", () => {
  const { result: context } = renderHook(() => useContext(LogsStore));
  render(<NumberOfLogsAndData />);

  const counter = screen.getByTestId("number-of-logs");
  expect(counter.textContent).toContain("0");

  context.current.incrementNumberOfLogs();
  expect(counter.textContent).toContain("1");
});

test("logs data is rendered", () => {
  const { result: context } = renderHook(() => useContext(LogsStore));
  render(<NumberOfLogsAndData />);

  const logData = screen.getByTestId("log-data");
  const initialData = logData.textContent;
  expect(initialData).toContain("");

  context.current.updateLogData();
  const updatedData = logData.textContent;
  expect(updatedData).not.toEqual(initialData);
});
