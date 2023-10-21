import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SettingStateType {
  localStorageSave: boolean;
}
const intialSettingState: SettingStateType = {
  localStorageSave: true,
};
const settingSlice = createSlice({
  name: "settingSlice",
  initialState: intialSettingState,
  reducers: {
    changeLocalStorageSetting: (state, action: PayloadAction<boolean>) => {
      state.localStorageSave = action.payload;
    },
  },
});

export const { changeLocalStorageSetting } = settingSlice.actions;
export default settingSlice.reducer;
