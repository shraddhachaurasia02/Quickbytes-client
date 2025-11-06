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
        className={`${props.hasError ? "border-red focus:border-red" : "border-text/20 focus:border-[#477023]"} w-full ${props.icon ? "pl-12 pr-4 py-3" : "px-4 py-3"} text-sm bg-background2 focus:bg-white text-text/80 placeholder:text-text/40 outline-none border rounded-xl focus:ring-2 focus:ring-[#477023]/20 transition-all duration-200`}
      />
    </div>
  );
}
