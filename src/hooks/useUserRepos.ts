import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { api } from "../api/github";
import { ReposInterfaces } from "../userInterfaces/reposInterfaces";

const fetchUserRepos = async (ctx: QueryFunctionContext) => {
  const userName = ctx.queryKey[1];
  const { data } = await api.get<ReposInterfaces[]>(`/users/${userName}/repos`);
  return data;
};

export function useUserRepos(gitHubUser: string) {
  return useQuery({ queryKey: ["repos", gitHubUser], queryFn: fetchUserRepos });
}
