/**
 * @jest-environment jsdom
 */
import { login } from '../../../src/js/api/auth/login'
describe('login function', () => {
  beforeEach(() => {
    // Mock fetch to simulate network requests
    global.fetch = jest.fn()

    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
      },
      writable: true,
    })
  })

  afterEach(() => {
    // Restore fetch and localStorage after each test
    global.fetch.mockRestore()
    window.localStorage.getItem.mockRestore()
    window.localStorage.setItem.mockRestore()
    window.localStorage.removeItem.mockRestore()
  })

  it('should login successfully and save token and profile', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({
        accessToken: 'mockAccessToken',
        // Add other profile properties as needed for your test
      }),
    }
    global.fetch.mockResolvedValue(mockResponse)

    // Call the login function
    await login('mockEmail', 'mockPassword')

    // Assertions
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/social/auth/login'),
      expect.objectContaining({
        method: 'post',
        body: expect.any(String),
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
      }),
    )

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token',
      JSON.stringify('mockAccessToken'),
    )
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'profile',
      expect.stringContaining('{'),
    )
  })

  it('should throw an error when login fails', async () => {
    const mockResponse = {
      ok: false,
      statusText: 'Unauthorized',
    }
    global.fetch.mockResolvedValue(mockResponse)

    await expect(login('mockEmail', 'mockPassword')).rejects.toThrow(
      'Unauthorized',
    )
  })
})
