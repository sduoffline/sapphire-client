import { request } from "./request";

export const postQueryFn = async (param) => {
  console.log(param);
  // param = param?.queryKey;
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: token,
  };
  const { data } = await request({
    method: "get",
    headers: headers,
    ...param,
  });

  // console.log(param);
  return {
    data,
  };
};
