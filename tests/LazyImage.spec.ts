import {describe, expect, test, vi} from 'vitest'
import {mount} from '@vue/test-utils'

import LazyImage from '@/components/LazyImage.vue'

const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}))

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)

describe('LazyImage', () => {
  test('render', () => {
    const wrapper = mount(LazyImage, {
      props: {
        src: 'https://www3.nhk.or.jp//nhkworld/upld/thumbnails/en/news/20240726_26_1421756_L.jpg',
        alt: 'test',
        threshold: 0.1
      }
    })

    expect(wrapper.get('img').isVisible()).toBe(true)
  })

  test('render when src wrong', () => {
    const wrapper = mount(LazyImage, {
      props: {
        src: 'test',
        alt: 'test',
        threshold: 0.1
      }
    })

    expect(wrapper.find('img').isVisible()).toBe(true)
  })
})