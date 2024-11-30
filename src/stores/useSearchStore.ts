import { create, StateCreator } from "zustand";

interface SearchSlice {
  search: {
    query: string;
    guests: number;
    dateFrom: Date;
    dateTo: Date;
  };
  setSearchState: (fields: Partial<SearchSlice["search"]>) => void;
}

const createSearchSlice: StateCreator<SearchSlice, [], [], SearchSlice> = (
  set,
) => ({
  search: {
    query: "",
    guests: 1,
    dateFrom: new Date(),
    dateTo: new Date(),
  },
  setSearchState: (fields) =>
    set((state) => ({ search: { ...state.search, ...fields } })),
});

export const useSearchStore = create<SearchSlice>()((...a) => ({
  ...createSearchSlice(...a),
}));
