import InfiniteScroll from "react-infinite-scroll-component";
import ProfileImage from "./ProfileImage";
import Link from "next/link";
import { VscHeartFilled, VscHeart } from "react-icons/vsc";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

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
};

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "short",
});

function TweetPost({
  id,
  user,
  content,
  createdAt,
  likesCount,
  isLikedByMe,
}: Tweet) {

  
  const toggleLike = api.tweet.like.useMutation();

  function handleToggleLike(){
    toggleLike.mutate({tweetId: id});
  }

  return (
    <div className="border-b border-white/10 p-4">
      <header className="m-auto flex flex-row gap-4 px-2">
        <Link href={`/profiles/${user.id}`}>
          <ProfileImage imageUrl={user.image} />
        </Link>
        <div className="flex flex-col">
          <div className="flex flex-row gap-4">
            <h1 className="font-semibold">{user.name}</h1>
            <p className="font-light text-white/40">
              {dateFormatter.format(createdAt)}
            </p>
          </div>
          <p className="font-light">{content}</p>
        </div>
      </header>
      <footer className="text-center align-middle items-center">
        <LikeButton onClick={handleToggleLike} isLoading={toggleLike.isLoading} isLikedByMe={isLikedByMe} likesCount={likesCount} />
      </footer>
    </div>
  );
}

type LikeButtonProps = {
  onClick: () => void;
  isLoading: boolean;
  isLikedByMe: boolean;
  likesCount: number;
};

function LikeButton({
  onClick,
  isLoading,
  isLikedByMe,
  likesCount,
}: LikeButtonProps) {
  const session = useSession();
  const HeartIcon = isLikedByMe ? VscHeartFilled : VscHeart;

  if (session.status !== "authenticated") {
    return (
      <button className="group flex flex-row gap-2">
        <HeartIcon />
        <span>{likesCount}</span>
      </button>
    );
  }
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`group flex flex-row gap-2 transition-colors ${
        isLikedByMe
          ? "text-pink-600"
          : "text-gray-600 hover:text-pink-600 focus-visible:text-pink-600"
      }`}
    >
      <HeartIcon
        className={`transition-colors duration-200 ${
          isLikedByMe
            ? "fill-pink-600"
            : "fill-gray-600 group-hover:fill-pink-600 group-focus-visible:fill-pink-600"
        }`}
      />
      <span>{likesCount}</span>
    </button>
  );
}

export default InfiniteTweetList;
