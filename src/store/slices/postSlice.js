import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: []
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addPosts: (state,action) => {
      state.posts = action.payload;
    }
  },
});

export const getPosts = (state) => state.post.posts;

export const { addPosts } = postSlice.actions;

export default postSlice.reducer;
