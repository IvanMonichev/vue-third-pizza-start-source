<script setup lang="ts">
import { computed, toRefs } from 'vue'

type Variant = 'default' | 'border' | 'arrow'

interface Props {
  to: string
  variants?: Variant[]
}

const props = defineProps<Props>()
const { variants, to } = toRefs(props)

const variantsClasses = computed(
  () => variants.value?.map((v) => `button--${v}`) ?? []
)
</script>

<template>
  <RouterLink :to="to" class="button" :class="variantsClasses">
    <slot />
  </RouterLink>
</template>

<style scoped lang="scss"></style>
