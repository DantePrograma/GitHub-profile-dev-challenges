import { useState } from "react";
import { useUserRepos } from "../hooks/useUserRepos";
import ChieldSvg from "../assets/Chield_alt.svg";
import NestingSvg from "../assets/Nesting.svg";
import StarSvg from "../assets/Star.svg";

type Props = {
  gitHubUser: string;
};

export const Repos = ({ gitHubUser }: Props) => {
  const { data } = useUserRepos(gitHubUser);
  const [showRepos, setShowRepos] = useState(true);

  const repos = showRepos ? data?.slice(0, 4) : data;

  function formatTimeAgo(isoDateString: Date): string {
    const updatedDate = new Date(isoDateString); // Convertir la fecha ISO en un objeto Date

    const currentDate = new Date(); // Fecha y hora actuales
    const timeDifference = currentDate.getTime() - updatedDate.getTime(); // Diferencia en milisegundos

    const secondsDifference = Math.floor(timeDifference / 1000); // Convertir a segundos
    const minutesDifference = Math.floor(secondsDifference / 60); // Convertir a minutos
    const hoursDifference = Math.floor(minutesDifference / 60); // Convertir a horas
    const daysDifference = Math.floor(hoursDifference / 24); // Convertir a días
    const monthsDifference = Math.floor(daysDifference / 30); // Estimación de meses (30 días por mes)
    const yearsDifference = Math.floor(daysDifference / 365); // Estimación de años (365 días por año)

    // Calculando el tiempo transcurrido en términos humanos
    if (yearsDifference > 0) {
      return `updated ${yearsDifference} year${
        yearsDifference !== 1 ? "s" : ""
      } ago`;
    } else if (monthsDifference > 0) {
      return `updated ${monthsDifference} month${
        monthsDifference !== 1 ? "s" : ""
      } ago`;
    } else if (daysDifference > 0) {
      return `updated ${daysDifference} day${
        daysDifference !== 1 ? "s" : ""
      } ago`;
    } else if (hoursDifference > 0) {
      return `updated ${hoursDifference} hour${
        hoursDifference !== 1 ? "s" : ""
      } ago`;
    } else if (minutesDifference > 0) {
      return `updated ${minutesDifference} minute${
        minutesDifference !== 1 ? "s" : ""
      } ago`;
    } else {
      return `updated less than a minute ago`;
    }
  }
  return (
    <div>
      <div className="grid grid-cols-2 gap-7">
        {repos?.map((repo) => {
          return (
            <a
              target="_blank"
              href={repo.html_url}
              className="p-4 flex flex-col gap-3 rounded-xl bg-[linear-gradient(90deg,#111628,#1d1b46)]"
              key={repo.id}
            >
              <h1 className="text-2xl text-[#CDD5E0] font-semibold ">
                {repo.name}
              </h1>
              <p className="text-[#97A3B6] font-medium text-sm ">
                {repo.description}
              </p>
              <ul className="flex items-center gap-2 text-[#97A3B6]">
                {repo.license?.name && (
                  <li className="flex gap-1 items-center justify-center">
                    <img src={ChieldSvg} alt="Chield icon" />
                    <p>{repo.license?.name.split(" ")[0]}</p>
                  </li>
                )}

                <li className="flex gap-1 items-center justify-center">
                  <img src={NestingSvg} alt="Nesting icon" />
                  <p>{repo.forks_count}</p>
                </li>
                <li className="flex gap-1 items-center justify-center">
                  <img src={StarSvg} alt="Star icon" />
                  <p>{repo.stargazers_count}</p>
                </li>
                <li className="flex gap-1 items-center justify-center">
                  <p className="text-xs">{formatTimeAgo(repo.updated_at)}</p>
                </li>
              </ul>
            </a>
          );
        })}
      </div>
      <div className="flex justify-center py-8">
        <button
          className="text-[#CDD5E0]"
          onClick={() => setShowRepos(!showRepos)}
        >
          {showRepos ? "View all repositories" : "View less"}
        </button>
      </div>
    </div>
  );
};
