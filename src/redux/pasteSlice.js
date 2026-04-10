import { createSlice } from '@reduxjs/toolkit'
import toast from "react-hot-toast";

export const pasteSlice = createSlice({
  name: 'paste',
  initialState: {
    pastes:localStorage.getItem("pastes")? JSON.parse(localStorage.getItem("pastes")): []
  },
  reducers: {
    addTopaste: (state,action) => {
     const paste =action.payload;
     state.pastes.push(paste);
     localStorage.setItem("pastes",JSON.stringify(state.pastes));
     toast("Paste created sucessfully")
    },


    updateToPaste: (state,action) => {
     const paste=action.payload;
     const index=state.pastes.findIndex((item)=>item._id===paste._id);

     if(index>=0){
      state.pastes[index]=paste;

      localStorage.setItem("pastes",JSON.stringify(state.pastes));

      toast.success("Note Updated");
     }
    },


    resetToPaste: (state, action) => {
      state.pastes=[];
      localStorage.removeItem("pastes");
    },


    removeToPaste: (state, action) => {
      const pasteId=action.payload;

      console.log(pasteId);
      const index=state.pastes.findIndex((item)=>item._id===pasteId);
      if(index>=0){
        state.pastes.splice(index,1);
        localStorage.setItem("pastes",JSON.stringify(state.pastes));

        toast.success("Note Deleted");
      }
      
    }
  }
})

// Action creators are generated for each case reducer function
export const { addTopaste,updateToPaste,resetToPaste,removeToPaste } = pasteSlice.actions

export default pasteSlice.reducer