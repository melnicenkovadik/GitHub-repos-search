import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRepo } from '../../models/models';

const FAVORITE = 'favorite';

interface GithubState {
  favorites: IRepo[];
}

const initialState: GithubState = {
  favorites: JSON.parse(localStorage.getItem(FAVORITE) || '[]'),
};

export const githubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<any>) => {
      state.favorites.push(action.payload);
      localStorage.setItem(FAVORITE, JSON.stringify(state.favorites));
    },
    removeFavorite: (state, action: PayloadAction<any>) => {
      state.favorites = state.favorites.filter(
        (favorite) => favorite?.html_url !== action.payload
      );
      localStorage.setItem(FAVORITE, JSON.stringify(state.favorites));
    },
  },
});

export const githubActions = githubSlice.actions;
export const githubReducer = githubSlice.reducer;