<script setup lang="ts">
import { ref } from 'vue'

import SearchPokemon from '../components/SearchPokemon.vue'
import CardList from '../components/CardList.vue'

const filteredPokemonName = ref('')

function handleFilterPokemonByName(name: string) {
  filteredPokemonName.value = name
}

</script>

<template>
  <header>
    <h1>Pokéapi</h1>
  </header>
  <main>
    <section>
      <header>
        <img src="@/assets/logo.svg" />
        <SearchPokemon @filterPokemonByName="handleFilterPokemonByName"/>
      </header>
    </section>
    <section>
      <CardList :filteredPokemonName="filteredPokemonName" />
    </section>
  </main>
</template>

<style lang="scss" scoped>
h1 {
  display: none;
}
header {
  background-color: #324047;

  img {
    display: block;
    height: 100px;
    margin: 1rem auto 2rem auto;
  }
}

section header {
  padding: 1rem;
}
</style>
