import { IDictionary } from "@/types";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ITopMenuProps {
  dic: IDictionary;
}

/**
 * Top menu to provide certain functions globally
 */
export function TopMenu(props: ITopMenuProps) {
  return (
    <div className="flex justify-end items-center px-2">
      <a
        className="flex items-center justify-center gap-4 p-3"
        href="https://github.com/robin-thoene/fromsoft-boss-checker"
        target="_blank"
      >
        {props.dic["topMenu_sourceCodeLink_text"]}{" "}
        <FontAwesomeIcon className="h-4 w-4" icon={faGithub} />
      </a>
    </div>
  );
}
