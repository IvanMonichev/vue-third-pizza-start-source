<script setup lang="ts">
import AppInput from '@/common/components/app-input.vue'
import RadioDough from '@/common/components/radio-dough.vue'
import { DoughSize } from '@/common/enums/dough-size.enum'
import { Dough } from '@/common/types/dough.types'
import dough from '@/mocks/dough.json'
import ingredients from '@/mocks/ingredients.json'
import sauces from '@/mocks/sauces.json'
import sizes from '@/mocks/sizes.json'
import { mapIngredient } from '@/views/home-view.service'
import { ref } from 'vue'

const doughTypes: Dough[] = dough
const viewIngredients = ingredients.map(mapIngredient)
const pizzaSauces = sauces
const pizzaSizes = sizes

const pizzaName = ref('')
const doughValue = ref<DoughSize>(DoughSize.LIGHT)
</script>

<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите тесто</h2>

            <div class="sheet__content dough">
              <RadioDough
                v-for="d in doughTypes"
                :key="d.id"
                v-model="doughValue"
                :name="'dought'"
                :description="d.description"
                :label="d.name"
                :value="d.size"
              />
            </div>
          </div>
        </div>

        <div class="content__diameter">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите размер</h2>

            <div class="sheet__content diameter">
              <label
                v-for="s in pizzaSizes"
                :key="s.id"
                :class="`diameter__input diameter__input--${s.value}`"
              >
                <input
                  type="radio"
                  name="diameter"
                  :value="s.value"
                  class="visually-hidden"
                />
                <span>{{ s.name }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <div class="sheet__content ingredients">
              <div class="ingredients__sauce">
                <p>Основной соус:</p>

                <label
                  v-for="s in pizzaSauces"
                  :key="s.id"
                  class="radio ingredients__input"
                >
                  <input type="radio" name="sauce" :value="s.value" />
                  <span>{{ s.name }}</span>
                </label>
              </div>

              <div class="ingredients__filling">
                <p>Начинка:</p>

                <ul class="ingredients__list">
                  <li
                    v-for="ingredient in viewIngredients"
                    :key="ingredient.id"
                    class="ingredients__item"
                  >
                    <span :class="`filling ${ingredient.class}`">{{
                      ingredient.name
                    }}</span>

                    <div class="counter counter--orange ingredients__counter">
                      <button
                        type="button"
                        class="counter__button counter__button--minus"
                        disabled
                      >
                        <span class="visually-hidden">Меньше</span>
                      </button>
                      <input
                        type="text"
                        name="counter"
                        class="counter__input"
                        value="0"
                      />
                      <button
                        type="button"
                        class="counter__button counter__button--plus"
                      >
                        <span class="visually-hidden">Больше</span>
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <AppInput
            v-model="pizzaName"
            placeholder="Введите название пиццы"
            name="pizza_name"
            label="Название пиццы"
          />

          <div class="content__constructor">
            <div class="pizza pizza--foundation--big-tomato">
              <div class="pizza__wrapper">
                <div class="pizza__filling pizza__filling--ananas" />
                <div class="pizza__filling pizza__filling--bacon" />
                <div class="pizza__filling pizza__filling--cheddar" />
              </div>
            </div>
          </div>

          <div class="content__result">
            <p>Итого: 0 ₽</p>
            <button type="button" class="button" disabled>Готовьте!</button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>
<style lang="scss" scoped>
@use '@/assets/sass/ds-system/ds-colors';
@use '@/assets/sass/ds-system/ds-typography';
@use '@/assets/sass/ds-system/ds-shadows';
@use '@/assets/sass/mixins/m_center';
@use '@/assets/sass/mixins/m_clear-list';
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

.title {
  box-sizing: border-box;
  width: 100%;
  margin: 0;

  color: ds-colors.$black;

  &--big {
    @include ds-typography.b-s36-h42;
  }

  &--small {
    @include ds-typography.b-s18-h21;
  }
}

.content__dough {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

.content__diameter {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.content__ingredients {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

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

.sheet {
  padding-top: 15px;

  border-radius: 8px;
  background-color: ds-colors.$white;
  box-shadow: ds-shadows.$shadow-light;
}

.sheet__title {
  padding-right: 18px;
  padding-left: 18px;
}

.sheet__content {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  margin-top: 8px;
  padding-top: 18px;
  padding-right: 18px;
  padding-left: 18px;

  border-top: 1px solid rgba(ds-colors.$green-500, 0.1);
}

.visually-hidden {
  position: absolute;

  overflow: hidden;
  clip: rect(0 0 0 0);

  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;

  white-space: nowrap;

  border: 0;

  clip-path: inset(100%);
}

.ingredients__sauce {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  margin-bottom: 14px;

  p {
    @include ds-typography.r-s16-h19;

    margin-top: 0;
    margin-right: 16px;
    margin-bottom: 10px;
  }
}

.ingredients__input {
  margin-right: 24px;
  margin-bottom: 10px;
}

.ingredients__filling {
  width: 100%;

  p {
    @include ds-typography.r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
  }
}

.ingredients__list {
  @include m_clear-list.clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}

.ingredients__item {
  width: 100px;
  min-height: 40px;
  margin-right: 17px;
  margin-bottom: 35px;
}

.ingredients__counter {
  width: 54px;
  margin-top: 10px;
  margin-left: 36px;
}

.counter {
  display: flex;

  justify-content: space-between;
  align-items: center;
}

.counter__button {
  $el: &;
  $size_icon: 50%;

  position: relative;

  display: block;

  width: 16px;
  height: 16px;
  margin: 0;
  padding: 0;

  cursor: pointer;
  transition: 0.3s;

  border: none;
  border-radius: 50%;
  outline: none;

  &--minus {
    background-color: ds-colors.$purple-100;

    &::before {
      @include m_center.p_center-all;

      width: $size_icon;
      height: 2px;

      content: '';

      border-radius: 2px;
      background-color: ds-colors.$black;
    }

    &:hover:not(:active):not(:disabled) {
      background-color: ds-colors.$purple-200;
    }

    &:active:not(:disabled) {
      background-color: ds-colors.$purple-300;
    }

    &:focus:not(:disabled) {
      box-shadow: ds-shadows.$shadow-regular;
    }

    &:disabled {
      cursor: default;

      &::before {
        opacity: 0.1;
      }
    }
  }

  &--plus {
    background-color: ds-colors.$green-500;

    &::before {
      @include m_center.p_center-all;

      width: $size_icon;
      height: 2px;

      content: '';

      border-radius: 2px;
      background-color: ds-colors.$white;
    }

    &::after {
      @include m_center.p_center-all;

      width: $size_icon;
      height: 2px;

      content: '';
      transform: translate(-50%, -50%) rotate(90deg);

      border-radius: 2px;
      background-color: ds-colors.$white;
    }

    &:hover:not(:active):not(:disabled) {
      background-color: ds-colors.$green-400;
    }

    &:active:not(:disabled) {
      background-color: ds-colors.$green-600;
    }

    &:focus:not(:disabled) {
      box-shadow: ds-shadows.$shadow-regular;
    }

    &:disabled {
      cursor: default;

      opacity: 0.3;
    }
  }

  &--orange {
    background-color: ds-colors.$orange-200;

    &:hover:not(:active):not(:disabled) {
      background-color: ds-colors.$orange-100;
    }

    &:active:not(:disabled) {
      background-color: ds-colors.$orange-300;
    }
  }
}

.counter__input {
  @include ds-typography.r-s14-h16;

  box-sizing: border-box;
  width: 22px;
  margin: 0;
  padding: 0 3px;

  text-align: center;

  color: ds-colors.$black;
  border: none;
  border-radius: 10px;
  outline: none;
  background-color: transparent;

  &:focus {
    box-shadow: inset ds-shadows.$shadow-regular;
  }
}
</style>
