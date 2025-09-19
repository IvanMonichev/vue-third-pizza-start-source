<script setup lang="ts">
import AppButtonLink from '@/common/components/app-button-link.vue'
import AppButton from '@/common/components/app-button.vue'
</script>

<template>
  <section class="footer">
    <div class="footer__more">
      <AppButtonLink to="/" :variants="['border', 'arrow']"
        >Хочу еще одну</AppButtonLink
      >
    </div>
    <p class="footer__text">
      Перейти к конструктору<br />чтоб собрать ещё одну пиццу
    </p>
    <div class="footer__price">
      <b>Итого: 2 228 ₽</b>
    </div>

    <div class="footer__submit">
      <AppButton>Оформить заказ</AppButton>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/sass/ds-system/ds-colors';
@use '@/assets/sass/ds-system/ds-typography';

.footer {
  display: flex;
  align-items: center;

  margin-top: auto;
  padding: 25px 2.12%;

  background-color: rgba(ds-colors.$green-500, 0.1);
}

.footer__more {
  width: 220px;
  margin-right: 16px;

  a {
    padding-top: 16px;
    padding-bottom: 16px;
  }
}

.footer__text {
  @include ds-typography.l-s11-h13;

  color: rgba(ds-colors.$black, 0.5);
}

.footer__price {
  @include ds-typography.b-s24-h28;

  margin-right: 12px;
  margin-left: auto;
}

.footer__submit {
  button {
    padding: 16px 14px;
  }
}
</style>
