import { configureStore } from '@reduxjs/toolkit';

import modalSlice from './features/modal/modalSlice';
import previewerSlice from './features/previewer/previewerSlice';
import gamesSlice from './features/games/gamesSlice';
import userSlice from './features/user/userSlice';

const store = configureStore({
    reducer: {
        modal: modalSlice,
        previewer: previewerSlice,
        games: gamesSlice,
        user: userSlice,
    },
});

export default store;
