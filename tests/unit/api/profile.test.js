import { deleteProfile } from '../../../src/js/api/profiles/delete'
import { followProfile } from '../../../src/js/api/profiles/follow'
import { getProfile, getProfiles } from '../../../src/js/api/profiles/read'
import { unfollowProfile } from '../../../src/js/api/profiles/unfollow'
import { updateProfileImage } from '../../../src/js/api/profiles/update'

import { apiPath } from '../../../src/js/api/constants'

describe('deleteProfile', () => {
  // Mock the fetch function
  global.fetch = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should delete profile and return response data when request is successful', async () => {
    // Mock successful response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest
        .fn()
        .mockResolvedValueOnce({ message: 'Profile deleted successfully' }),
    })

    const name = 'asasasasasasasa'
    const response = await deleteProfile(name)
    expect(fetch).toHaveBeenCalledWith(`${apiPath}/social/profiles/${name}`, {
      method: 'delete',
      headers: {},
    })

    expect(response).toEqual({ message: 'Profile deleted successfully' })
  })

  it('should throw an error when request fails', async () => {
    // Mock failed response
    fetch.mockResolvedValueOnce({
      ok: false,
      statusText: 'Not Found',
    })

    await expect(deleteProfile('exampleName')).rejects.toThrow('Not Found')
  })
})

describe('followProfile', () => {
  // Mock the fetch function
  global.fetch = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should follow profile and return response data when request is successful', async () => {
    // Mock successful response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest
        .fn()
        .mockResolvedValueOnce({ message: 'Profile followed successfully' }),
    })
    const name = 'asasasasasasasa'
    const response = await followProfile(name)

    expect(fetch).toHaveBeenCalledWith(
      `${apiPath}/social/profiles/${name}/follow`,
      {
        method: 'put',
        headers: {},
      },
    )

    expect(response).toEqual({ message: 'Profile followed successfully' })
  })

  it('should throw an error when request fails', async () => {
    // Mock failed response
    fetch.mockResolvedValueOnce({
      ok: false,
      statusText: 'Unauthorized',
    })

    await expect(followProfile('exampleName')).rejects.toThrow('Unauthorized')
  })
})

describe('getProfiles', () => {
  // Mock the fetch function
  global.fetch = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return profiles data when request is successful', async () => {
    // Mock successful response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce([
        { id: 1, name: 'profile1' },
        { id: 2, name: 'profile2' },
      ]),
    })

    const response = await getProfiles()

    expect(fetch).toHaveBeenCalledWith(`${apiPath}/social/profiles`, {
      headers: {},
    })

    expect(response).toEqual([
      { id: 1, name: 'profile1' },
      { id: 2, name: 'profile2' },
    ])
  })

  it('should throw an error when request fails', async () => {
    // Mock failed response
    fetch.mockResolvedValueOnce({
      ok: false,
      statusText: 'Internal Server Error',
    })

    await expect(getProfiles()).rejects.toThrow('Internal Server Error')
  })
})

describe('getProfile', () => {
  // Mock the fetch function
  global.fetch = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return profile data when request is successful', async () => {
    // Mock successful response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({ id: 1, name: 'profile1' }),
    })

    const response = await getProfile('profile1')

    expect(fetch).toHaveBeenCalledWith(
      `${apiPath}/social/profiles/profile1?&_followers=true&_posts=true&_following=true`,
      {
        headers: {},
      },
    )

    expect(response).toEqual({ id: 1, name: 'profile1' })
  })

  it('should throw an error when request fails', async () => {
    // Mock failed response
    fetch.mockResolvedValueOnce({
      ok: false,
      statusText: 'Not Found',
    })

    await expect(getProfile('profile1')).rejects.toThrow('Not Found')
  })
})

describe('unfollowProfile', () => {
  // Mock the fetch function
  global.fetch = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should unfollow profile and return response data when request is successful', async () => {
    // Mock successful response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest
        .fn()
        .mockResolvedValueOnce({ message: 'Profile unfollowed successfully' }),
    })
    const name = 'profile1'
    const response = await unfollowProfile(name)

    expect(fetch).toHaveBeenCalledWith(
      `${apiPath}/social/profiles/${name}/unfollow`,
      {
        method: 'put',
        headers: {},
      },
    )

    expect(response).toEqual({ message: 'Profile unfollowed successfully' })
  })

  it('should throw an error when request fails', async () => {
    // Mock failed response
    fetch.mockResolvedValueOnce({
      ok: false,
      statusText: 'Unauthorized',
    })
    const name = 'profile1'
    await expect(unfollowProfile(name)).rejects.toThrow('Unauthorized')
  })
})

// Mock the profile function
jest.mock('../../../src/js/api/auth/state.js', () => ({
  profile: jest.fn(() => ({ name: 'profile1' })),
}))

describe('updateProfileImage', () => {
  // Mock the fetch function
  global.fetch = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should update profile image and return response data when request is successful', async () => {
    // Mock successful response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({
        message: 'Profile image updated successfully',
      }),
    })
    const name = 'profile1'
    const response = await updateProfileImage('exampleAvatar')

    expect(fetch).toHaveBeenCalledWith(`${apiPath}/social/profiles/${name}`, {
      method: 'put',
      body: JSON.stringify({ name, avatar: 'exampleAvatar' }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    expect(response).toEqual({ message: 'Profile image updated successfully' })
  })

  it('should throw an error when request fails', async () => {
    // Mock failed response
    fetch.mockResolvedValueOnce({
      ok: false,
      statusText: 'Internal Server Error',
    })

    await expect(updateProfileImage('exampleAvatar')).rejects.toThrow(
      'Internal Server Error',
    )
  })
})
