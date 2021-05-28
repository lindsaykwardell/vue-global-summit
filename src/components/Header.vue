<template>
  <div class="flex justify-between items-center p-4">
    <h1 class="text-2xl">
      <slot />
    </h1>
    <nav class="flex justify-between">
      <router-link
        to="/"
        class="bg-gray-200 rounded hover:bg-gray-300 py-1 px-4"
      >
        Tester
      </router-link>
      <router-link
        to="/admin"
        class="bg-gray-200 rounded hover:bg-gray-300 py-1 px-4 ml-2"
      >
        Admin Panel
      </router-link>
    </nav>
  </div>
  <hr />
</template>
