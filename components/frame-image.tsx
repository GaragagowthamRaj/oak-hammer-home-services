import Image from "next/image";

export function FrameImage({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="px-5 pt-24 sm:px-8 md:pt-28">
      <div className="relative mx-auto h-56 max-w-site overflow-hidden bg-mist md:h-[380px]">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1180px) 1180px, 100vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
