import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api';

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/products?_quantity=50');
      return response.data.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue('Ошибка при загрузке статей');
    }
  }
);

const initialState = {
  articles: [],
  searchTerm: '',
  loading: false,
  error: null,
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    resetSearch(state) {
      state.searchTerm = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSearchTerm, resetSearch } = articlesSlice.actions;
export default articlesSlice.reducer;
