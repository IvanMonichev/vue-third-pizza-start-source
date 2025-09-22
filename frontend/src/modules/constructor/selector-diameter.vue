<script setup lang="ts">
import { PizzaSize } from '@/common/types/size.types'
import RadioDiameter from '@/modules/constructor/radio-diameter.vue'
import { PizzaSizeValue } from '@/common/enums/pizza-size-value.enum'
import SheetLayout from '@/modules/constructor/sheet-layout.vue'
import { ref } from 'vue'

defineProps<{ pizzaSizes: PizzaSize[] }>()
const pizzaSize = ref<PizzaSizeValue>(PizzaSizeValue.SMALL)
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
