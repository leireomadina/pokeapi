<script setup lang="ts">
import { defineProps, watch } from 'vue'
import CardItem from './CardItem.vue'
import pokemonsJson from '@/data/pokemons.json'

interface Pokemon {
  id: string;
  name: string;
  image: string;
  color: string;
  types: { name: string; url: string }[];
}

const props = defineProps({
  filteredPokemonName: String
})

const pokemons: Pokemon[] = pokemonsJson.species

function orderPokemonsById() {
  return [...pokemons].sort((a, b) => {
    return parseInt(a.id) - parseInt(b.id)
  })
}

function filterPokemonsByName(pokemons: Pokemon[], name: string) {
  return pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(name.toLowerCase()))
}

watch(() => props.filteredPokemonName, (newValue) => {
  filteredPokemons = filterPokemonsByName(orderPokemonsById(), newValue || '')
})

let filteredPokemons = filterPokemonsByName(orderPokemonsById(), props.filteredPokemonName || '')

</script>

<template>
	<ul class="list">
		<li v-for="(pokemon, index) in filteredPokemons" :key="index">
			<CardItem :id="pokemon.id" :title="pokemon.name" :image="pokemon.image" :color="pokemon.color" :types="pokemon.types"/>
		</li>
	</ul>
</template>

<style scoped lang="scss">
	.list {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		grid-gap: 2rem;
		justify-content: space-between;
		width: 100%;
		max-width: 100%;
		padding: 2rem;
	}
</style>