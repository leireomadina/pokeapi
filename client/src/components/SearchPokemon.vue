<script setup lang="ts">
import { defineEmits, ref } from 'vue'
import pokemonsJson from '@/data/pokemons.json'

interface Pokemon {
  id: string;
  name: string;
  image: string;
  color: string;
  types: { name: string; url: string }[];
}

const pokemons: Pokemon[] = pokemonsJson.species
const pokemonNames = pokemons.map((pokemon) => {
  return pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
})

const emit = defineEmits(['filterPokemonByName'])

const selectedPokemonName = ref<string | null>(null)

function handlePokemonNameChange(event: Event) {
	const selectedName = (event.target as HTMLInputElement).value
	emit('filterPokemonByName', selectedName)
}

function handleEnterKey(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    const selectedName = (event.target as HTMLInputElement).value
    emit('filterPokemonByName', selectedName)
  }
}

</script>

<template>
	<v-autocomplete
		label="Search a Pokémon"
		:items="pokemonNames"
		append-inner-icon="mdi-microphone"
		class="mx-auto"
		density="comfortable"
		placeholder="Type a name"
		style="max-width: 350px;"
		theme="light"
		variant="solo"
		auto-select-first
		item-props
		rounded
		item-color="blue"
		@input="handlePokemonNameChange"
		@click="handlePokemonNameChange"
		@keydown.enter="handleEnterKey"
	></v-autocomplete>
</template>
