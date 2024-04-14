import { logout } from '../../../src/js/api/auth/logout'
import { remove } from '../../../src/js/storage'

// Mock the remove function from your storage module
jest.mock('../../../src/js/storage/index.js', () => ({
  remove: jest.fn(),
}))

describe('logout function', () => {
  afterEach(() => {
    // Clear mock function calls after each test
    remove.mockClear()
  })

  it('should remove token and profile from storage', () => {
    // Call the logout function
    logout()

    // Assertions
    expect(remove).toHaveBeenCalledWith('token')
    expect(remove).toHaveBeenCalledWith('profile')
  })
})
