<template>
  <div>
    <app-header/>
    <nuxt/>
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader';

export default {
  components: {
    AppHeader
  }
};
</script>

<style>
body {
  font-family: 'Rubik';
  background: #fafafa;
}
</style>
