import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import AppInput from '@/common/components/app-input.vue'

describe('AppInput.vue', () => {
  it('renders correctly with label, placeholder and error', () => {
    const wrapper = mount(AppInput, {
      props: {
        name: 'email',
        label: 'Email address',
        placeholder: 'Enter your email',
        error: 'Invalid email'
      }
    })

    expect(wrapper.text()).toContain('Email address')

    const input = wrapper.get('input')
    expect(input.attributes('name')).toBe('email')
    expect(input.attributes('placeholder')).toBe('Enter your email')

    const error = wrapper.get('.error')
    expect(error.text()).toBe('Invalid email')

    expect(wrapper.classes()).toContain('input--error')
  })

  it('supports v-model and emits updates', async () => {
    const wrapper = mount(AppInput, {
      props: {
        name: 'username',
        label: 'Username',
        modelValue: 'John'
      }
    })

    const input = wrapper.get('input')

    expect((input.element as HTMLInputElement).value).toBe('John')

    await input.setValue('Ivan')
    const emitted = wrapper.emitted('update:modelValue')

    expect(emitted).toBeTruthy()
    expect(emitted?.[0][0]).toBe('Ivan')
  })
})
