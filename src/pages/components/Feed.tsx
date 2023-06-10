import { api } from "~/utils/api";
import Header from "./Header";
import NewForm from "./NewForm";
import { useSession } from "next-auth/react";

const Feed = () => {
  return (
    <div className="m-auto mr-0 ml-52 flex flex-col w-[35rem] border-r border-white/10 ">
      <Header />
      <div className="mt-16 flex flex-col gap-4">  
        <NewForm />
        {/* <RecentTweets/> */}
        <div className="h-64 w-48 bg-red-300"></div>
        <div className="h-64 w-48 bg-red-300"></div>
        <div className="h-64 w-48 bg-red-300"></div>
        <div className="h-64 w-48 bg-red-300"></div>
      </div>
    </div>
  );
}

function RecentTweets() {
  const id = useSession().data?.user.id;

  const tweets = api.tweet.getFeed.useInfiniteQuery({}, {getNextPageParam: (lastPage) => lastPage.nextCursor})

  //return <InfiniteTweetList tweets={tweets}/>
}

export default Feed;
