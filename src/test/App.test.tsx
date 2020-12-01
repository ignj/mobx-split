import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import { RootProvider, RootStore } from "../store/RootStore";

const mockCountry = [
  {
    name: "Argentina",
    topLevelDomain: [".ar"],
    alpha2Code: "AR",
    alpha3Code: "ARG",
    callingCodes: ["54"],
    capital: "Buenos Aires",
    altSpellings: ["AR", "Argentine Republic", "República Argentina"],
    region: "Americas",
    subregion: "South America",
    population: 43590400,
    latlng: [-34.0, -64.0],
    demonym: "Argentinean",
    area: 2780400.0,
    gini: 44.5,
    timezones: ["UTC-03:00"],
    borders: ["BOL", "BRA", "CHL", "PRY", "URY"],
    nativeName: "Argentina",
    numericCode: "032",
    currencies: [{ code: "ARS", name: "Argentine peso", symbol: "$" }],
    languages: [
      {
        iso639_1: "es",
        iso639_2: "spa",
        name: "Spanish",
        nativeName: "Español",
      },
      {
        iso639_1: "gn",
        iso639_2: "grn",
        name: "Guaraní",
        nativeName: "Avañe'ẽ",
      },
    ],
    translations: {
      de: "Argentinien",
      es: "Argentina",
      fr: "Argentine",
      ja: "アルゼンチン",
      it: "Argentina",
      br: "Argentina",
      pt: "Argentina",
      nl: "Argentinië",
      hr: "Argentina",
      fa: "آرژانتین",
    },
    flag: "https://restcountries.eu/data/arg.svg",
    regionalBlocs: [
      {
        acronym: "USAN",
        name: "Union of South American Nations",
        otherAcronyms: ["UNASUR", "UNASUL", "UZAN"],
        otherNames: [
          "Unión de Naciones Suramericanas",
          "União de Nações Sul-Americanas",
          "Unie van Zuid-Amerikaanse Naties",
          "South American Union",
        ],
      },
    ],
    cioc: "ARG",
  },
];

test("renders increment logs button", () => {
  const rootStore = new RootStore();
  rootStore.countryStore.countryData = mockCountry;

  render(
    <RootProvider store={rootStore}>
      <App />
    </RootProvider>
  );
  const incrementLogsButton = screen.getByTestId("country-data");
  expect(incrementLogsButton).toBe("No country data");
});

// test("renders update log data button", () => {
//   render(<App />);
//   const updateLogDataButton = screen.getByTestId("update-logs");
//   expect(updateLogDataButton).toBeInTheDocument();
// });

// test("renders number of logs", () => {
//   render(<App />);
//   const numberOfLogsComponent = screen.getByTestId("container-number-of-logs");
//   expect(numberOfLogsComponent).toBeInTheDocument();
// });

test("increment logs updates store", () => {
  render(<App />);
  const incrementLogsButton = screen.getByTestId("increment-logs");
  const rootStore = new RootStore();
  const initialCounter = rootStore.logsStore.numberOfLogs;
  expect(initialCounter).toBe(0);

  //   const initialCounter = context.current.logsStore.numberOfLogs;
  //   expect(initialCounter).toBe(0);

  const updatedCounter = rootStore.logsStore.numberOfLogs;
  expect(updatedCounter).toBe(1);
});

test("update logs updates store", () => {
  render(<App />);
  const updateLogDataButton = screen.getByTestId("update-logs");
  const rootStore = new RootStore();

  const initialData = rootStore.logsStore.logData;
  expect(initialData).toBe("");

  //   const initialData = context.current.logsStore.logData;
  //   expect(initialData).toBe("");

  const updatedData = rootStore.logsStore.logData;
  expect(updatedData).not.toEqual(initialData);
});
