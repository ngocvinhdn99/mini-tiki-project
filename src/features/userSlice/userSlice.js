import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        showUserForm: false,
        userInfo: {}
    },
    reducers: {
        showUserForm(state) {
            state.showUserForm = true
        },
        hideUserForm(state) {
            state.showUserForm = false
        },
        updateUserFormInfo(state, action) {
            state.userInfo = action.payload
        }
    }
})

const {actions, reducer} = userSlice
export const {showUserForm, hideUserForm, updateUserFormInfo} = actions
export default reducer