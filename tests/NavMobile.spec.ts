import {expect, test, describe} from 'vitest'
import {mount} from '@vue/test-utils'

import NavMobile from '@/components/NavMobile.vue'

describe('NavMobile', () => {
  test('renders correctly', async () => {
    const wrapper = mount(NavMobile, {
      props: {
        menu: [
          {
            label: 'test1',
            children: [
              {
                label: 'test2',
                children: [
                  {
                    label: 'test3',
                  }
                ]
              }
            ]
          }
        ]
      }
    })
    expect(wrapper.html()).toContain('test1')
    await wrapper.find('li').trigger('click')

    expect(wrapper.html()).toContain('test2')
    await wrapper.find('.nav-submenu li').trigger('click')

    expect(wrapper.html()).toContain('test3')
  })

  test('render nothing when menu is empty', () => {
    const wrapper = mount(NavMobile, {
      props: {
        menu: []
      }
    })
    expect(wrapper.findAll('li')).toHaveLength(0)
  })
})