import { remove } from '../../../src/js/storage/remove'

describe('remove function', () => {
  beforeEach(() => {
    // Mocking localStorage removeItem method
    global.localStorage = { removeItem: jest.fn() }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call localStorage.removeItem with the correct key', () => {
    const key = 'someKey'
    remove(key)
    expect(localStorage.removeItem).toHaveBeenCalledWith(key)
  })
})
