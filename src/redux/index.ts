import {Action, configureStore} from "@reduxjs/toolkit";
import surveySlice from "./survey";

const store = configureStore({
    reducer: {
        survey: surveySlice.reducer,
    },
});

store.subscribe(() => {});

export const storeDispatch = (action: Action) => store.dispatch(action);
export default store;
export const storeState = () => store.getState();
export type RootState = ReturnType<typeof store.getState>;
