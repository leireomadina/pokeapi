import axios from 'axios'
import fs from 'fs'

const GENERATION_ENDPOINT = 'https://pokeapi.co/api/v2/generation/1'

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

		return {
			species: updatedPokemonSpecies,
			types: types
		}
	} catch(error) {
		console.error('Error fetching data: ', error)
	}
}

async function generateJson() {
	try {
		const generationOnePokemons = await fetchGenerationOnePokemons()

		const pokemonApiData = {
			pokemons: generationOnePokemons,
		}

		fs.writeFileSync('pokemons.json', JSON.stringify(pokemonApiData))
		console.log('JSON succesfully generated')
	} catch (error) {
    console.error('Error generating JSON:', error)
  }
}

generateJson()