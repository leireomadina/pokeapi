<script setup lang="ts">
import { defineProps, defineAsyncComponent } from 'vue'

defineProps<{
  title: string,
	id: string,
	image: string,
	color: string,
	types: { name: string }[],
}>()

function getIconComponentName(typeName: string): string {
	const firstLetter = typeName.charAt(0).toUpperCase()
	const restCharacters = typeName.slice(1)
  return `Icon${firstLetter + restCharacters}`
}

function importIconComponent(typeName: string) {
  return defineAsyncComponent(() => import(`@/components/icons/${getIconComponentName(typeName)}.vue`))
}
</script>

<template>
	<article :id="id" class="card" :style="{ boxShadow: '0 0 2px 2px ' + color }">
		<div class="card__background" :style="{ backgroundColor: color }"></div>
		<p class="card__number">#{{ id }}</p>
		<img :src="image" class="card__image">
		<h3 class="card__title" :style="{ color: color }">{{ title }}</h3>
		<ul class="card__badge-list">
			<li v-for="(type, index) in types" :key="index" class="card__badge">
				<component :is="importIconComponent(type.name)" />
			</li>
		</ul>
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
		
		&:hover img {
			transform: translateY(-30px) translateX(20px) scale(1.6);
		}

	&__background {
		position: absolute;
		top: 0;
		height: 250px;
		width: 100%;
		opacity: 20%;
		z-index: -1;
	}

	&__number {
		align-self: flex-start;
	}

	&__image {
		height: 60%;
		transform: scale(1);
		transition: all 0.3s ease-out;
	}

	&__title {
		margin-top: 1rem;
		text-transform: uppercase;
		font-size: 1rem;
		font-weight: 600;
		filter: brightness(70%);
	}

	&__badge-list {
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%) translateY(50%);
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
	}
	
	&__badge {
		width: 35px;
		height: 35px;
		display: flex;
		justify-content: center;
		border-radius: 50%;
		background-color: white;
		
		svg {
			width: 60%;
			height: auto;
		}
	}
}
</style>