<script setup lang="ts">
import AppButtonClose from '@/common/components/app-button-close.vue'
import AppButton from '@/common/components/app-button.vue'
import AppInput from '@/common/components/app-input.vue'
import AppTitle from '@/common/components/app-title.vue'
</script>

<template>
  <div class="sign-form">
    <AppButtonClose />
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
</style>
