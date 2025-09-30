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
      className={`${props.className} ${color[props.color]} text-background rounded-md px-4 py-3 md:py-4 md:px-8 text-xs md:text-sm hover:scale-[1.02] transition-transform active:scale-95`}
    >
      {props.children}
    </button>
  );
}

export default Button;
