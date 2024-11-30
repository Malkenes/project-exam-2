import { StateCreator } from "zustand";

export interface SearchSlice {
  search: {
    query: string;
    guests: number;
    dateFrom: Date;
    dateTo: Date;
  };
  setSearchState: (fields: Partial<SearchSlice["search"]>) => void;
}

export const createSearchSlice: StateCreator<
  SearchSlice,
  [],
  [],
  SearchSlice
> = (set) => ({
  search: {
    query: "",
    guests: 1,
    dateFrom: new Date(),
    dateTo: new Date(),
  },
  setSearchState: (fields) =>
    set((state) => ({ search: { ...state.search, ...fields } })),
});
