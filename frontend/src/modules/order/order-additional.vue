<script setup lang="ts">
import { AdditionalItem } from '@/common/types/order.types'

interface Props {
  items: AdditionalItem[]
}

const props = defineProps<Props>()
</script>

<template>
  <ul class="order__additional">
    <li v-for="(item, index) in props.items" :key="index">
      <img :src="item.image" width="20" height="30" :alt="item.alt" />
      <p>
        <span>{{ item.name }}</span>
        <b>{{ item.price }} ₽</b>
      </p>
    </li>
  </ul>
</template>

<style scoped lang="scss">
@use '@/assets/sass/ds-system/ds-colors';
@use '@/assets/sass/ds-system/ds-typography';
@use '@/assets/sass/mixins/m_clear-list';

.order__additional {
  @include m_clear-list.clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-bottom: 5px;
  padding-left: 80px;

  li {
    @include ds-typography.b-s11-h16;

    width: 130px;
    margin-right: 24px;
    margin-bottom: 10px;
  }

  p {
    margin: 0;
  }

  img {
    float: left;

    margin-right: 7px;
  }

  b {
    display: block;
  }
}
</style>
