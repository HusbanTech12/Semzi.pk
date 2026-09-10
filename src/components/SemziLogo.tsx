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
  sizes = "200px",
}: SemziLogoProps) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src="/images/brand/semzi-logo-v2.png"
        alt="Semzi"
        width={426}
        height={183}
        priority={priority}
        sizes={sizes}
        unoptimized
        className={cn(
          "h-9 w-auto max-w-[140px] bg-transparent object-contain object-left sm:h-10 sm:max-w-[160px]",
          surface === "onDark" && "brightness-0 invert"
        )}
      />
    </span>
  );
}
