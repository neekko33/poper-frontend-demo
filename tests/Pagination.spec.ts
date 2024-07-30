import {mount} from '@vue/test-utils'
import {test, describe, expect} from 'vitest'

import Pagination from '@/components/Pagination.vue'

describe('Pagination', () => {
  test('render correctly', () => {
    const wrapper = mount(Pagination, {
      props: {
        totalPages: 3,
        modelValue: 1,
        'onUpdate:modelValue': (e) => wrapper.setProps({modelValue: e})
      }
    })

    expect(wrapper.text()).toContain('Page 1 of 3')
  })

  test('click next button', async () => {
    const wrapper = mount(Pagination, {
      props: {
        totalPages: 3,
        modelValue: 1,
        'onUpdate:modelValue': (e) => wrapper.setProps({modelValue: e})
      }
    })

    await wrapper.findAll('button')[1].trigger('click')
    expect(wrapper.text()).toContain('Page 2 of 3')

    await wrapper.findAll('button')[1].trigger('click')
    expect(wrapper.text()).toContain('Page 3 of 3')
    expect(wrapper.findAll('button')[1].isDisabled()).toBe(true)
  })

  test('click previous button', async () => {
    const wrapper = mount(Pagination, {
      props: {
        totalPages: 3,
        modelValue: 3,
        'onUpdate:modelValue': (e) => wrapper.setProps({modelValue: e})
      }
    })

    await wrapper.findAll('button')[0].trigger('click')
    expect(wrapper.text()).toContain('Page 2 of 3')

    await wrapper.findAll('button')[0].trigger('click')
    expect(wrapper.text()).toContain('Page 1 of 3')
    expect(wrapper.findAll('button')[0].isDisabled()).toBe(true)
  })
})