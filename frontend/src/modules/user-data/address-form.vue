<script setup lang="ts">
import AppButtonIcon from '@/common/components/app-button-icon.vue'
import AppButton from '@/common/components/app-button.vue'
import AppInput from '@/common/components/app-input.vue'
import { ref } from 'vue'

interface Props {
  mode: 'view' | 'edit'
}

const props = defineProps<Props>()

const isEditing = ref(props.mode === 'edit')
</script>

<template>
  <div class="layout__address">
    <!-- Режим просмотра -->
    <div v-if="!isEditing" class="sheet address-form">
      <div class="address-form__header">
        <b>Адрес №1. Тест</b>
        <div class="address-form__edit">
          <AppButtonIcon @click="isEditing = true"
            >Изменить адрес</AppButtonIcon
          >
        </div>
      </div>
      <p>Невский пр., д. 22, кв. 46</p>
      <small>Позвоните, пожалуйста, от проходной</small>
    </div>

    <!-- Режим редактирования -->
    <form
      v-if="isEditing"
      action="test.html"
      method="post"
      class="address-form address-form--opened sheet"
    >
      <div class="address-form__header">
        <b>Адрес №1</b>
      </div>

      <div class="address-form__wrapper">
        <!-- inputs -->
        <div class="address-form__input">
          <AppInput
            label="Название адреса*"
            name="addr-name"
            placeholder="Введите название адреса"
            :required="true"
          />
        </div>
        <div class="address-form__input address-form__input--size--normal">
          <AppInput
            label="Улица*"
            name="addr-street"
            placeholder="Введите название улицы"
            :required="true"
          />
        </div>
        <div class="address-form__input address-form__input--size--small">
          <AppInput
            label="Дом*"
            name="addr-house"
            placeholder="Введите номер дома"
            :required="true"
          />
        </div>
        <div class="address-form__input address-form__input--size--small">
          <AppInput
            label="Квартира"
            name="addr-apartment"
            placeholder="Введите № квартиры"
          />
        </div>
        <div class="address-form__input">
          <AppInput
            label="Комментарий"
            name="addr-comment"
            placeholder="Введите комментарий"
          />
        </div>
      </div>

      <div class="address-form__buttons">
        <AppButton
          type="button"
          variant="transparent"
          @click="isEditing = false"
          >Удалить
        </AppButton>
        <AppButton type="submit">Сохранить</AppButton>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/sass/ds-system/ds-colors';
@use '@/assets/sass/ds-system/ds-shadows';
@use '@/assets/sass/ds-system/ds-typography';

.layout__address {
  margin-top: 16px;
}

.address-form {
  $bl: &;

  position: relative;

  padding-top: 0;
  padding-bottom: 26px;

  &--opened {
    #{$bl}__header {
      padding: 16px;
    }
  }

  p {
    @include ds-typography.r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
    padding: 0 16px;
  }

  small {
    @include ds-typography.l-s11-h13;

    display: block;

    padding: 0 16px;
  }
}

.address-form__wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  width: 80%;
  padding: 16px;
}

.address-form__input {
  width: 100%;
  margin-bottom: 16px;

  &--size {
    &--normal {
      width: 60.5%;
    }

    &--small {
      width: 18%;
    }
  }
}

.address-form__buttons {
  display: flex;
  justify-content: flex-end;

  padding: 0 16px;

  button {
    margin-left: 16px;
    padding: 16px 27px;
  }
}

.address-form__header {
  @include ds-typography.b-s14-h16;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 21px;
  padding: 10px 16px;

  border-bottom: 1px solid rgba(ds-colors.$green-500, 0.1);
}
</style>
