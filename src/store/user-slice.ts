import { StateCreator } from "zustand";

type UserState = {
  userName: string;
  fullName: string;
  address: string;
};

type UserActions = {
  setAddress: (address: string) => void;
  setFullName: (fullName: string) => void;
  setUserName: (userName: string) => void;
  getUser: () => { userName: string; fullName: string; address: string }; // Updated method
};

export type UserSlice = UserState & UserActions;

export const createUserSlice: StateCreator<
  UserSlice,
  [["zustand/immer", never]],
  [],
  UserSlice
> = (set, get) => ({
  address: "",
  age: 0,
  fullName: "",
  userName: "",
  setAddress: (address) =>
    set((state) => {
      state.address = address;
    }),
  setFullName: (fullName) =>
    set((state) => {
      state.fullName = fullName;
    }),
  setUserName: (userName) =>
    set((state) => {
      state.userName = userName;
    }),
  getUser: () => {
    const state = get();
    return {
      userName: state.userName,
      fullName: state.fullName,
      address: state.address,
    };
  },
});
