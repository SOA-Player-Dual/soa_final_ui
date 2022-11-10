import { configureStore } from '@reduxjs/toolkit';

import modalSlice from './features/modal/modalSlice';
import previewerSlice from './features/previewer/previewerSlice';

const store = configureStore({
    reducer: {
        modal: modalSlice,
        previewer: previewerSlice,
    },
});

export default store;
