import { CustAxios } from "../lib/axios";

export async function GetCurrentUser() {
  const res = await CustAxios.get("/user/get-current-user");
  return res.data.data;
}
