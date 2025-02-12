import { ReactElement } from "react";

interface ICheckboxProps {
  isChecked: boolean;
  onChange: (newValue: boolean) => void;
  disabled?: boolean;
}

/**
 * Basic check box component
 */
export function Checkbox(props: ICheckboxProps): ReactElement {
  return (
    <input
      type="checkbox"
      className="accent-blue-300 h-5 w-5"
      checked={props.isChecked}
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => props.onChange(e.target.checked)}
      disabled={props.disabled}
    />
  );
}
