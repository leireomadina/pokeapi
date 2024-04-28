<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  title: string,
	id: string,
	image: string,
	color: string
}>()

</script>

<template>
	<article :id="id" class="card" :style="{ backgroundColor: color }">
		<p class="card__number">#{{ id }}</p>
		<img :src="image" class="card__image">
		<h3 class="card__title">{{ title }}</h3>
	</article>
</template>

<style scoped lang="scss">

.card {
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 1rem 1rem 3rem 1rem;
	border-radius: 8px;
	min-height: auto;
	height: 250px;
	border: 3px solid black;

	&__number {
		align-self: flex-start;
	}

	&__image {
		height: 60%;
	}

	&__title {
		margin-top: 1rem;
		text-transform: uppercase;
		font-size: 1rem;
		font-weight: 600;
	}
}
</style>