<script setup lang="ts">
import { useLogin } from '@/api/auth.api'
import AppButtonClose from '@/common/components/app-button-close.vue'
import AppButton from '@/common/components/app-button.vue'
import AppInput from '@/common/components/app-input.vue'
import AppTitle from '@/common/components/app-title.vue'
import { AxiosError } from 'axios'
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import { object, string } from 'yup'

interface LoginForm {
  email: string
  password: string
}

const loginSchema = object({
  email: string()
    .required('Введите email')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Некорректный email'),
  password: string().required('Введите пароль').min(6, 'Минимум 6 символов')
})

const { handleSubmit, isSubmitting } = useForm<LoginForm>({
  validationSchema: loginSchema,
  initialValues: {
    email: 'user@example.com',
    password: 'user@example.com'
  }
})

const router = useRouter()
const login = useLogin()

const onSubmit = handleSubmit(async (values) => {
  try {
    await login.mutateAsync(values)
    router.push({ name: 'home-view' })
  } catch (e: unknown) {
    console.log('e', e)
    if (e instanceof AxiosError) {
      const errorMessage = e?.response?.data.error.message
      if (errorMessage) {
        toast.error(errorMessage)
      }
    }
  }
})
</script>

<template>
  <div class="sign-form">
    <AppButtonClose to="/" />
    <div class="sign-form__title">
      <AppTitle type="small">Авторизуйтесь на сайте</AppTitle>
    </div>
    <form novalidate @submit="onSubmit">
      <div class="sign-form__input">
        <AppInput type="email" name="email" placeholder="example@mail.ru" />
      </div>

      <div class="sign-form__input">
        <AppInput type="password" name="password" placeholder="*********" />
      </div>
      <AppButton
        type="submit"
        :disabled="isSubmitting || login.isPending.value"
      >
        Авторизоваться
      </AppButton>
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

  &__error {
    color: ds-colors.$red-900;
    font-weight: 600;
    font-size: 12px;
    line-height: 1;
    margin: 0;
  }
}

.sign-form__title {
  margin-bottom: 24px;

  text-align: center;
}

.sign-form__input {
  margin-bottom: 24px;
}
</style>
