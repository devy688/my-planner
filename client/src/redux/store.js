import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import userReducer from './userSlice';
import goalsReducer from './goalsSlice';
import pomodoroSettingReducer from './pomodoroSettingSlice';
import selecteDateReducer from './selectedDateSlice';

const rootReducer = combineReducers({
    user: userReducer,
    goals: goalsReducer,
    pomodoroSetting: pomodoroSettingReducer,
    selectedDate: selecteDateReducer,
});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
