import { ReactElement } from "react";

interface IButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  text?: string;
  icon?: ReactElement;
  isDangerous?: boolean;
  outlined?: boolean;
  fullWidth?: boolean;
}

/**
 * Basic button component
 */
export function Button(props: IButtonProps): ReactElement {
  return (
    <button
      className={`flex flex-row items-center ${props.fullWidth ? "w-full" : "w-max"} p-3 ${props.outlined ? "outline outline-1" : ""} ${props.isDangerous ? "text-red-500 outline-red-500" : ""} rounded-lg h-max max-w-full`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.icon && <div>{props.icon}</div>}
      {props.text && (
        <div className="px-3 flex flex-1 justify-center">{props.text}</div>
      )}
    </button>
  );
}
