<script setup lang="ts">
import { CartMisc } from '@/common/types/misc.types'
import CartAdditionalListItem from '@/modules/cart/cart-additional-list-item.vue'
import { useCartStore, useDataStore } from '@/store'
import { onMounted } from 'vue'

const dataStore = useDataStore()
const cartStore = useCartStore()
onMounted(() => {
  dataStore.loadMiscList()
  cartStore.buildMiscListCart(dataStore.miscList)
})

const handleIncrement = (misc: CartMisc) => {
  cartStore.setMisc({ ...misc, quantity: misc.quantity + 1 })
}

const handleDecrement = (misc: CartMisc) => {
  cartStore.setMisc({ ...misc, quantity: misc.quantity - 1 })
}

const handleSetValue = ({ misc, value }: { misc: CartMisc; value: number }) => {
  cartStore.setMisc({ ...misc, quantity: value })
}
</script>

<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <CartAdditionalListItem
        v-for="m in cartStore.miscList"
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
