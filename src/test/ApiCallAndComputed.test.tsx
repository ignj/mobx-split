import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { runInAction } from "mobx";
import React from "react";
import { useContext } from "react";
import ApiCallAndComputed from "../ApiCallAndComputed";
import { RootStoreContext } from "../store/RootStore";

const europeanCountryMock = '{"name": "Belarus","region": "Europe"}';
const nonEuropeanCountryMock = '{"name": "Argentina","region": "Americas"}';

test("no country label is shown when no data is loaded ", () => {
  render(<ApiCallAndComputed />);

  const countryDataLabel = screen.getByTestId("country-data");
  expect(countryDataLabel.textContent).toContain("No country data");
});

test("non european country is loaded", () => {
  const { result: context } = renderHook(() => useContext(RootStoreContext));
  render(<ApiCallAndComputed />);

  runInAction(
    () =>
      (context.current.countryStore.countryData = JSON.parse(
        nonEuropeanCountryMock
      ))
  );

  const countryDataLabel = screen.getByTestId("country-data");
  expect(countryDataLabel.textContent).toContain("There is some country data");

  const europeanLabel = screen.getByTestId("european-label");
  expect(europeanLabel.textContent).toContain("Bad luck");
});

test("european country is loaded", () => {
  const { result: context } = renderHook(() => useContext(RootStoreContext));
  render(<ApiCallAndComputed />);

  runInAction(
    () =>
      (context.current.countryStore.countryData = JSON.parse(
        europeanCountryMock
      ))
  );

  const countryDataLabel = screen.getByTestId("country-data");
  expect(countryDataLabel.textContent).toContain("There is some country data");

  const europeanLabel = screen.getByTestId("european-label");
  expect(europeanLabel.textContent).toContain("Yes it is");
});

test("click search triggers api call", () => {
  const { result: context } = renderHook(() => useContext(RootStoreContext));
  const mockedGetCountryData = jest.fn().mockReturnValue("");;
  context.current.countryStore.getCountryData = mockedGetCountryData;

  render(<ApiCallAndComputed />);

  const countryInput = screen.getByTestId("country-input");
  fireEvent.change(countryInput, { target: { value: 'someValue' } })

  const searchButton = screen.getByTestId("search-country-button");
  fireEvent.click(searchButton);

  expect(mockedGetCountryData).toHaveBeenCalledTimes(1);
});
