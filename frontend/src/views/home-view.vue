<script setup lang="ts">
import AppTitle from '@/common/components/app-title.vue'
import ContentPizza from '@/modules/constructor/content-pizza.vue'
import SelectorDiameter from '@/modules/constructor/selector-diameter.vue'
import SelectorDough from '@/modules/constructor/selector-dough.vue'
import SelectorIngredients from '@/modules/constructor/selector-ingredients.vue'
</script>

<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <app-title>Конструктор пиццы</app-title>
        <selector-dough />
        <selector-diameter />
        <selector-ingredients />
        <content-pizza />
      </div>
    </form>
  </main>
</template>
<style lang="scss" scoped>
.content {
  padding-top: 20px;
}

.content__wrapper {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  width: 920px;
  margin: 0 auto;
  padding-right: 2.12%;
  padding-bottom: 30px;
  padding-left: 2.12%;
}
</style>
