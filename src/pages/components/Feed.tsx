import { api } from "~/utils/api";
import Header from "./Header";
import NewForm from "./NewForm";
import { useEffect } from "react";
import { InfiniteTweetList } from "./InfiniteTweetList";

const Feed = () => {
  return (
    <div className="m-auto ml-52 mr-0 flex w-[35rem] flex-col border-r border-white/10 ">
      <Header />
      <div className="mt-16 flex flex-col gap-4">
        <NewForm />
        <RecentTweets/>
      </div>
    </div>
  );
};

function RecentTweets() {
  const tweets = api.tweet.getFeed.useInfiniteQuery(
    {},
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );

  return (
    <InfiniteTweetList
      tweets={tweets.data?.pages.flatMap((page) => page.data)}
      isLoading={tweets.isLoading}
      isError={tweets.isError}
      hasMore={tweets.hasNextPage}
      fetchNewTweets={tweets.fetchNextPage}
    />
  );
}

export default Feed;
