<script setup lang="ts">
import { useProfileStore } from '@/store'
import { storeToRefs } from 'pinia'

const profileStore = useProfileStore()
const { user, userImages } = storeToRefs(profileStore)
</script>

<template>
  <div class="user">
    <picture>
      <source
        type="image/webp"
        :srcset="`${userImages?.webp2x} 1x,
         ${userImages?.webp4x} 2x`"
      />
      <img
        :src="userImages?.jpg2x"
        :srcset="userImages?.jpg4x"
        alt="Василий Ложкин"
        width="72"
        height="72"
      />
    </picture>
    <div class="user__name">
      <span>{{ user?.name }}</span>
    </div>
    <p class="user__phone">
      Контактный телефон: <span>{{ user?.phone }}</span>
    </p>
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
