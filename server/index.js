import axios from 'axios'
import fs from 'fs'
import path from 'path'

const GENERATION_ENDPOINT = 'https://pokeapi.co/api/v2/generation/1'
const SPECIES_ENDPOINT = 'https://pokeapi.co/api/v2/pokemon-species/'
const POKEMON_ENDPOINT = 'https://pokeapi.co/api/v2/pokemon/' 

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
			const { order, color } = response.data

			pokemon.order = order
			pokemon.color = color.name
		}))
	} catch(error) {
		console.error('Error fetching data: ', error)
	}
}

async function fetchPokemonTypes() {
	try {
		await Promise.all(pokemonData.species.map(async (pokemon) => {
			const url = POKEMON_ENDPOINT + pokemon.id + '/'
			const response = await axios.get(url)
			const { types } = response.data

			const simplifiedTypes = types.map((type) => {
				return {
					name: type.type.name,
					url: type.type.url
				}
			})

			pokemon.types = simplifiedTypes
		}))
	} catch(error) {
		console.error('Error fetching data: ', error)
	}
}

async function generateJson() {
	try {
		await fetchGenerationOnePokemons()
		
		await Promise.all([
			fetchSpeciesData(),
			fetchPokemonTypes()
		]);

		const __dirname = path.dirname(new URL(import.meta.url).pathname)
		const jsonPath = path.resolve(__dirname, '..', 'client', 'src', 'data', 'pokemons.json')
    fs.writeFileSync(jsonPath, JSON.stringify(pokemonData))
		console.log('JSON succesfully generated')
	} catch (error) {
    console.error('Error generating JSON:', error)
  }
}

generateJson()