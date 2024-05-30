import { request } from "./request";

export const postQueryFn = async (param) => {
  // param = param?.queryKey;
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    token: token,
  };
  const { data } = await request({
    method: param.method ?? "get",
    headers: headers,
    ...param,
  });

  // console.log(param);
  return {
    data,
  };
};
