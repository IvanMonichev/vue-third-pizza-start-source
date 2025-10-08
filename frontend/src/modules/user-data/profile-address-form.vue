<script setup lang="ts">
import AppButton from '@/common/components/app-button.vue'
import { AddressProfile } from '@/common/types/address.types'
import { computed } from 'vue'
import { AddressMode } from '@/common/enums/address-mode.enum'
import AppButtonIcon from '@/common/components/app-button-icon.vue'
import { useForm } from 'vee-validate'
import { object, string } from 'yup'
import AppFormInput from '@/common/components/app-form-input.vue'

interface Props {
  address: AddressProfile
}

interface ProfileForm {
  name: string
  street: string
  building: string
  flat?: string
  comment?: string
}

const { address } = defineProps<Props>()
const isEditMode = computed(() => address.addressMode === AddressMode.EDIT)
const isAddMode = computed(() => address.addressMode === AddressMode.ADD)

const profileSchema = object({
  name: string().required('Введите название адреса'),
  street: string().required('Введите название улицы'),
  building: string().required('Введите номер дома'),
  flat: string().optional(),
  comment: string().optional()
})

const { handleSubmit, isSubmitting } = useForm<ProfileForm>({
  validationSchema: profileSchema,
  initialValues: {
    name: address.name,
    street: address.street,
    building: address.building,
    flat: address.flat,
    comment: address.comment
  }
})

const onSubmit = handleSubmit(async (values) => {
  console.log('values', values)
})
</script>

<template>
  <form
    novalidate
    class="address-form address-form--opened sheet"
    @submit.prevent="onSubmit"
  >
    <div class="address-form__header">
      <b v-if="isAddMode">Новый адрес</b>
      <b v-if="isEditMode">{{ address.name }}</b>
      <div v-if="isEditMode" class="address-form__edit">
        <AppButtonIcon>Изменить адрес</AppButtonIcon>
      </div>
    </div>

    <div class="address-form__wrapper">
      <!-- inputs -->
      <div class="address-form__input">
        <AppFormInput
          label="Название адреса*"
          name="name"
          placeholder="Введите название адреса"
        />
      </div>
      <div class="address-form__input address-form__input--size--normal">
        <AppFormInput
          label="Улица*"
          name="street"
          placeholder="Введите название улицы"
        />
      </div>
      <div class="address-form__input address-form__input--size--small">
        <AppFormInput
          label="Дом*"
          name="building"
          placeholder="Введите номер дома"
        />
      </div>
      <div class="address-form__input address-form__input--size--small">
        <AppFormInput
          label="Квартира"
          name="flat"
          placeholder="Введите № квартиры"
        />
      </div>
      <div class="address-form__input">
        <AppFormInput
          label="Комментарий"
          name="comment"
          placeholder="Введите комментарий"
        />
      </div>
    </div>

    <div class="address-form__buttons">
      <AppButton type="button" variant="transparent">Удалить</AppButton>
      <AppButton type="submit" :disabled="isSubmitting">Сохранить</AppButton>
    </div>
  </form>
</template>

<style scoped lang="scss">
@use '@/assets/sass/ds-system/ds-colors';
@use '@/assets/sass/ds-system/ds-shadows';
@use '@/assets/sass/ds-system/ds-typography';
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
