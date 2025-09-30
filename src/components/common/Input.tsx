import { ReactNode } from "react";

type InputProps = {
  name?: string;
  className?: string;
  placeHolder?: string;
  children?: ReactNode;
  type?: React.HTMLInputTypeAttribute;
  id?: string;
  value?: string;
  hasError?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  inputRef?: React.RefObject<HTMLInputElement>;
  icon?: ReactNode;
  onFocus?: () => void;
  onBlur?: () => void;
};
export default function Input(props: InputProps) {
  return (
    <div className={`${props.className} relative`}>
      {props.children && (
        <h2 className="text-text/75 pb-2">{props.children}</h2>
      )}
      {props.icon && (
        <div className="flex items-center justify-center absolute left-0 top-0 h-full aspect-square">
          {props.icon}
        </div>
      )}
      <input
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        name={props.name}
        ref={props.inputRef}
        type={`${props.type}`}
        id={props.id}
        placeholder={props.placeHolder}
        value={props.value}
        onChange={props.onChange}
        className={`${props.hasError ? "border-red" : "focus:border-b-accent border-text/15"} w-full ${props.icon ? "px-12 py-2 md:py-3" : "p-2 md:p-3"} text-sm bg-background focus:bg-background2 text-light/75 outline-none border-2 rounded-lg focus:rounded-none focus:rounded-t-lg  transition-all duration-500`}
      />
    </div>
  );
}
