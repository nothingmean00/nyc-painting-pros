import Image from "next/image";

export function Logo({ className = "", preload = false }: { className?: string; preload?: boolean }) {
  return <Image src="/brand/header-logo.webp" alt="NYC Painting Pros" width={840} height={186} sizes="210px" preload={preload} className={`block h-[44px] w-[190px] max-w-full object-contain sm:w-[210px] ${className}`} />;
}
