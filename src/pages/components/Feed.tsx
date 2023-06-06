import Header from "./Header";
import NewForm from "./NewForm";


const Feed = () => {
  return (
    <div className="m-auto ml-52 flex w-full flex-col">
      <Header />
      <div className="mt-16 flex flex-col gap-4 px-4">
        <NewForm />
        <div className="h-64 w-48 bg-red-300"></div>
        <div className="h-64 w-48 bg-red-300"></div>
        <div className="h-64 w-48 bg-red-300"></div>
        <div className="h-64 w-48 bg-red-300"></div>
        <div className="h-64 w-48 bg-red-300"></div>
      </div>
    </div>
  );
}

export default Feed;
