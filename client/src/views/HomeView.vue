<script setup lang="ts">
import SearchPokemon from '../components/SearchPokemon.vue'
import CardList from '../components/CardList.vue'
</script>

<template>
  <header>
    <h1>Pokéapi</h1>
  </header>
  <main>
    <section>
      <header>
        <img src="@/assets/logo.svg" />
      </header>
      <SearchPokemon />
    </section>
    <section>
      <CardList />
    </section>
  </main>
</template>

<style lang="scss" scoped>
h1 {
  display: none;
}
header {
  background-color: #324047;
}
</style>
