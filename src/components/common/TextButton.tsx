import { ReactNode } from "react";

function TextButton(props: { children?: ReactNode; className?: string }) {
  return (
    <button
      className={`${props.className} px-4 py-2 md:py-2.5 md:px-6 font-medium active:scale-95 duration-200 relative hover:text-accent active:text-primary transition-all after:absolute after:bg-accent active:after:bg-primary after:h-px after:w-full after:left-0 after:bottom-0 hover:after:origin-left after:origin-right after:scale-x-0 hover:after:scale-100 after:transition-transform`}
    >
      {props.children}
    </button>
  );
}

export default TextButton;
