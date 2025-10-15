import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import AppButton from '@/common/components/app-button.vue'

describe('AppButton.vue', () => {
  it('renders with correct variant, type and disabled state', () => {
    const wrapper = mount(AppButton, {
      props: {
        variant: 'border',
        type: 'submit',
        disabled: true
      },
      slots: {
        default: 'Click me'
      }
    })

    const button = wrapper.get('button')

    expect(button.attributes('type')).toBe('submit')
    expect(button.classes()).toContain('button--border')
    expect(button.attributes('disabled')).toBeDefined()
    expect(button.text()).toBe('Click me')
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(AppButton, {
      props: {
        variant: 'default'
      },
      slots: {
        default: 'Press'
      }
    })

    const button = wrapper.get('button')
    await button.trigger('click')

    expect(wrapper.emitted('click')).toHaveLength(1)
    expect(wrapper.emitted('click')?.[0][0]).toBeInstanceOf(MouseEvent)
  })
})
