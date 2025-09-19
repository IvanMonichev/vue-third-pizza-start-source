<script setup lang="ts">
import { toRefs } from 'vue'

interface Props {
  title: string
  image: string
  price: string
  options: string[]
}

const props = defineProps<Props>()
const { title, image, price, options } = toRefs(props)
</script>

<template>
  <li class="order__item">
    <div class="product">
      <img
        :src="image"
        class="product__img"
        width="56"
        height="56"
        :alt="title"
      />
      <div class="product__text">
        <h2>{{ title }}</h2>
        <ul>
          <li v-for="(option, i) in options" :key="i">{{ option }}</li>
        </ul>
      </div>
    </div>

    <p class="order__price">{{ price }} ₽</p>
  </li>
</template>

<style scoped lang="scss">
@use '@/assets/sass/ds-system/ds-typography';
@use '@/assets/sass/ds-system/ds-colors';
@use '@/assets/sass/mixins/m_clear-list';

.order__item {
  display: flex;

  width: 310px;
  margin-right: 33px;
  margin-bottom: 32px;
}

.order__price {
  @include ds-typography.b-s16-h19;

  margin: 0;

  white-space: nowrap;
}

.product__text {
  margin-left: 15px;

  h2 {
    @include ds-typography.b-s18-h21;

    margin-top: 0;
    margin-bottom: 10px;
  }

  ul {
    @include m_clear-list.clear-list;
    @include ds-typography.l-s11-h13;
  }
}
</style>
