import { createPost } from '../../../src/js/api/posts/create.js'
import { deletePost } from '../../../src/js/api/posts/delete.js'
import { react } from '../../../src/js/api/posts/react.js'
import { getPost, getPosts } from '../../../src/js/api/posts/read.js'
import { updatePost } from '../../../src/js/api/posts/update.js'
import { apiPath } from '../../../src/js/api/constants.js'
import { headers } from '../../../src/js/api/headers.js'

// Mocking fetch function
global.fetch = jest.fn()

describe('createPost function', () => {
  afterEach(() => {
    fetch.mockReset()
  })

  it('should send a POST request with correct parameters', async () => {
    const title = 'Test Title'
    const body = 'Test Body'
    const media = ['image1.jpg', 'image2.jpg']
    const tags = ['tag1', 'tag2']

    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({ id: 1 }),
    })

    await createPost(title, body, media, tags)

    expect(fetch).toHaveBeenCalledWith(`${apiPath}/social/posts/`, {
      method: 'post',
      body: JSON.stringify({ title, body, media, tags }),
      headers: headers('application/json'),
    })
  })

  it('should throw an error when the response is not ok', async () => {
    const title = 'Test Title'
    const body = 'Test Body'
    const media = ['image1.jpg', 'image2.jpg']
    const tags = ['tag1', 'tag2']

    fetch.mockResolvedValueOnce({
      ok: false,
      statusText: 'Unauthorized',
    })

    await expect(createPost(title, body, media, tags)).rejects.toThrow(
      'Unauthorized',
    )
  })
})

describe('deletePost function', () => {
  afterEach(() => {
    fetch.mockReset()
  })

  it('should send a DELETE request with correct parameters', async () => {
    const postId = 123 // Example post ID

    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest
        .fn()
        .mockResolvedValueOnce({ message: 'Post deleted successfully' }),
    })

    await deletePost(postId)

    expect(fetch).toHaveBeenCalledWith(`${apiPath}/social/posts/${postId}`, {
      method: 'delete',
      headers: headers(),
    })
  })

  it('should throw an error when the response is not ok', async () => {
    const postId = 123 // Example post ID

    fetch.mockResolvedValueOnce({
      ok: false,
      statusText: 'Not Found',
    })

    await expect(deletePost(postId)).rejects.toThrow('Not Found')
  })
})

describe('react function', () => {
  afterEach(() => {
    fetch.mockReset()
  })

  it('should send a PUT request with correct parameters', async () => {
    const postId = 123 // Example post ID
    const symbol = 'like' // Example symbol

    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest
        .fn()
        .mockResolvedValueOnce({ message: 'Reacted successfully' }),
    })

    await react(postId, symbol)

    expect(fetch).toHaveBeenCalledWith(
      `${apiPath}/social/posts/${postId}/react/${symbol}`,
      {
        method: 'put',
        headers: headers(),
      },
    )
  })

  it('should throw an error when the response is not ok', async () => {
    const postId = 123 // Example post ID
    const symbol = 'like' // Example symbol

    fetch.mockResolvedValueOnce({
      ok: false,
      statusText: 'Not Found',
    })

    await expect(react(postId, symbol)).rejects.toThrow('Not Found')
  })
})

describe('getPosts function', () => {
  afterEach(() => {
    fetch.mockReset()
  })

  it('should send a GET request with correct parameters', async () => {
    const limit = 20
    const offset = 0

    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({ posts: [], totalCount: 0 }),
    })

    await getPosts(limit, offset)

    expect(fetch).toHaveBeenCalledWith(
      `${apiPath}/social/posts?limit=${limit}&offset=${offset}&_reactions=true&_author=true&_comments=true`,
      {
        headers: headers(),
      },
    )
  })

  it('should throw an error when the response is not ok', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      statusText: 'Internal Server Error',
    })

    await expect(getPosts()).rejects.toThrow('Internal Server Error')
  })
})

describe('getPost function', () => {
  afterEach(() => {
    fetch.mockReset()
  })

  it('should send a GET request with correct parameters', async () => {
    const postId = 123 // Example post ID

    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({}),
    })

    await getPost(postId)

    expect(fetch).toHaveBeenCalledWith(
      `${apiPath}/social/posts/${postId}?_reactions=true&_author=true&_comments=true`,
      {
        headers: headers(),
      },
    )
  })

  it('should throw an error when the response is not ok', async () => {
    const postId = 123 // Example post ID

    fetch.mockResolvedValueOnce({
      ok: false,
      statusText: 'Not Found',
    })

    await expect(getPost(postId)).rejects.toThrow('Not Found')
  })
})

// Mocking profile function
jest.mock('../../../src/js/api/auth/state.js', () => ({
  profile: jest.fn().mockReturnValue({ name: 'testOwner' }), // Replace with your mock profile data
}))

describe('updatePost function', () => {
  afterEach(() => {
    fetch.mockReset()
  })

  it('should send a PUT request with correct parameters', async () => {
    const postId = 123 // Example post ID
    const title = 'Updated Title'
    const body = 'Updated Body'
    const media = ['updated_image1.jpg', 'updated_image2.jpg']
    const tags = ['tag3', 'tag4']

    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({ id: postId }),
    })

    await updatePost(postId, title, body, media, tags)

    const expectedBody = {
      title,
      body,
      media,
      tags,
      owner: 'testOwner', // Mocked owner name
    }

    expect(fetch).toHaveBeenCalledWith(`${apiPath}/social/posts/${postId}`, {
      method: 'put',
      body: JSON.stringify(expectedBody),
      headers: headers('application/json'),
    })
  })

  it('should throw an error when the response is not ok', async () => {
    const postId = 123 // Example post ID

    fetch.mockResolvedValueOnce({
      ok: false,
      statusText: 'Internal Server Error',
    })

    await expect(updatePost(postId)).rejects.toThrow('Internal Server Error')
  })
})
