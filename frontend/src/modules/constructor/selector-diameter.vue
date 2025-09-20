<script setup lang="ts">
import RadioDiameter from '@/modules/constructor/radio-diameter.vue'
import { PizzaSize } from '@/common/enums/pizza-size.enum'
import { PizzaSizeInterface } from '@/common/types/pizza.types'
import SheetLayout from '@/modules/constructor/sheet-layout.vue'
import { ref } from 'vue'

defineProps<{ pizzaSizes: PizzaSizeInterface[] }>()
const pizzaSize = ref<PizzaSize>(PizzaSize.SMALL)
</script>

<template>
  <div class="content__diameter">
    <SheetLayout title="Выберите размер" content-class="diameter">
      <RadioDiameter
        v-for="s in pizzaSizes"
        :key="s.id"
        v-model="pizzaSize"
        :name="'diameter'"
        :label="s.name"
        :value="s.multiplier"
      />
    </SheetLayout>
  </div>
</template>

<style scoped lang="scss">
.content__diameter {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
