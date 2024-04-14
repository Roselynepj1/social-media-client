import { save } from '../../../src/js/storage/save'

describe('save function', () => {
  beforeEach(() => {
    // Mocking localStorage setItem method
    global.localStorage = { setItem: jest.fn() }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call localStorage.setItem with the correct key and value', () => {
    const key = 'someKey'
    const value = { foo: 'bar' }
    save(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(value),
    )
  })
})
