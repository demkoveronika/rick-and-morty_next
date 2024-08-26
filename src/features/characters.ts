import { Character } from '@/types/Character';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Character[] = [];

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCharacters: (_characters: Character[], action: PayloadAction<Character[]>) => {
      return action.payload;
    }
  }
})

export const { setCharacters } = charactersSlice.actions;
export default charactersSlice.reducer;