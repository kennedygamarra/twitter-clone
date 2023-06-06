import { type NextPage } from "next";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";

const Home: NextPage = () => {
  return (
    <>
      <main className="flex max-h-screen max-w-full text-white">
        <Sidebar />
        <Feed />
      </main>
    </>
  );
};

export default Home;
