<script setup lang="ts">
import { useCreateOrderMutation } from '@/api/orders.api'
import AppTitle from '@/common/components/app-title.vue'
import { DeliveryType } from '@/common/enums/delivery-type.enum'
import { Address } from '@/common/types/address.types'
import { CartAddressForm } from '@/common/types/cart.types'
import { OrderCreate } from '@/common/types/order.types'
import CartFooter from '@/modules/cart/cart-footer.vue'
import CartForm from '@/modules/cart/cart-form.vue'
import CartMiscList from '@/modules/cart/cart-misc-list.vue'
import CartPizzas from '@/modules/cart/cart-pizzas.vue'
import { useAddressStore, useCartStore, useProfileStore } from '@/store'
import { storeToRefs } from 'pinia'
import { useForm } from 'vee-validate'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { object, string } from 'yup'

const createOrder = useCreateOrderMutation()

const router = useRouter()
const cartStore = useCartStore()
const profileStore = useProfileStore()
const addressStore = useAddressStore()
const { setAddress } = cartStore
const { orderTotalPrice, miscCartList, pizzas, selectedAddress } =
  storeToRefs(cartStore)

const isEmptyPizzas = computed(() => pizzas.value.length === 0)
const userPhone = computed(() => profileStore.user?.phone ?? null)

const validationSchema = object({
  deliveryType: string().required('Выберите способ доставки'),
  phone: string()
    .required('Введите телефон')
    .matches(
      /^(\+7|8)\s?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/,
      'Некорректный формат телефона'
    ),
  street: string().when('deliveryType', {
    is: DeliveryType.NEW_ADDRESS,
    then: (schema) => schema.required('Введите улицу')
  }),
  house: string().when('deliveryType', {
    is: DeliveryType.NEW_ADDRESS,
    then: (schema) => schema.required('Введите дом')
  }),
  apartment: string().nullable()
})

const { handleSubmit, setFieldValue } = useForm<CartAddressForm>({
  initialValues: {
    deliveryType: selectedAddress.value?.id.toString() ?? DeliveryType.PICK_UP,
    house: selectedAddress.value?.building ?? '',
    apartment: selectedAddress.value?.flat ?? '',
    street: selectedAddress.value?.street ?? '',
    phone: userPhone.value ?? ''
  },
  validationSchema
})

const handleAddressSelect = (address: Address | null) => {
  if (!address) {
    setFieldValue('street', '')
    setFieldValue('house', '')
    setFieldValue('apartment', '')
    setAddress(null)
    return
  }

  setFieldValue('street', address.street)
  setFieldValue('house', address.building)
  setFieldValue('apartment', address.flat ?? '')
  setAddress(address)
}

const onSubmit = handleSubmit(async (values) => {
  let address = null
  if (values.deliveryType !== DeliveryType.PICK_UP) {
    address = {
      street: values.street,
      building: values.house,
      flat: values.apartment,
      comment: selectedAddress.value?.comment
    }
  }

  const payload: OrderCreate = {
    userId: profileStore.user?.id ?? null,
    phone: values.phone,
    address: address,
    pizzas: pizzas.value.map((p) => ({
      name: p.name,
      sauceId: p.sauceId,
      doughId: p.doughId,
      sizeId: p.sizeId,
      quantity: p.quantity,
      ingredients: p.ingredients.map((i) => ({
        ingredientId: i.id,
        quantity: i.quantity
      }))
    })),
    misc: miscCartList.value.map((m) => ({
      miscId: m.id,
      quantity: m.quantity
    }))
  }

  try {
    await createOrder.mutateAsync(payload)

    cartStore.resetStore()
    cartStore.setIsOrderSuccess(true)
    await router.push({ name: 'success-order-view' })
  } catch (err) {
    console.error('Ошибка при создании заказа:', err)
  }
})
</script>

<template>
  <form class="layout-form" @submit.prevent="onSubmit">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <AppTitle>Корзина</AppTitle>
        </div>
        <div v-if="isEmptyPizzas" class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
        </div>

        <CartPizzas v-else />

        <CartMiscList />

        <div class="cart__form">
          <CartForm
            :addresses="addressStore.addressesWithoutAddMode"
            @select-address="handleAddressSelect"
          />
        </div>
      </div>
    </main>
    <CartFooter :total-price="orderTotalPrice" />
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

.cart__empty {
  padding: 20px 30px;
}
</style>
