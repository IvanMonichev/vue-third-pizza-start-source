<script setup lang="ts">
import { useLogin } from '@/api/auth.api'
import AppButtonClose from '@/common/components/app-button-close.vue'
import AppButton from '@/common/components/app-button.vue'
import AppFormInput from '@/common/components/app-form-input.vue'
import AppTitle from '@/common/components/app-title.vue'
import { AxiosError } from 'axios'
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import { object, string } from 'yup'
import AppLayoutBlank from '@/layouts/app-layout-blank.vue'
import SlideTransition from '@/common/components/slide-transition.vue'

interface LoginForm {
  email: string
  password: string
}
const router = useRouter()
const login = useLogin()

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

const onSubmit = handleSubmit(async (values) => {
  try {
    await login.mutateAsync(values)

    await router.push({ name: 'home-view' })
  } catch (e: unknown) {
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
  <app-layout-blank>
    <slide-transition>
      <div class="sign-form">
        <app-button-close to="/" />
        <div class="sign-form__title">
          <app-title type="small">Авторизуйтесь на сайте</app-title>
        </div>
        <form novalidate @submit.prevent="onSubmit">
          <div class="sign-form__input">
            <app-form-input
              name="email"
              type="email"
              placeholder="example@mail.ru"
            />
          </div>

          <div class="sign-form__input">
            <app-form-input
              name="password"
              type="password"
              placeholder="********"
            />
          </div>
          <app-button
            type="submit"
            :disabled="isSubmitting || login.isPending.value"
          >
            Авторизоваться
          </app-button>
        </form>
      </div>
    </slide-transition>
  </app-layout-blank>
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
