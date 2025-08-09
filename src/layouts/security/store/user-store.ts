import { siteStore } from "@/common/site/siteStore";
import { defineStore } from "pinia";

export interface UserInterface {
  user_id: "";
  ci: "";
  name: "";
  email: "";
  sex: "";
  assignment: null;
  group_owner: "";
  assignedTests: [];
}

export const userStore = defineStore("user", {
  state: (): UserInterface => {
    const user = siteStore().getUserInLocal();
    const state: UserInterface = user ?? {
      user_id: "",
      ci: "",
      name: "",
      email: "",
      sex: "",
      group_owner: "",
      assignment: null,
      assignedTests: [],
    }


    return state;
  },
  getters: {
    isAdmin: (state) => state.assignment?.item_id == 1,
    isAnalyst: (state) => state.assignment?.item_id == 2,
    isExecutor: (state) => state.assignment?.item_id == 3,
    isSuperAdmin: (state) => state.assignment?.item_id == 4,
    isClient: (state) => state.assignment?.item_id == 5,
    getGroupID: (state) => state.assignment?.group_id,
    getRole: (state) => state.assignment?.role?.name,

  },
});
