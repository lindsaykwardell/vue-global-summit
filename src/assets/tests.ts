export interface Test {
  id: number;
  description: string;
  status: "IDLE" | "RUNNING" | "SUCCESS" | "FAILURE";
  results: boolean[];
}

export const getInitialTests = async (): Promise<Test[]> => [
  {
    id: 1,
    description: "Vue views are viewable",
    status: "IDLE",
    results: [],
  },
  {
    id: 2,
    description: "Reactive components react properly",
    status: "IDLE",
    results: [],
  },
  {
    id: 3,
    description: "Angular brackets are not round",
    status: "IDLE",
    results: [],
  },
  {
    id: 4,
    description: "Svelte file extensions are looking stylish",
    status: "IDLE",
    results: [],
  },
  {
    id: 5,
    description: "Web component elements are sufficiently lit",
    status: "IDLE",
    results: [],
  },
  {
    id: 6,
    description: "Elm trees function as expected",
    status: "IDLE",
    results: [],
  },
];
