import { SpringRef, SpringValue } from "@react-spring/web";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: DeckState;
};
type DeckState = {
  api: SpringRef<CardProperty> | null;
  props: Springs[] | null;
  currentIndex: number;
};

type CardProperty = {
  x: number;
  y: number;
  rot: number;
  scale: number;
};

type Springs = {
  x: SpringValue<number>;
  y: SpringValue<number>;
  rot: SpringValue<number>;
  scale: SpringValue<number>;
};

const initialState = {
  value: {
    api: null,
    props: null,
    currentIndex: 5,
  },
} as InitialState;

export const deck = createSlice({
  name: "deck",
  initialState: initialState,
  reducers: {
    init: (state, action: PayloadAction<DeckState>) => {
      return {
        value: {
          api: action.payload.api,
          props: action.payload.props,
          currentIndex: action.payload.currentIndex,
        },
      };
    },
  },
});

export const { init } = deck.actions;
export default deck.reducer;
