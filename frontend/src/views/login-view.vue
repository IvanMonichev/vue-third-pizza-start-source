<script setup lang="ts">
import AppButton from '@/common/components/app-button.vue'
import AppInput from '@/common/components/app-input.vue'
import AppTitle from '@/common/components/app-title.vue'
</script>

<template>
  <div class="sign-form">
    <RouterLink to="/" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </RouterLink>
    <div class="sign-form__title">
      <AppTitle type="small">Авторизуйтесь на сайте</AppTitle>
    </div>
    <form action="#" method="post">
      <div class="sign-form__input">
        <AppInput type="email" name="email" placeholder="example@mail.ru" />
      </div>

      <div class="sign-form__input">
        <AppInput type="password" name="password" placeholder="*********" />
      </div>
      <AppButton type="submit">Авторизоваться</AppButton>
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

.close {
  position: absolute;
  top: 16px;
  right: 16px;

  width: 25px;
  height: 25px;

  cursor: pointer;
  transition: 0.3s;
  text-decoration: none;

  color: ds-colors.$black;
  border-radius: 50%;
  outline: none;

  &::before,
  &::after {
    position: absolute;
    top: 50%;
    left: 50%;

    width: 25px;
    height: 2px;

    content: '';

    border-radius: 2px;
    background-color: ds-colors.$black;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.5;
  }

  &:focus {
    &::before,
    &::after {
      background-color: ds-colors.$orange-100;
    }
  }

  &--white {
    &::before,
    &::after {
      background-color: ds-colors.$white;
    }
  }
}
</style>
