import { Location } from '@/types/Location';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Location[] = [];

const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    setLocations: (_locations: Location[], action: PayloadAction<Location[]>) => {
      return action.payload;
    }
  }
})

export const { setLocations } = locationsSlice.actions;
export default locationsSlice.reducer;