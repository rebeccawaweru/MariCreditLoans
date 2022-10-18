import axios from "axios";
import { updateStart, updateSuccess, updateFailure } from "./userSlice";

export const updateUser = async (user, dispatch) => {
  try {
    const res = await axios.post("https://forextradingarena.herokuapp.com/forexarena/login", user);
    dispatch(updateSuccess(res));
  } catch (err) {
    dispatch(updateFailure());
  }
};