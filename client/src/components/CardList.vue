<script setup lang="ts">
import CardItem from './CardItem.vue'
import pokemonsJson from '@/data/pokemons.json'

interface Pokemon {
  id: string;
  name: string;
  image: string;
  color: string;
  types: { name: string; url: string }[];
}

const pokemons: Pokemon[] = pokemonsJson.species

function orderPokemonsById() {
  return [...pokemons].sort((a, b) => {
    return parseInt(a.id) - parseInt(b.id)
  })
}
const orderedPokemons = orderPokemonsById()
</script>

<template>
	<ul class="list">
		<li v-for="(pokemon, index) in orderedPokemons" :key="index">
			<CardItem :id="pokemon.id" :title="pokemon.name" :image="pokemon.image" :color="pokemon.color" />
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