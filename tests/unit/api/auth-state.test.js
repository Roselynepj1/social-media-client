/**
 * @jest-environment jsdom
 */

import { isLoggedIn, profile } from '../../../src/js/api/auth/state.js'
import { load } from '../../../src/js/storage/index.js'

jest.mock('../../../src/js/storage/index.js') // Mock the `load` function

describe('Authentication functions', () => {
  describe('isLoggedIn()', () => {
    it('should return true when a token is stored', () => {
      load.mockReturnValueOnce('some-token')
      expect(isLoggedIn()).toBe(true)
    })

    it('should return false when no token is stored', () => {
      load.mockReturnValueOnce(null)
      expect(isLoggedIn()).toBe(false)
    })
  })

  describe('profile()', () => {
    it('should retrieve the profile data from storage', () => {
      const expectedProfile = { name: 'John Doe' }
      load.mockReturnValueOnce(expectedProfile)
      expect(profile()).toEqual(expectedProfile)
    })

    it('should handle cases where no profile is stored', () => {
      load.mockReturnValueOnce(null)
      expect(profile()).toBeNull()
    })
  })
})
