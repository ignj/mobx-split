import { render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import React, { useContext } from "react";
import { LogsStore } from "../LogsStore";
import NumberOfLogs from "../NumberOfLogs";

test("number of logs is rendered", () => {
  const { result: context } = renderHook(() => useContext(LogsStore));
  render(<NumberOfLogs />);

  const counter = screen.getByTestId("number-of-logs");
  expect(counter.textContent).toContain("0");

  context.current.incrementNumberOfLogs();
  expect(counter.textContent).toContain("1");
});
