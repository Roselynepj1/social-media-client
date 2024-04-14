import { load } from '../../../src/js/storage/load'

describe('load function', () => {
  beforeEach(() => {
    // Mocking localStorage getItem method
    global.localStorage = {
      getItem: jest.fn(),
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return null if localStorage.getItem returns null', () => {
    global.localStorage.getItem.mockReturnValueOnce(null)
    const result = load('someKey')
    expect(result).toBe(null)
    expect(localStorage.getItem).toHaveBeenCalledWith('someKey')
  })

  it('should return parsed JSON data if localStorage.getItem returns valid JSON string', () => {
    const mockData = { foo: 'bar' }
    global.localStorage.getItem.mockReturnValueOnce(JSON.stringify(mockData))
    const result = load('someKey')
    expect(result).toEqual(mockData)
    expect(localStorage.getItem).toHaveBeenCalledWith('someKey')
  })

  it('should return null if localStorage.getItem throws an error', () => {
    global.localStorage.getItem.mockImplementationOnce(() => {
      throw new Error('Some error')
    })
    const result = load('someKey')
    expect(result).toBe(null)
    expect(localStorage.getItem).toHaveBeenCalledWith('someKey')
  })
})
