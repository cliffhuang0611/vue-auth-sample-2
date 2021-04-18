<template>
  <v-app>
    <router-view v-if="isLoggedIn" />
    <Login v-else />
  </v-app>
</template>

<script lang="ts" src="./App.ts" />
