import { twMerge } from "tailwind-merge";

const buttonDefaultClasses = "px-4 py-2 font-orbitron font-bold cursor-pointer";

const buttonVariants = {
  default:
    "bg-primary text-grey-darkest border border-primary hover:bg-transparent hover:text-primary transition-all duration-300",
  outline: "bg-primary/15 border border-primary text-grey-lightest",
};

export default function Button({
  variant = "default",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof buttonVariants;
}) {
  return (
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
