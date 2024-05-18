import searchIcon from "./assets/Search.svg";
import { useState } from "react";
import { useUserInfo } from "./hooks/useUserInfo";
import { Repos } from "./components/Repos";
import { Loader } from "./components/Loader";
import { useDebounce } from "./hooks/useDebounce";

function App() {
  const [userName, setUserName] = useState("github");

  const debounceUserName = useDebounce(userName, 600);

  const { data, isLoading } = useUserInfo(debounceUserName);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  return (
    <main className="min-h-screen w-full pt-8">
      <form
        className="max-w-screen-lg w-full mx-auto flex justify-center"
        onSubmit={handleSubmit}
      >
        <label
          className="w-[500px] flex items-center gap-2 bg-[#212A3B] p-4 rounded-lg"
          htmlFor="username"
        >
          <img src={searchIcon} alt="search icon" />
          <input
            value={userName}
            className="bg-[#212A3B] text-white focus:outline-none font-semibold w-full text-lg"
            type="text"
            placeholder="username"
            onChange={handleChange}
          />
        </label>
      </form>
      <section className="h-full w-full relative top-[182px] max-w-screen-lg mx-auto">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div>
              <div className="h-[120px] w-[125px] absolute top-[-60px] p-2 bg-[#212A3B] rounded-2xl">
                <img
                  className="rounded-lg"
                  src={data?.avatar_url}
                  alt={`${data?.name} image`}
                />
              </div>
              <ul className="flex gap-4 ps-[145px] ">
                <li className="flex bg-[#111729] px-4 rounded-xl py-2 items-center">
                  <p className="border-r font-semibold border-[#4A5567] py-2 pe-4 text-[#4A5567]">
                    Follower
                  </p>
                  <strong className="ps-4 text-[#CDD5E0]">
                    {data?.followers}
                  </strong>
                </li>
                <li className="flex bg-[#111729] px-4 rounded-xl py-2 items-center">
                  <p className="border-r font-semibold border-[#4A5567] py-2 pe-4 text-[#4A5567]">
                    Following
                  </p>
                  <strong className="ps-4 text-[#CDD5E0]">
                    {data?.following}
                  </strong>
                </li>
                <li className="flex bg-[#111729] px-4 rounded-xl py-2 items-center">
                  <p className="border-r font-semibold border-[#4A5567] py-2 pe-4 text-[#4A5567]">
                    Location
                  </p>
                  <strong className="ps-4 text-[#CDD5E0]">
                    {data?.location === null ? "No location" : data?.location}
                  </strong>
                </li>
              </ul>
            </div>

            <div className="my-8 flex flex-col gap-1">
              <h1 className="text-4xl text-[#CDD5E0] ">{data?.name}</h1>
              <p className="text-[#4A5567] font-semibold">{data?.bio}</p>
            </div>
          </>
        )}

        <Repos gitHubUser={debounceUserName} />
      </section>
    </main>
  );
}

export default App;
