import { useSession } from "next-auth/react";
import Image from "next/image";
export function NewForm() {
  const { data: sessionData } = useSession();
  const imgUrl = sessionData?.user.image;
  return (
    <form action="" className="flex w-full flex-row items-center gap-2">
      {imgUrl && (
        <Image
          className="h-14 w-14 rounded-full"
          width={100}
          height={100}
          alt="user image"
          src={imgUrl}
        />
      )}
      <input
        type="text"
        name="title"
        id="title"
        placeholder="What's happening?!"
      />
      <button className="h-10 w-20 rounded-3xl bg-sky-500 font-semibold">
        Tweet
      </button>
    </form>
  );
}
