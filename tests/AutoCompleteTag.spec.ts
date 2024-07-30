import {mount} from '@vue/test-utils'
import {describe, expect, test} from 'vitest'

import AutoCompleteTag from '../src/components/AutoCompleteTag.vue'
describe('AutoCompleteTag', () => {
  test('render', () => {
    const wrapper = mount(AutoCompleteTag, {
      props: {
        data: [],
        placeholder: 'test',
        maxTags: 1,
      }
    })
    expect(wrapper.get('input').isVisible()).toBe(true)
    expect(wrapper.get('button').isVisible()).toBe(true)
    expect(wrapper.get('button').isDisabled()).toBe(true)
    expect(wrapper.find('.suggestions').exists()).toBe(false)
  })

  test('input tag', async () => {
    const wrapper = mount(AutoCompleteTag, {
      props: {
        data: ['china', 'japan', 'korea', 'chinese'],
        placeholder: 'test',
        maxTags: 1,
      }
    })
    await wrapper.get('input').setValue('c')
    expect(wrapper.findAll('.suggestions li')).toHaveLength(2)
    expect(wrapper.find('.suggestions li').text()).equals('china')
    expect(wrapper.get('button').isDisabled()).toBe(true)
  })

  test('click suggestions', async () => {
    const wrapper = mount(AutoCompleteTag, {
      props: {
        data: ['china', 'japan', 'korea', 'chinese'],
        placeholder: 'test',
        maxTags: 1,
      }
    })
    await wrapper.get('input').setValue('c')
    await wrapper.find('.suggestions li').trigger('click')
    expect(wrapper.find('.suggestions').exists()).toBe(false)
    expect(wrapper.findAll('.tags span')).toHaveLength(1)
    expect(wrapper.get('input').text()).equals('')
    expect(wrapper.get('button').isDisabled()).toBe(false)
  })

  test('click tag', async () => {
    const wrapper = mount(AutoCompleteTag, {
      props: {
        data: ['china', 'japan', 'korea', 'chinese'],
        placeholder: 'test',
        maxTags: 1,
      }
    })
    await wrapper.get('input').setValue('c')
    await wrapper.find('.suggestions li').trigger('click')
    await wrapper.find('.tags span button').trigger('click')

    expect(wrapper.find('.suggestions').exists()).toBe(false)
    expect(wrapper.find('.tags span').exists()).toBe(false)
    expect(wrapper.get('button').isDisabled()).toBe(true)
  })

  test('try input when tags equals maxTags', async () => {
    const wrapper = mount(AutoCompleteTag, {
      props: {
        data: ['china', 'chill', 'choco', 'chinese'],
        placeholder: 'test',
        maxTags: 1,
      }
    })
    await wrapper.get('input').setValue('c')
    await wrapper.find('.suggestions li').trigger('click')

    expect(wrapper.get('input').isDisabled()).toBe(true)
  })

  test('emits an event when clicked search button', async () => {
    const wrapper = mount(AutoCompleteTag, {
      props: {
        data: ['china', 'japan', 'korea', 'chinese'],
        placeholder: 'test',
        maxTags: 1,
      }
    })
    await wrapper.get('input').setValue('c')
    await wrapper.find('.suggestions li').trigger('click')
    await wrapper.get('button').trigger('click')

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
  })
})