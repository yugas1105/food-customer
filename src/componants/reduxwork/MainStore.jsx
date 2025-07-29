import { configureStore ,combineReducers} from "@reduxjs/toolkit";
import { persistReducer,FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage"
import cartReducer from "./CartSlice";
import userReducer,{logoutUser} from "./UserSlice";

const timeoutMiddleware = store => next => action => {
    const result = next(action);
    if (action.type === '/') {
        setTimeout(() => {
            store.dispatch(logoutUser());
        }, 3000);
    }
    return result;
}

const persistConfig = {
    key: "user",
    version: 1,
    storage,
}

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer, 
  });

const persistedReducer = persistReducer(persistConfig, rootReducer);

const MainStore = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(timeoutMiddleware)
})

export default MainStore



// import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from './CartSlice'
// import userReducer from './UserSlice'

// export const MainStore = configureStore({
//     reducer:{
//         cart: cartReducer,
//         user: userReducer
//     }
// })