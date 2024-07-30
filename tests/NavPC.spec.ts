import {expect, test, describe, vi} from 'vitest'
import {mount} from '@vue/test-utils'

import NavPC from '@/components/NavPC.vue'

const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}))

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)

describe('NavPC', () => {
  test('renders correctly', async () => {
    const wrapper = mount(NavPC, {
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
    await wrapper.find('.more-info').trigger('hover')

    expect(wrapper.html()).toContain('test2')
    await wrapper.find('.sub-more-info').trigger('hover')

    expect(wrapper.html()).toContain('test3')
  })

  test('render nothing when menu is empty', () => {
    const wrapper = mount(NavPC, {
      props: {
        menu: []
      }
    })
    expect(wrapper.findAll('li')).toHaveLength(0)
  })
})