import axios from 'axios'
import fs from 'fs'

const GENERATION_ENDPOINT = 'https://pokeapi.co/api/v2/generation/1'
const SPECIES_ENDPOINT = 'https://pokeapi.co/api/v2/pokemon-species/' 

let pokemonData = {};

async function fetchGenerationOnePokemons() {
	try {
		const response = await axios.get(GENERATION_ENDPOINT)
		const { pokemon_species, types } = response.data

		const updatedPokemonSpecies = pokemon_species.map((pokemon) => {
			const regex = /\/(\d+)\/$/
			const match = pokemon.url.match(regex)
			const id = match[1]

			return {
					...pokemon,
					id: id,
					image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`
			}
		})

		pokemonData.species = updatedPokemonSpecies
    pokemonData.types = types
    return pokemonData
	} catch(error) {
		console.error('Error fetching data: ', error)
	}
}

async function fetchSpeciesData() {
	try {
		await Promise.all(pokemonData.species.map(async (pokemon) => {
			const url = SPECIES_ENDPOINT + pokemon.id + '/'
			const response = await axios.get(url)
			const { order, name, color } = response.data

			pokemon.order = order
			pokemon.speciesName = name
			pokemon.color = color.name
		}))
	} catch(error) {
		console.error('Error fetching data: ', error)
	}
}

async function generateJson() {
	try {
		await fetchGenerationOnePokemons()
		await fetchSpeciesData()

		fs.writeFileSync('pokemons.json', JSON.stringify(pokemonData))
		console.log('JSON succesfully generated')
	} catch (error) {
    console.error('Error generating JSON:', error)
  }
}

generateJson()