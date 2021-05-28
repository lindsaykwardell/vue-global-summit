<template>
  <div class="tester bg-white shadow-lg flex flex-col">
    <Header>Test Runner</Header>
    <div class="flex flex-grow">
      <div class="w-3/5 p-4 overflow-y-scroll">
        <div>
          <h2 class="text-xl">Tests</h2>
          <TestList :tests="getTests" />
        </div>
      </div>
      <div class="w-2/5 border-l p-4 flex flex-col items-center">
        <TestRunner
          :testRunnerStatus="testRunnerStatus"
          :tests="getTests"
          @initTests="initTests"
        />
      </div>
    </div>
    <div
      v-if="testRunnerStatus === 'FINISHED'"
      class="bg-yellow-500 h-16 text-white flex justify-center items-center font-bold tests-complete"
    >
      <h2 class="text-2xl">All tests have completed!</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { Store } from "@/store";
import { useStore } from "vuex";
import Header from "@/components/Header.vue";
import TestList from "@/components/TestList.vue";
import TestRunner from "@/components/TestRunner.vue";

export default defineComponent({
  setup() {
    const store: Store = useStore();
    const testRunnerStatus = computed(() => store.getters.testRunnerStatus);
    const getTests = computed(() => store.getters.getTests);

    async function initTests(): Promise<void> {
      if (testRunnerStatus.value === "RUNNING") return;

      store.dispatch("runTests");
    }

    return {
      testRunnerStatus,
      getTests,
      initTests,
    };
  },
  components: {
    TestList,
    Header,
    TestRunner,
  },
});
</script>

<style lang="postcss" scoped>
.tester {
  width: 900px;
  min-height: 600px;
}
</style>
