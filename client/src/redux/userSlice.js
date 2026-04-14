import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    userLoading: true,
  },
  reducers:{
    setUserData:(state, action )=>{
        state.userData=action.payload
    },
    setUserLoading:(state, action )=>{
        state.userLoading=action.payload
    }
  }
});

export const {setUserData, setUserLoading}=userSlice.actions

export default userSlice.reducer