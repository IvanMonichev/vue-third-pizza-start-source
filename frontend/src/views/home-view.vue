<script setup lang="ts">
import dough from '@/mocks/dough.json'
import ingredients from '@/mocks/ingredients.json'
import sauces from '@/mocks/sauces.json'
import sizes from '@/mocks/sizes.json'
import { mapIngredient } from '@/views/home-view.service'

const doughTypes = dough
const viewIngredients = ingredients.map(mapIngredient)
const pizzaSauces = sauces
const pizzaSizes = sizes
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
              <label
                v-for="type in doughTypes"
                :key="type.id"
                :class="{
                  dough__input: true,
                  'dough__input--light': type.size === 'light',
                  'dough__input--large': type.size === 'large'
                }"
              >
                <input
                  type="radio"
                  name="dought"
                  value="light"
                  class="visually-hidden"
                  checked
                />
                <b>{{ type.name }}</b>
                <span>{{ type.description }}</span>
              </label>
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
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
            />
          </label>

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
