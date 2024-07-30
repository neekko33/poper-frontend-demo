import {mount} from '@vue/test-utils'
import {describe, test, expect} from 'vitest'

import LoginCard from '@/components/LoginCard.vue'

describe('LoginCard', () => {
  test('render title', () => {
    const wrapper = mount(LoginCard, {
      props: {
        title: 'test'
      }
    })

    expect(wrapper.text()).toContain('test')
  })

  test('render slot', () => {
    const wrapper = mount(LoginCard, {
      slots: {
        title: 'test'
      }
    })

    expect(wrapper.html()).toContain('test')
  })
})