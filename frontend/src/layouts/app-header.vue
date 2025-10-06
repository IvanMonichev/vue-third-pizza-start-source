<script setup lang="ts">
import logo from '@/assets/img/logo.svg'
import { AppConfig } from '@/modules/cart/config/app.config'
import { useCartStore } from '@/store'
import { useAuthStore } from '@/store/auth.store'
import { computed } from 'vue'

const cartStore = useCartStore()
const authStore = useAuthStore()
const images = computed(() => authStore.userImages)

const handleClick = () => {
  authStore.clearAuth()
}
</script>

<template>
  <header class="header">
    <div class="header__logo">
      <RouterLink to="/" class="logo">
        <img :src="logo" alt="V!U!E! Pizza logo" width="90" height="40" />
      </RouterLink>
    </div>
    <div class="header__cart">
      <RouterLink to="/cart"
        >{{
          cartStore.orderTotalPrice.toLocaleString(AppConfig.Locale)
        }}
        ₽</RouterLink
      >
    </div>
    <div class="header__user">
      <RouterLink v-if="authStore.isAuthenticated" :to="{ name: 'user-view' }">
        <picture v-if="images">
          <source
            type="image/webp"
            :srcset="`${images.webp} 1x, ${images.webp2x} 2x`"
          />
          <img
            :src="images.jpg"
            :srcset="`${images.jpg2x} 2x`"
            :alt="authStore.user?.name || 'User avatar'"
            width="32"
            height="32"
          />
        </picture>
        <span>{{ authStore.user?.name }}</span>
      </RouterLink>
      <RouterLink
        v-if="authStore.isUnauthenticated"
        to="/sign-in"
        class="header__login"
        ><span>Войти</span></RouterLink
      >
      <RouterLink
        v-if="authStore.isAuthenticated"
        to="/"
        class="header__logout"
        @click="handleClick"
        ><span>Выйти</span></RouterLink
      >
    </div>
  </header>
</template>
<style lang="scss" scoped>
@use '@/assets/sass/ds-system/ds-colors';
@use '@/assets/sass/ds-system/ds-shadows';
@use '@/assets/sass/ds-system/ds-typography';

.header {
  position: relative;
  z-index: 2;

  display: flex;

  padding: 0 2.12%;

  background-color: ds-colors.$green-500;
  box-shadow: ds-shadows.$shadow-light;
}

.header__logo {
  padding-top: 10px;
  padding-bottom: 10px;
}

.header__cart {
  margin-right: 10px;
  margin-left: auto;

  a {
    @include ds-typography.b-s16-h19;

    display: block;

    padding-top: 21px;
    padding-right: 15px;
    padding-bottom: 21px;
    padding-left: 58px;

    transition: 0.3s;

    color: ds-colors.$white;
    background-color: ds-colors.$green-500;
    background-image: url('@/assets/img/cart.svg');
    background-repeat: no-repeat;
    background-position: 20px center;
    background-size: 29px 27px;

    &:hover:not(:active) {
      background-color: ds-colors.$green-400;
    }

    &:active {
      background-color: ds-colors.$green-600;
    }

    &:focus {
      opacity: 0.5;
    }
  }
}

.header__user {
  display: flex;
  align-items: center;

  a {
    display: block;

    padding-top: 14px;
    padding-right: 20px;
    padding-bottom: 14px;
    padding-left: 20px;

    transition: 0.3s;

    background-color: ds-colors.$green-500;

    &:hover:not(:active) {
      background-color: ds-colors.$green-400;
    }

    &:active {
      background-color: ds-colors.$green-600;
    }

    &:focus {
      opacity: 0.5;
    }
  }

  img {
    display: inline-block;

    width: 32px;
    height: 32px;
    margin-right: 8px;

    vertical-align: middle;

    border-radius: 50%;
  }

  span {
    @include ds-typography.r-s14-h16;

    display: inline-block;

    vertical-align: middle;

    color: ds-colors.$white;
  }
}

.header__login {
  &::after {
    display: inline-block;

    width: 32px;
    height: 32px;
    margin-left: 8px;

    content: '';
    vertical-align: middle;

    background: url(@/assets/img/login.svg) no-repeat center;
    background-size: auto 50%;
  }
}

.header__logout {
  &::before {
    display: inline-block;

    width: 32px;
    height: 32px;
    margin-right: 8px;

    content: '';
    vertical-align: middle;

    background: url(@/assets/img/login.svg) no-repeat center;
    background-size: auto 50%;
  }
}
</style>
