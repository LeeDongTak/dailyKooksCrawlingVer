import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const __crawlingData = createAsyncThunk('crawlingData', async (payload, thunkAPI) => {
  try {
    const resultData = [];
    for (let i = 0; i < payload.length; i++) {
      const res = await axios.get(`${process.env.REACT_APP_CRAWLING}/mapDetail/${payload[i].id}`);
      console.log(res.data.result);
      resultData.push({ id: payload[i].id, ...res.data.result });
    }
    console.log(resultData);
    return thunkAPI.fulfillWithValue(resultData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});


const initialState = {
  markers: [],
  hoveredMarkerId: '',
  selectedMarker: {},
  crawlingData: [],
  isLoading: false,
  isError: false,
  error: ''
};

const markerSlice = createSlice({
  name: 'marker',
  initialState,
  reducers: {
    setMarkers: (state, action) => {
      state.markers = [...action.payload];
    },
    setHoveredMarker: (state, action) => {
      state.hoveredMarkerId = action.payload;
    },
    // setSelectedMarker: (state, action) => {
    //   const { markers, id } = action.payload;
    //   const marker = markers.find((item) => item?.id === id);
    //   state.selectedMarker = marker;
    //   localStorage.setItem('selectedMarker', JSON.stringify(marker));
    // }
    setSelectedMarker: (state, action) => {
      const { resultMarkers, id } = action.payload;
      // const marker = markers?.find((item) => item?.id === id);
      // state.selectedMarker = marker;
      localStorage.setItem('selectedMarker', JSON.stringify(resultMarkers));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(__crawlingData.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__crawlingData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.crawlingData = action.payload;
        console.log(state.crawlingData);
      })
      .addCase(__crawlingData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  }
});

export const { setMarkers, setHoveredMarker, setSelectedMarker } = markerSlice.actions;
export default markerSlice.reducer;
