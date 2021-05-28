import {
  createStore,
  MutationTree,
  ActionContext,
  ActionTree,
  GetterTree,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
} from "vuex";
import { getInitialTests, Test } from "../assets/tests";

import moduleStore, { ModuleStore } from "./module";

export interface State {
  tests: Test[];
}

const state: State = {
  tests: [],
};

export interface Getters {
  getTests(state: State): Test[];
  nextTestId(state: State): number;
  testRunnerStatus(state: State): "IDLE" | "RUNNING" | "FINISHED";
}

const getters: GetterTree<State, State> & Getters = {
  getTests: (state) => {
    return [...state.tests].sort((a, b) => {
      if (a.status === b.status) return 0;

      if (a.status === "RUNNING") return -1;
      if (b.status === "RUNNING") return 1;

      if (a.status === "SUCCESS") return -1;
      if (b.status === "SUCCESS") return 1;

      if (a.status === "FAILURE") return -1;
      if (b.status === "FAILURE") return 1;

      return 0;
    });
  },
  nextTestId: (state) => state.tests.length + 1,
  testRunnerStatus: (state) => {
    if (!state.tests.find((test) => test.status !== "IDLE")) {
      return "IDLE";
    } else if (state.tests.find((test) => test.status === "RUNNING")) {
      return "RUNNING";
    } else {
      return "FINISHED";
    }
  },
};

export interface Mutations<S = State> {
  SET_TESTS(state: S, tests: Test[]): void;
  ADD_TEST(state: S, test: Test): void;
  UPDATE_TEST(state: S, updatedTest: Test): void;
  REMOVE_TEST(state: S, testId: number): void;
  STORE_RESULT(state: S, payload: { testId: number; result: boolean }): void;
}

const mutations: MutationTree<State> & Mutations = {
  SET_TESTS(state, tests) {
    if (!state.tests.length) {
      state.tests = [...tests];
    }
  },
  ADD_TEST(state, test) {
    state.tests = [...state.tests, test];
  },
  UPDATE_TEST(state, updatedTest) {
    state.tests = state.tests.map((test) =>
      test.id === updatedTest.id ? updatedTest : test
    );
  },
  REMOVE_TEST(state, testId) {
    state.tests = state.tests.filter((test) => test.id !== testId);
  },
  STORE_RESULT(state, { testId, result }) {
    state.tests = state.tests.map((test) =>
      test.id === testId
        ? {
            ...test,
            status: result ? "SUCCESS" : "FAILURE",
            results: [...test.results, result],
          }
        : test
    );
  },
};

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
} & Omit<ActionContext<State, State>, "commit" | "getters">;

export interface Actions {
  initializeTests(
    context: AugmentedActionContext,
    payload: Test[]
  ): Promise<void>;
  addTest(context: AugmentedActionContext, payload: Test): void;
  runTests(context: AugmentedActionContext): void;
}

const actions: ActionTree<State, State> & Actions = {
  async initializeTests({ commit }) {
    commit("SET_TESTS", await getInitialTests());
  },
  addTest({ commit, getters }, payload) {
    commit("ADD_TEST", { ...payload, id: getters.nextTestId });
  },
  runTests({ commit, getters }) {
    getters.getTests.forEach(async (test) => {
      commit("UPDATE_TEST", {
        ...test,
        status: "RUNNING",
      });

      const delay = 2000 + Math.random() * 2000;
      const testPassed = Math.random() > 0.5;

      await waitfor(delay);

      commit("STORE_RESULT", { testId: test.id, result: testPassed });
    });
  },
};

export type Store = Omit<
  VuexStore<State>,
  "getters" | "commit" | "dispatch"
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
} & ModuleStore;

const store: Store = createStore({
  state,
  getters,
  mutations,
  actions,
  modules: {
    moduleStore,
  },
});

export default store;

const waitfor = async (time: number): Promise<void> =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, time)
  );
