<script setup lang="ts">
import { useLogin } from '@/api/auth.api'
import AppButtonClose from '@/common/components/app-button-close.vue'
import AppButton from '@/common/components/app-button.vue'
import AppInput from '@/common/components/app-input.vue'
import AppTitle from '@/common/components/app-title.vue'
import { useField, useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import { object, string } from 'yup'

const loginSchema = object({
  email: string().required('Введите email').email('Некорректный email'),
  password: string().required('Введите пароль').min(6, 'Минимум 6 символов')
})

const router = useRouter()
const login = useLogin()
const { value: email, errorMessage: emailError } = useField('email')
const { value: password, errorMessage: passwordError } = useField('password')

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: loginSchema
})

const onSubmit = handleSubmit(async (values) => {
  try {
    await login.mutateAsync(values)
    router.push({ name: 'home-view' })
  } catch {
    // ошибка авторизации
  }
})
</script>

<template>
  <div class="sign-form">
    <AppButtonClose to="/" />
    <div class="sign-form__title">
      <AppTitle type="small">Авторизуйтесь на сайте</AppTitle>
    </div>
    <form @submit.prevent="onSubmit">
      <div class="sign-form__input">
        <AppInput
          v-model="email"
          type="email"
          name="email"
          placeholder="example@mail.ru"
        />
        <p v-if="emailError" class="error">{{ emailError }}</p>
      </div>

      <div class="sign-form__input">
        <AppInput
          v-model="password"
          type="password"
          name="password"
          placeholder="*********"
        />
        <p v-if="passwordError" class="error">{{ passwordError }}</p>
      </div>

      <AppButton type="submit" :disabled="isSubmitting || login.isPending">
        Авторизоваться
      </AppButton>

      <p v-if="login.isError" class="error">Неверный логин или пароль</p>
    </form>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/sass/ds-system/ds-colors';
@use '@/assets/sass/ds-system/ds-shadows';
@use '@/assets/sass/mixins/m_center';

.sign-form {
  @include m_center.pf_center-all;

  z-index: 10;

  display: block;

  box-sizing: border-box;
  width: 455px;
  padding-top: 146px;
  padding-right: 32px;
  padding-bottom: 32px;
  padding-left: 32px;

  background: ds-colors.$white url('@/assets/img/popup.svg') no-repeat center
    top;
  box-shadow: ds-shadows.$shadow-light;

  button {
    margin: 0 auto;
    padding: 16px 14px;
  }
}

.sign-form__title {
  margin-bottom: 24px;

  text-align: center;
}

.sign-form__input {
  margin-bottom: 16px;
}
</style>
