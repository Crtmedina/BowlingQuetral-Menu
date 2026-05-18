import Image from "next/image";

function isNextImageHost(src: string): boolean {
  try {
    const h = new URL(src).hostname;
    return h === "images.unsplash.com";
  } catch {
    return false;
  }
}

type CartaProductImageProps = {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
};

export function CartaProductImage({
  src,
  alt,
  className,
  fill,
  sizes,
  priority,
}: CartaProductImageProps) {
  if (fill && isNextImageHost(src)) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={className}
        priority={priority}
      />
    );
  }

  if (fill) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 h-full w-full object-cover ${className ?? ""}`}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} />
  );
}
