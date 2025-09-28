<script setup lang="ts">
import AppCounter from '@/common/components/app-counter.vue'
import { miscImagesMap } from '@/common/constants/mappers.constants'
import { CartMisc } from '@/common/types/misc.types'
import { AppConfig } from '@/modules/cart/config/app.config'
import { computed } from 'vue'

interface Props {
  misc: CartMisc
}

const { misc } = defineProps<Props>()
const emit = defineEmits<{
  (e: 'increment', misc: CartMisc): void
  (e: 'decrement', misc: CartMisc): void
  (e: 'set-value', payload: { misc: CartMisc; value: number }): void
}>()

const finalPrice = computed(() => misc.quantity * misc.price)
</script>

<template>
  <li class="additional-list__item sheet">
    <p class="additional-list__description">
      <img
        :src="miscImagesMap[misc.image]"
        width="39"
        height="60"
        :alt="misc.name"
      />
      <span>{{ misc.name }}</span>
    </p>

    <div class="additional-list__wrapper">
      <AppCounter
        color="orange"
        extra-class="additional-list__counter"
        :value="misc.quantity"
        :min="0"
        @increment="emit('increment', misc)"
        @decrement="emit('decrement', misc)"
        @set-value="emit('set-value', { misc: misc, value: $event })"
      />
      <div class="additional-list__price">
        <b>× {{ finalPrice.toLocaleString(AppConfig.Locale) }} ₽</b>
      </div>
    </div>
  </li>
</template>

<style scoped lang="scss">
@use '@/assets/sass/ds-system/ds-colors';
@use '@/assets/sass/ds-system/ds-typography';
@use '@/assets/sass/mixins/m_clear-list';
@use '@/assets/sass/ds-system/ds-shadows';

.additional-list__description {
  display: flex;
  align-items: flex-start;

  margin: 0;
  margin-bottom: 8px;
}

.additional-list__item {
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  width: 200px;
  margin-right: 15px;
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;

  img {
    margin-right: 10px;
    margin-left: 15px;
  }

  span {
    @include ds-typography.b-s14-h16;

    display: inline;

    width: 100px;
    margin-right: 15px;
  }
}

.additional-list__wrapper {
  display: flex;
  align-items: center;

  box-sizing: border-box;
  width: 100%;
  margin-top: auto;
  padding-top: 18px;
  padding-right: 15px;
  padding-left: 15px;

  border-top: 1px solid rgba(ds-colors.$green-500, 0.1);
}

.additional-list__counter {
  width: 54px;
  margin-right: auto;
}

.additional-list__price {
  @include ds-typography.b-s16-h19;
}
</style>
