import { create } from "zustand";

import { Chore } from "../types/Chore";

interface choreStore {
  chores: Map<string, Chore>;
  addChore: (chore: Chore) => void;
  deleteChore: (id: string) => void;
}

export const useChoreStore = create<choreStore>((set) => ({
  chores: new Map(),
  addChore: (chore: Chore) =>
    set((state) => ({
      chores: new Map(state.chores).set(crypto.randomUUID(), chore),
    })),
  deleteChore: (id: string) =>
    set((state) => ({
      chores: new Map([...state.chores].filter(([key, _value]) => key !== id)),
    })),
}));
