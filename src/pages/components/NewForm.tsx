import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "~/utils/api";
import ProfileImage from "./ProfileImage";


const NewForm = () => {
  const { data: sessionData, status } = useSession();
  
  const [tweet, setTweet] = useState("");

  const newTweet = api.tweet.create.useMutation({
    onSuccess: (tweet) => {
      console.log(tweet);
      setTweet("");
    }
  })

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
