const axios = require('axios');
import { getPostsData } from './posts';

jest.mock('axios');

describe('getPostsData', () => {
  test('fetches posts successfully', async () => {
    const mockPosts = [
      { id: 1, title: 'Test Title 1', body: 'Test Body 1' },
      { id: 2, title: 'Test Title 2', body: 'Test Body 2' }
    ];

    axios.get.mockResolvedValueOnce({ data: mockPosts });

    const posts = await getPostsData();

    expect(posts).toEqual(mockPosts);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts');
  });

  test('handles fetch error', async () => {
    const error = new Error('Request failed with status code 500');

    axios.get.mockRejectedValueOnce(error);

    await expect(getPostsData()).rejects.toThrowError(error);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts');
  });
});
