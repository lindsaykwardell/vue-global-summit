import {
  ActionContext,
  ActionTree,
  CommitOptions,
  DispatchOptions,
  GetterTree,
  Module,
  MutationTree,
} from "vuex";
import { State } from "./index";

export interface ModuleState {
  name: string;
}

const state: ModuleState = {
  name: "",
};

export interface ModuleGetters {
  getName(state: ModuleState): string;
}

const getters: GetterTree<ModuleState, State> & ModuleGetters = {
  getName: (state) => state.name,
};

export interface ModuleMutations<S = ModuleState> {
  SET_NAME(state: S, name: string): void;
}

const mutations: MutationTree<ModuleState> & ModuleMutations = {
  SET_NAME(state, name) {
    state.name = name;
  },
};

type AugmentedActionContext = {
  commit<K extends keyof ModuleMutations>(
    key: K,
    payload: Parameters<ModuleMutations[K]>[1]
  ): ReturnType<ModuleMutations[K]>;
  getters: {
    [K in keyof ModuleGetters]: ReturnType<ModuleGetters[K]>;
  };
} & Omit<ActionContext<ModuleState, State>, "commit" | "getters">;

export interface ModuleActions {
  setName(context: AugmentedActionContext, payload: string): void;
}

const actions: ActionTree<ModuleState, State> & ModuleActions = {
  setName({ commit }, payload) {
    commit("SET_NAME", payload);
  },
};

export type ModuleStore = {
  commit<
    K extends keyof ModuleMutations,
    P extends Parameters<ModuleMutations[K]>[1]
  >(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<ModuleMutations[K]>;
  dispatch<K extends keyof ModuleActions>(
    key: K,
    payload?: Parameters<ModuleActions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<ModuleActions[K]>;
  getters: {
    [K in keyof ModuleGetters]: ReturnType<ModuleGetters[K]>;
  };
};

const store: Module<ModuleState, State> = {
  state,
  getters,
  mutations,
  actions,
};

export default store;
