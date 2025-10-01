<script setup lang="ts">
import { MiscCart } from '@/common/types/misc.types'
import misc from '@/mocks/misc.json'
import CartMiscListItem from '@/modules/cart/cart-misc-list-item.vue'
import { useCartStore, useDataStore } from '@/store'
import { onMounted } from 'vue'

const dataStore = useDataStore()
const cartStore = useCartStore()
onMounted(() => {
  dataStore.buildMisc(misc)
})

const handleIncrement = (misc: MiscCart) => {
  cartStore.setMisc({ ...misc, quantity: misc.quantity + 1 })
}

const handleDecrement = (misc: MiscCart) => {
  cartStore.setMisc({ ...misc, quantity: misc.quantity - 1 })
}

const handleSetValue = ({ misc, value }: { misc: MiscCart; value: number }) => {
  cartStore.setMisc({ ...misc, quantity: value })
}
</script>

<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <CartMiscListItem
        v-for="m in dataStore.miscList"
        :key="m.id"
        :misc="m"
        @increment="handleIncrement"
        @decrement="handleDecrement"
        @set-value="handleSetValue($event)"
      />
    </ul>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/sass/mixins/m_clear-list';

.additional-list {
  @include m_clear-list.clear-list;

  display: flex;
  flex-wrap: wrap;
}

.cart__additional {
  margin-top: 15px;
  margin-bottom: 25px;
}
</style>
