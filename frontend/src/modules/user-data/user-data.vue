<script setup lang="ts"></script>

<template>
  <div class="user">
    <picture>
      <source
        type="image/webp"
        srcset="
          @/assets/img/users/user5@2x.webp 1x,
          @/assets/img/users/user5@4x.webp 2x
        "
      />
      <img
        src="@/assets/img/users/user5@2x.jpg"
        srcset="@/assets/img/users/user5@4x.jpg"
        alt="Василий Ложкин"
        width="72"
        height="72"
      />
    </picture>
    <div class="user__name">
      <span>Василий Ложкин</span>
    </div>
    <p class="user__phone">Контактный телефон: <span>+7 999-999-99-99</span></p>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/sass/ds-system/ds-typography';

.user {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  margin-bottom: 33px;
}

.user__name {
  @include ds-typography.b-s20-h23;

  margin-left: 30px;

  span {
    display: inline-block;

    vertical-align: middle;
  }
}

.user__button {
  display: inline-block;

  cursor: pointer;
  vertical-align: middle;
}

.user__phone {
  @include ds-typography.b-s16-h19;

  width: 100%;
  margin-top: 20px;

  span {
    font-weight: 400;
  }
}
</style>
