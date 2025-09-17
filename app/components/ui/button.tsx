import { twMerge } from "tailwind-merge";

const buttonDefaultClasses =
  "relative flex items-center justify-center gap-1 px-4 py-2 text-sm font-orbitron font-bold cursor-pointer [clip-path:polygon(20px_0,_100%_0,_100%_100%,_0_100%,_0_12px)] before:content-[''] before:absolute before:inset-[2px] before:bg-primary before:-z-1 before:[clip-path:polygon(18.5px_0,_100%_0,_100%_100%,_0_100%,_0_11px)] before:transition-all before:duration-300";

const buttonVariants = {
  default:
    "bg-linear-160 from-primary-lighter/50 via-primary/50 to-primary-dark/50 text-grey-darkest before:inset-0 hover:before:inset-[2px] hover:text-primary hover:before:bg-grey-darker transition-all duration-300",
  outline:
    "bg-linear-160 from-primary-lighter/50 via-primary/50 to-primary-dark/50 text-grey-lightest before:bg-primary-darker hover:from-primary-dark/50 hover:via-primary/50 hover:to-primary-lighter/50 transition-all duration-300",
  transparent:
    "bg-transparent text-grey-lightest before:bg-transparent hover:bg-grey-darker transition-all duration-300",
};

export default function Button({
  variant = "default",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> & {
  variant?: keyof typeof buttonVariants;
  href?: string;
}) {
  return props.href ? (
    <a
      className={twMerge(
        buttonDefaultClasses,
        buttonVariants[variant],
        className
      )}
      {...props}
    ></a>
  ) : (
    <button
      type="button"
      className={twMerge(
        buttonDefaultClasses,
        buttonVariants[variant],
        className
      )}
      {...props}
    ></button>
  );
}
