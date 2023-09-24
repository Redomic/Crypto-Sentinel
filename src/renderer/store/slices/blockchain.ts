import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface BlockchainState {
  nodes: any;
  links: any;
}

const initialState: BlockchainState = {
  nodes: [],
  links: [],
};

export const blockchainSlice = createSlice({
  name: 'blockchain',
  initialState,
  reducers: {
    setNodes: (state, action: PayloadAction<any>) => {
      console.log(action.payload);
      return {
        ...state,
        nodes: action.payload.nodes,
        links: action.payload.links,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNodes } = blockchainSlice.actions;

export default blockchainSlice.reducer;
