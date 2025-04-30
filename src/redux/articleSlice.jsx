import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api';

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async () => {
  const response = await api.get('/api/v2/products?_quantity=50');
  return response.data.data;
});

const articleSlice = createSlice({
  name: 'articles',
  initialState: {
    list: [],
    status: 'idle',
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.list = action.payload;
      state.status = 'succeeded';
    });
  },
});

export default articleSlice.reducer;
