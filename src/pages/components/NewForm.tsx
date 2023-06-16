import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "~/utils/api";
import ProfileImage from "./ProfileImage";

const NewForm = () => {
  const { data: sessionData, status } = useSession();

  const [tweet, setTweet] = useState("");

  const utils = api.useContext();

  const newTweet = api.tweet.create.useMutation({
    onSuccess: (newTweet) => {
      setTweet("");
      if (status != "authenticated") return;

      utils.tweet.getFeed.setInfiniteData({}, (oldData) => {
        if (oldData == null || oldData.pages[0] == null) return;

        const newTweetCache = {
          ...newTweet,
          isLikedByMe: false,
          likesCount: 0,
          user: {
            id: sessionData.user.id,
            name: sessionData.user.name,
            image: sessionData.user.image,
          },
        };

        return {
          ...oldData,
          pages: [
            {
              ...oldData.pages[0],
              tweets: [newTweetCache, ...oldData.pages[0].data],
            },
            ...oldData.pages.slice(1),
          ],
        };
      });
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    newTweet.mutate({ content: tweet });
  }

  if (status !== "authenticated") return null;

  const imgUrl = sessionData?.user.image;
  return (
    <form
      onSubmit={handleSubmit}
      action=""
      className="flex w-full flex-row items-center gap-2 border-b border-white/10  px-4"
    >
      <ProfileImage imageUrl={imgUrl || null} />
      <textarea
        name="title"
        id="title"
        value={tweet}
        onChange={(e) => setTweet(e.target.value)}
        className="h-auto w-auto resize-none overflow-hidden bg-inherit px-4 py-2 outline-none"
        placeholder="What's happening?!"
      />
      <button
        type="submit"
        className="h-10 w-20 rounded-3xl bg-sky-500 font-semibold"
      >
        Tweet
      </button>
    </form>
  );
};

export default NewForm;
