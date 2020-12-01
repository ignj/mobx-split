import "@testing-library/jest-dom";
import { HookResult, renderHook } from "@testing-library/react-hooks";
import { useContext } from "react";
import { RootStore } from "../store/RootStore";
import * as getCountryApiModule from "../store/countryStore/api/getCountryApiCall";

const europeanCountryMock = '{"name": "Belarus","region": "Europe"}';
const nonEuropeanCountryMock = '{"name": "Argentina","region": "Americas"}';

// beforeEach(() => {
//   const rootStore = new RootStore();

//   //context = result;
// });

test("when no country data is loaded, computed isCountryLoaded returns false", async () => {
  const rootStore = new RootStore();
  expect(rootStore.countryStore.countryData).toBe(null);
  expect(rootStore.countryStore.isCountryLoaded()).toBe(false);
});

test("getCountryData updates countryData", async () => {
  const spy = jest.spyOn(getCountryApiModule, "getCountryApiCall");
  spy.mockImplementation((name: string) =>
    Promise.resolve(JSON.parse(europeanCountryMock))
  );

  const rootStore = new RootStore();

  expect(rootStore.countryStore.countryData).toBe(null);

  await rootStore.countryStore.getCountryData("randomstring");

  expect(rootStore.countryStore.countryData).not.toBe(null);
});

test("countryData updates triggers computed isCountryLoaded", async () => {
  const spy = jest.spyOn(getCountryApiModule, "getCountryApiCall");
  spy.mockImplementation((name: string) =>
    Promise.resolve(JSON.parse(europeanCountryMock))
  );

  const rootStore = new RootStore();

  await rootStore.countryStore.getCountryData("randomstring");

  expect(rootStore.countryStore.isCountryLoaded()).toBe(true);
});

test("countryData updates triggers computed isEuropeanCountry, which is true for belarus", async () => {
  const spy = jest.spyOn(getCountryApiModule, "getCountryApiCall");
  spy.mockImplementation((name: string) =>
    Promise.resolve(JSON.parse(europeanCountryMock))
  );
  const rootStore = new RootStore();

  await rootStore.countryStore.getCountryData("randomstring");

  expect(rootStore.countryStore.isEuropeanCountry()).toBe(true);
});

test("countryData updates triggers computed isEuropeanCountry, which is false for argentina", async () => {
  const spy = jest.spyOn(getCountryApiModule, "getCountryApiCall");
  spy.mockImplementation((name: string) =>
    Promise.resolve(JSON.parse(nonEuropeanCountryMock))
  );

  const rootStore = new RootStore();

  await rootStore.countryStore.getCountryData("randomstring");

  expect(rootStore.countryStore.isEuropeanCountry()).toBe(false);
});
