import Image from "next/image";

const ProfileImage = ({imageUrl}: {imageUrl: string | null}) => {
  if (!imageUrl) return null;

  return (
    <Image
      className="h-14 w-14 rounded-full"
      width={100}
      height={100}
      alt="userImage"
      src={imageUrl}
    />
  );
}

export default ProfileImage;
