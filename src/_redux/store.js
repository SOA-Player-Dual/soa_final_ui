import { configureStore } from '@reduxjs/toolkit';

import modalSlice from './features/modal/modalSlice';
import previewerSlice from './features/previewer/previewerSlice';
import gamesSlice from './features/games/gamesSlice';

const store = configureStore({
    reducer: {
        modal: modalSlice,
        previewer: previewerSlice,
        games: gamesSlice,
    },
});

export default store;
