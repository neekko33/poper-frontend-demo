import { expect, test} from 'vitest'

import {formatTime} from '../src/utils/utils.ts'

test('format time', () => {
  expect(formatTime(1722313479000)).toBe('2024-7-30')
})