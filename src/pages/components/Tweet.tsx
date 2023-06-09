import { useSession } from "next-auth/react";
import Image from "next/image";

interface Tweet{
  id: string;
  content: string;
  createdAt: string;
  userId: string;
}

const Tweet = (props :Tweet) => {
  const { data: sessionData } = useSession();
  const imgUrl = sessionData?.user.image;

  return(
    <div
      className="flex w-full flex-row items-center gap-2 border-b border-white/10  px-4"
    >
      {imgUrl && (
        <Image
          className="h-14 w-14 rounded-full"
          width={100}
          height={100}
          alt="user image"
          src={imgUrl}
        />
      )}
      <h1>{props.}</h1>
      <p>{props.content}</p>
      <button type="submit" className="h-10 w-20 rounded-3xl bg-sky-500 font-semibold">
        Tweet
      </button>
    </div>
  )
}

export default Tweet;