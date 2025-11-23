import { twMerge } from "tailwind-merge";

const buttonDefaultClasses =
  "relative flex items-center justify-center gap-1 px-4 py-2 text-sm font-orbitron font-bold cursor-pointer select-none [clip-path:polygon(15px_0,_100%_0,_100%_100%,_0_100%,_0_15px)] before:content-[''] before:absolute before:inset-[2px] before:bg-primary before:-z-1 before:[clip-path:polygon(14px_0,_100%_0,_100%_100%,_0_100%,_0_14px)] before:transition-all before:duration-300";

const buttonVariants = {
  default:
    "bg-linear-160 from-primary-lighter/50 via-primary/50 to-primary-dark/50 text-grey-darkest before:inset-0 hover:before:inset-[2px] hover:text-primary hover:before:bg-grey-darker transition-all duration-300",
  outline:
    "bg-linear-160 from-primary-lighter/50 via-primary/50 to-primary-dark/50 text-grey-lighter before:bg-primary-darker hover:from-primary-dark/50 hover:via-primary/50 hover:to-primary-lighter/50 transition-all duration-300",
  transparent:
    "bg-transparent text-grey-lighter before:bg-transparent hover:bg-grey-darker transition-all duration-300",
};

type ButtonProps = {
  variant?: keyof typeof buttonVariants;
  className?: string;
} & (
  | (React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: never })
  | (React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
);

export default function Button({
  variant = "default",
  className,
  ...props
}: ButtonProps) {
  return props.href ? (
    <a
      className={twMerge(
        buttonDefaultClasses,
        buttonVariants[variant],
        className
      )}
      {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
    ></a>
  ) : (
    <button
      type="button"
      className={twMerge(
        buttonDefaultClasses,
        buttonVariants[variant],
        className
      )}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    ></button>
  );
}
