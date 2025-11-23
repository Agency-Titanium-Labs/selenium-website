import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({ label, ...props }: Readonly<InputProps>) {
  return (
    <div className="relative grid">
      <input
        {...props}
        id={props.id || props.name}
        placeholder=""
        className={twMerge(
          "px-4 py-2 rounded-sm bg-grey-darker peer",
          props.className
        )}
      />
      <label
        className={twMerge(
          "absolute top-2 left-4 flex gap-0.5 pointer-events-none transition-all",
          "peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-sm",
          "peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-sm"
        )}
        htmlFor={props.id || props.name}
      >
        {label}
        {props.required && <p className="text-primary">*</p>}
      </label>
    </div>
  );
}
