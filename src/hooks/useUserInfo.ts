import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { api } from "../api/github";
import { UserInterfaces } from "../userInterfaces/userInterfaces";

const fetchUserInfo = async (ctx: QueryFunctionContext) => {
  const userName = ctx.queryKey[1];
  const { data } = await api.get<UserInterfaces>(`/users/${userName}`);
  return data;
};

export function useUserInfo(gitHubUser: string) {
  return useQuery({ queryKey: ["user", gitHubUser], queryFn: fetchUserInfo });
}
