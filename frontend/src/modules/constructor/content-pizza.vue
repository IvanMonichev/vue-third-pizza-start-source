<script setup lang="ts">
import AppButton from '@/common/components/app-button.vue'
import AppDrop from '@/common/components/app-drop.vue'
import AppInput from '@/common/components/app-input.vue'
import { usePizzaStore } from '@/store'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const pizzaName = ref('')
const handleDropIngredient = (payload: object) => {
  console.log(payload)
}

const { ingredients, pizzaPrice, dough, sauce } = storeToRefs(usePizzaStore())
</script>

<template>
  <div class="content__pizza">
    <AppInput
      v-model="pizzaName"
      placeholder="Введите название пиццы"
      name="pizza_name"
      label="Название пиццы"
      :label-hidden="true"
    />

    <AppDrop @drop="handleDropIngredient">
      <div class="content__constructor">
        <div
          :class="[
            `pizza`,
            `pizza--foundation--${dough?.className}-${sauce?.className}`
          ]"
        >
          <div class="pizza__wrapper">
            <div
              v-for="i in ingredients"
              :key="i.id"
              :class="[
                'pizza__filling',
                `pizza__filling--${i.className}`,
                i.quantity === 2 ? 'pizza__filling--second' : '',
                i.quantity === 3 ? 'pizza__filling--third' : ''
              ]"
            />
          </div>
        </div>
      </div>
    </AppDrop>

    <div class="content__result">
      <p>Итого: {{ pizzaPrice }} ₽</p>
      <AppButton type="button" disabled>Готовьте!</AppButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/sass/ds-system/ds-typography';
.content__pizza {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.content__constructor {
  width: 315px;
  margin-top: 25px;
  margin-right: auto;
  margin-left: auto;
}

.pizza {
  position: relative;

  display: block;

  box-sizing: border-box;
  width: 100%;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  &--foundation--large-creamy {
    background-image: url('@/assets/img/foundation/big-creamy.svg');
  }

  &--foundation--large-tomato {
    background-image: url('@/assets/img/foundation/big-tomato.svg');
  }

  &--foundation--light-creamy {
    background-image: url('@/assets/img/foundation/small-creamy.svg');
  }

  &--foundation--light-tomato {
    background-image: url('@/assets/img/foundation/small-tomato.svg');
  }
}

.pizza__wrapper {
  width: 100%;
  padding-bottom: 100%;
}

.pizza__filling {
  $bl: &;
  position: absolute;
  top: 0;
  left: 0;

  display: block;

  width: 100%;
  height: 100%;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  &::before,
  &::after {
    display: none;

    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    content: '';

    background-image: inherit;
  }

  &--second {
    &::before {
      display: block;

      transform: rotate(45deg);
    }
  }

  &--third {
    &::before {
      display: block;

      transform: rotate(45deg);
    }

    &::after {
      display: block;

      transform: rotate(-45deg);
    }
  }

  &--ananas,
  &--ananas.pizza__filling--second::before,
  &--ananas.pizza__filling--third::after {
    background-image: url('@/assets/img/filling-big/ananas.svg');
  }

  &--bacon,
  &--bacon.pizza__filling--second::before,
  &--bacon.pizza__filling--third::after {
    background-image: url('@/assets/img/filling-big/bacon.svg');
  }

  &--blue_cheese,
  &--blue.pizza__filling--second::before,
  &--blue.pizza__filling--third::after {
    background-image: url('@/assets/img/filling-big/blue_cheese.svg');
  }

  &--cheddar,
  &--cheddar.pizza__filling--second::before,
  &--cheddar.pizza__filling--third::after {
    background-image: url('@/assets/img/filling-big/cheddar.svg');
  }

  &--chile,
  &--chile.pizza__filling--second::before,
  &--chile.pizza__filling--third::after {
    background-image: url('@/assets/img/filling-big/chile.svg');
  }

  &--ham,
  &--ham.pizza__filling--second::before,
  &--ham.pizza__filling--third::after {
    background-image: url('@/assets/img/filling-big/ham.svg');
  }

  &--jalapeno,
  &--jalapeno.pizza__filling--second::before,
  &--jalapeno.pizza__filling--third::after {
    background-image: url('@/assets/img/filling-big/jalapeno.svg');
  }

  &--mozzarella,
  &--mozzarella.pizza__filling--second::before,
  &--mozzarella.pizza__filling--third::after {
    background-image: url('@/assets/img/filling-big/mozzarella.svg');
  }

  &--mushrooms,
  &--mushrooms.pizza__filling--second::before,
  &--mushrooms.pizza__filling--third::after {
    background-image: url('@/assets/img/filling-big/mushrooms.svg');
  }

  &--olives,
  &--olives.pizza__filling--second::before,
  &--olives.pizza__filling--third::after {
    background-image: url('@/assets/img/filling-big/olives.svg');
  }

  &--onion,
  &--onion.pizza__filling--second::before,
  &--onion.pizza__filling--third::after {
    background-image: url('@/assets/img/filling-big/onion.svg');
  }

  &--parmesan,
  &--parmesan.pizza__filling--second::before,
  &--parmesan.pizza__filling--third::after {
    background-image: url('@/assets/img/filling-big/parmesan.svg');
  }

  &--salami,
  &---salami.pizza__filling--second::before,
  &---salami.pizza__filling--third::after {
    background-image: url('@/assets/img/filling-big/salami.svg');
  }

  &--salmon,
  &--salmon.pizza__filling--second::before,
  &--salmon.pizza__filling--third::after {
    background-image: url('@/assets/img/filling-big/salmon.svg');
  }

  &--tomatoes,
  &--tomatoes.pizza__filling--second::before,
  &--tomatoes.pizza__filling--third::after {
    background-image: url('@/assets/img/filling-big/tomatoes.svg');
  }
}

.content__result {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 25px;

  p {
    @include ds-typography.b-s24-h28;

    margin: 0;
  }

  button {
    margin-left: 12px;
    padding: 16px 45px;
  }
}
</style>
