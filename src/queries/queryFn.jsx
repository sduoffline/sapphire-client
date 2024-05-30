import { request } from "./request";

export const queryFn = async (param) => {
  // console.log(param);
  param = param?.queryKey;
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    token: token,
  };
  const { data } = await request({
    method: param.method ?? "get",
    headers: headers,
    url: param[0],
    ...(param[1] ?? {}),
  });

  return {
    data,
  };
};
