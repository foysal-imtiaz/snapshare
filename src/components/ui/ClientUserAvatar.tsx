"use client";

import { Avatar, AvatarImage } from "./avatar";
import { useUser } from "@clerk/nextjs";

export default function ClientUserAvatar({
  fallbackSrc,
  className,
}: {
  fallbackSrc: string;
  className?: string;
}) {
  const { user } = useUser();
  const src = user?.imageUrl || fallbackSrc;

  return (
    <Avatar className={className}>
      <AvatarImage src={src} />
    </Avatar>
  );
}
