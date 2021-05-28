<template>
  <main class="flex h-screen bg-gray-300 justify-center items-center">
    <router-view />
  </main>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["initializeTests"]),
  },
  mounted() {
    this.initializeTests();
  },
};
</script>
