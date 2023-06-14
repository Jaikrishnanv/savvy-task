import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Home from './Home';
import { getPostsData } from '../../services/posts';
import { addPosts, getPosts } from '../../store/slices/postSlice';
import { toast } from 'react-toastify';

// const errorMockFunc = jest.fn()

jest.mock('../../services/posts');

describe('Home', () => {
  const mockStore = configureStore([]);
  let store;

  beforeEach(() => {
    store = mockStore({
      post: {
        posts: [
        { id: 1, title: 'Test Title 1', body: 'Test Body 1' },
        { id: 2, title: 'Test Title 2', body: 'Test Body 2' }
      ]
    }   
    });

    getPostsData.mockResolvedValue([
      { id: 3, title: 'Test Title 3', body: 'Test Body 3' },
      { id: 4, title: 'Test Title 4', body: 'Test Body 4' }
    ]);

    act(() => {
        render(
            <Provider store={store}>
            <Home />
            </Provider>
        )
    });
  });

  test('renders search input', () => {
    const searchInputElement = screen.getByRole('textbox');
    expect(searchInputElement).toBeInTheDocument();
  });

  test('loads posts on mount', () => {
    expect(getPostsData).toHaveBeenCalledTimes(1);
    expect(store.getActions()).toContainEqual(addPosts([
      { id: 3, title: 'Test Title 3', body: 'Test Body 3' },
      { id: 4, title: 'Test Title 4', body: 'Test Body 4' }
    ]));
  });

  test('filters posts based on search input', () => {
    const searchInputElement = screen.getByRole('textbox');

    fireEvent.change(searchInputElement, { target: { value: 'Test Title 1' } });

    const postCardElements = screen.getAllByTestId('post-card');
    expect(postCardElements).toHaveLength(1);
    expect(postCardElements[0]).toHaveTextContent('Test Title 1');
    expect(postCardElements[0]).toHaveTextContent('Test Body 1');
  });

  test('displays "No Posts" when there are no posts', () => {
    store = mockStore({
      post: {
        posts: []
      }
    });

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const noPostsElement = screen.getByText('No Posts');
    expect(noPostsElement).toBeInTheDocument();
  });

  test('displays posts when there are posts', () => {
    const postCardElements = screen.getAllByTestId('post-card');
    expect(postCardElements).toHaveLength(2);
    expect(postCardElements[0]).toHaveTextContent('Test Title 1');
    expect(postCardElements[0]).toHaveTextContent('Test Body 1');
    expect(postCardElements[1]).toHaveTextContent('Test Title 2');
    expect(postCardElements[1]).toHaveTextContent('Test Body 2');
  });
});
