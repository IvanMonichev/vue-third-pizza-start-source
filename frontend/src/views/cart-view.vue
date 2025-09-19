<script setup lang="ts">
import AppTitle from '@/common/components/app-title.vue'
import CartAdditionalListItem from '@/modules/cart/cart-additional-list-item.vue'
import CartAdditionalList from '@/modules/cart/cart-additional-list.vue'
import CartForm from '@/modules/cart/cart-form.vue'
import CartItem from '@/modules/cart/cart-list-item.vue'
import CartList from '@/modules/cart/cart-list.vue'
import CartFooter from '@/modules/cart/cart-footer.vue'
import colaImg from '@/assets/img/cola.svg'
import sauceImg from '@/assets/img/sauce.svg'
import potatoImg from '@/assets/img/potato.svg'
</script>

<template>
  <form action="#" method="post" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <AppTitle>Корзина</AppTitle>
        </div>

        <!-- <div class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
        </div> -->

        <CartList>
          <CartItem />
          <CartItem />
        </CartList>

        <div class="cart__additional">
          <CartAdditionalList>
            <CartAdditionalListItem
              title="Coca-Cola 0,5 л"
              :price="56"
              :img-src="colaImg"
              img-alt="Coca-Cola 0,5 литра"
            />
            <CartAdditionalListItem
              title="Острый соус"
              :price="30"
              :img-src="sauceImg"
              img-alt="Острый соус"
            />
            <CartAdditionalListItem
              title="Картошка из печи"
              :price="56"
              :img-src="potatoImg"
              img-alt="Картошка из печи"
            />
          </CartAdditionalList>
        </div>

        <div class="cart__form">
          <CartForm />
        </div>
      </div>
    </main>
    <CartFooter />
  </form>
</template>

<style scoped lang="scss">
.content {
  padding-top: 20px;
}

.container {
  width: 770px;
  margin: 0 auto;
}

.cart__additional {
  margin-top: 15px;
  margin-bottom: 25px;
}

.cart__title {
  margin-bottom: 15px;
}

.layout-form {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
}

.visually-hidden {
  position: absolute;

  overflow: hidden;
  clip: rect(0 0 0 0);

  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;

  white-space: nowrap;

  border: 0;

  clip-path: inset(100%);
}
</style>
