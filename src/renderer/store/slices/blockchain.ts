import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface BlockchainState {
  nodes: any;
  links: any;
  chat: {
    overlay: boolean;
    messages: any;
  };
}

const initialState: BlockchainState = {
  nodes: [],
  links: [],
  chat: {
    overlay: false,
    messages: [],
  },
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
    setMessage: (state, action: PayloadAction<any>) => {
      state.chat.messages = [action.payload].concat(state.chat.messages);
    },
    setOverlay: (state, action: PayloadAction<boolean>) => {
      state.chat.overlay = action.payload;
    },
  },
});

export const { setNodes, setMessage, setOverlay } = blockchainSlice.actions;

export default blockchainSlice.reducer;
