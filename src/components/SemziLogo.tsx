import Image from "next/image";
import { cn } from "@/lib/utils";

type SemziLogoProps = {
  className?: string;
  /** `onLight` for cream backgrounds; `onDark` for dark/video surfaces */
  surface?: "onLight" | "onDark";
  priority?: boolean;
  sizes?: string;
};

export default function SemziLogo({
  className,
  surface = "onLight",
  priority = false,
  sizes = "180px",
}: SemziLogoProps) {
  return (
    <Image
      src="/images/brand/semzi-logo.png"
      alt="Semzi"
      width={144}
      height={64}
      priority={priority}
      sizes={sizes}
      unoptimized
      className={cn(
        "h-8 w-auto bg-transparent object-contain object-left sm:h-9",
        surface === "onDark" && "brightness-0 invert",
        className
      )}
    />
  );
}
