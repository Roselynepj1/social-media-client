import { register } from '../../../src/js/api/auth/register'

describe('register function', () => {
  beforeEach(() => {
    // Mock fetch to simulate network requests
    global.fetch = jest.fn()
  })

  afterEach(() => {
    // Restore fetch to its original implementation after each test
    global.fetch.mockRestore()
  })

  it('should register successfully', async () => {
    // Mock response for successful registration
    const mockResponse = {
      ok: true,
      json: async () => ({
        // Mock response data
        success: true,
        message: 'Registration successful',
        // Add any other response properties as needed for your test
      }),
    }
    global.fetch.mockResolvedValue(mockResponse)

    // Call the register function
    const result = await register(
      'John Doe',
      'john@example.com',
      'password123',
      'avatar.jpg',
    )

    // Assertions
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/social/auth/register'),
      expect.objectContaining({
        method: 'post',
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
          avatar: 'avatar.jpg',
        }),
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
      }),
    )

    // Assert that the register function returns the expected response
    expect(result).toEqual({
      success: true,
      message: 'Registration successful',
      // Add any other expected response properties here
    })
  })

  it('should throw an error when registration fails', async () => {
    // Mock response for failed registration
    const mockResponse = {
      ok: false,
      statusText: 'Internal Server Error',
    }
    global.fetch.mockResolvedValue(mockResponse)

    // Assertions using async/await with expect.rejects
    await expect(
      register('John Doe', 'john@example.com', 'password123', 'avatar.jpg'),
    ).rejects.toThrow('Internal Server Error')
  })

  it('should fail registration if email does not end with @noroff.no or @stud.noroff.no', async () => {
    // Mock response for failed registration
    const mockResponse = {
      ok: false,
      statusText: 'Invalid email domain',
    }
    global.fetch.mockResolvedValue(mockResponse)

    // Call the register function with an invalid email and assert
    await expect(
      register('John Doe', 'john@example.com', 'password123', 'avatar.jpg'),
    ).rejects.toThrow('Invalid email domain')

    // Assertions
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/social/auth/register'),
      expect.objectContaining({
        method: 'post',
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
          avatar: 'avatar.jpg',
        }),
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
      }),
    )
  })
})
