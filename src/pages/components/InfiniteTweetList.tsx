import InfiniteScroll from "react-infinite-scroll-component";
import ProfileImage from "./ProfileImage";
import Link from "next/link";

type Tweet = {
  id: string;
  content: string;
  createdAt: Date;
  likesCount: number;
  isLikedByMe: boolean;
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
};

type InfiniteTweetListProps = {
  tweets?: Tweet[];
  isLoading: boolean;
  isError: boolean;
  fetchNewTweets: () => Promise<unknown>;
  hasMore: boolean | undefined;
};

const InfiniteTweetList = ({
  tweets,
  isLoading,
  isError,
  hasMore,
  fetchNewTweets,
}: InfiniteTweetListProps) => {
  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error</h1>;
  if (tweets == null || tweets.length === 0) return <h1>No tweets</h1>;

  return (
    <ul>
      <InfiniteScroll
        dataLength={tweets.length}
        next={fetchNewTweets}
        hasMore={hasMore || false}
        loader={<h4>Loading...</h4>}
      >
        {tweets.map((tweet) => {
          return <TweetPost key={tweet.id} {...tweet} />;
        })}
      </InfiniteScroll>
    </ul>
  );
}

const dateFormatter = new Intl.DateTimeFormat(undefined, {dateStyle:"short"})

function TweetPost({
  user,
  content,
  createdAt,
  // likesCount,
  // isLikedByMe,
}: Tweet) {
  return (
    <div className="p-4 border-b border-white/10">
      <div className="m-auto flex flex-row px-2 gap-4">
        <Link href={`/profiles/${user.id}`}>
          <ProfileImage imageUrl={user.image}/>
        </Link>
        <div className="flex flex-col">
          <div className="flex flex-row gap-4">
            <h1 className="font-semibold">{user.name}</h1>
            <p className="font-light text-white/40">{dateFormatter.format(createdAt)}</p>
          </div>
          <p className="font-light">{content}</p>
        </div>
      </div>
    </div>
  );
}

export default InfiniteTweetList;