import { Button } from "@/components/atoms";
import { IDictionary } from "@/types";
import { ReactElement, ReactNode } from "react";

interface IDialogProps {
  dic: IDictionary;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  children?: ReactNode;
  isDangerous?: boolean;
  isBlocking?: boolean;
  cancelText?: string;
  confirmText?: string;
}

/**
 * Basic dialog component
 */
export function Dialog(props: IDialogProps): ReactElement {
  return props.isOpen ? (
    <div
      className="fixed top-0 left-0 flex justify-center items-center w-screen h-screen z-50"
      onClick={() => (props.isBlocking ? null : props.onClose())}
    >
      <div
        className="bg-white dark:bg-black border border-black dark:border-white p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-bold">{props.title}</h3>
        <div className="py-4">{props.children}</div>
        <div className="flex justify-end gap-4 mt-4">
          <Button
            text={props.cancelText ? props.cancelText : props.dic["close"]}
            onClick={props.onClose}
          />
          {props.onConfirm && (
            <Button
              isDangerous={props.isDangerous}
              outlined
              text={
                props.confirmText ? props.confirmText : props.dic["confirm"]
              }
              onClick={props.onConfirm}
            />
          )}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
