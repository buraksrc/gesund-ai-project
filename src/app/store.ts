import { 
  configureStore, 
  ThunkAction, 
  Action 
} from "@reduxjs/toolkit"

import nodesReducer from '../features/nodes/nodeSlice';
import idReducer from "../features/nodes/idSlice"; 
import dialogReducer from "../features/nodes/dialogSlice"; 
import requestNodeIdReducer from "../features/nodes/requestNodeIdSlice"; 

export const store = configureStore({
  reducer: {
    nodes: nodesReducer,
    id: idReducer,
    dialog: dialogReducer,
    requestNodeId: requestNodeIdReducer
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
