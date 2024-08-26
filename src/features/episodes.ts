import { Episode } from '@/types/Eposide';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Episode[] = [];

const episodesSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setEpisodes: (_locations: Episode[], action: PayloadAction<Episode[]>) => {
      return action.payload;
    }
  }
})

export const { setEpisodes } = episodesSlice.actions;
export default episodesSlice.reducer;