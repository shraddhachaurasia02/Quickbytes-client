import { ReactNode } from "react";

function Button(props: {
  children?: ReactNode;
  className?: string;
  color: "primary" | "secondary" | "accent" | "red";
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  let color: { [key: string]: string } = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    accent: "bg-accent",
    red: "bg-red",
  };
  return (
    <button
      onClick={props.onClick}
      className={`${props.className} ${color[props.color]} text-background rounded-xl px-5 py-2.5 md:py-3 md:px-8 text-sm md:text-base font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]`}
    >
      {props.children}
    </button>
  );
}

export default Button;
