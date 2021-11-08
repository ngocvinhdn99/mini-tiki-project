import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/ReduxSlice/cartSlice'
import userReducer from '../features/userSlice/userSlice'

const rootReducer = {
    cart: cartReducer,
    user: userReducer,
}

const store = configureStore({
    reducer: rootReducer
})

export default store