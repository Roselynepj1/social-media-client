import { headers } from '../../../src/js/api/headers.js'
import { load } from '../../../src/js/storage/index.js'

jest.mock('../../../src/js/storage/index.js')

describe('headers()', () => {
  it('should include Content-Type header when provided', () => {
    const contentType = 'application/json'
    load.mockReturnValueOnce('some-token')
    expect(headers(contentType)).toEqual({
      'Content-Type': contentType,
      Authorization: 'Bearer some-token',
    })
  })

  it('should include Authorization header with stored token', () => {
    load.mockReturnValueOnce('some-token')
    expect(headers()).toEqual({ Authorization: 'Bearer some-token' })
  })

  it('should not include Authorization header if no token is stored', () => {
    load.mockReturnValueOnce(null)
    expect(headers()).toEqual({})
  })

  it('should prioritize Content-Type header when both provided and token exists', () => {
    const contentType = 'application/json'
    load.mockReturnValueOnce('some-token')
    expect(headers(contentType)).toEqual({
      'Content-Type': contentType,
      Authorization: 'Bearer some-token',
    })
  })
})
