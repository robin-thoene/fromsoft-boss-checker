"use client";

import { Button } from "@/components/atoms";
import { IDictionary, IRoute } from "@/types";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface ISideNavProps {
  dic: IDictionary;
  currentLang: string;
}

/**
 * Navigation bar on the side that contains the application routes as links
 */
export function SideNav(props: ISideNavProps) {
  const [show, setShow] = useState(false);
  const currentPathname = usePathname();
  const routes = useMemo(
    (): IRoute[] => [
      {
        path: `/${props.currentLang}/dark-souls-1`,
        label: props.dic["darkSoulsOne_label"],
      },
      {
        path: `/${props.currentLang}/dark-souls-2`,
        label: props.dic["darkSoulsTwo_label"],
      },
      {
        path: `/${props.currentLang}/dark-souls-3`,
        label: props.dic["darkSoulsThree_label"],
      },
      {
        path: `/${props.currentLang}/demon-souls`,
        label: props.dic["demonSouls_label"],
      },
      {
        path: `/${props.currentLang}/elden-ring`,
        label: props.dic["eldenRing_label"],
      },
      {
        path: `/${props.currentLang}/bloodborne`,
        label: props.dic["bloodborne_label"],
      },
      {
        path: `/${props.currentLang}/sekiro`,
        label: props.dic["sekiro_label"],
      },
    ],
    [props.currentLang, props.dic],
  );

  useEffect(() => {
    /**
     * Function to handle light dismiss for the side navigation on mobile devices.
     */
    function lightDismiss() {
      setShow(false);
    }
    if (show) {
      document.addEventListener("click", lightDismiss);
    }
    return () => document.removeEventListener("click", lightDismiss);
  }, [show]);

  return (
    <>
      <nav
        className={`border-r fixed ${show ? "left-0 h-screen bg-white dark:bg-black" : "-left-full"} sm:relative sm:left-auto`}
      >
        <div className="flex flex-col pt-16 pb-2 h-full relative">
          <div className="absolute top-1 right-2 sm:hidden">
            <Button
              icon={<XMarkIcon className="h-4 w-4" />}
              onClick={() => setShow(false)}
            />
          </div>
          {routes.map((r) => (
            <Link
              className="px-5 py-2 relative"
              key={`route-${r.path}`}
              href={r.path}
            >
              {r.path === currentPathname && (
                <span className="absolute left-1 top-0 h-full border-l-2 border-black dark:border-white" />
              )}
              {r.label}
            </Link>
          ))}
          <div className="mt-auto">
            <a
              className="flex items-center justify-center gap-4 p-3"
              href="https://github.com/robin-thoene/fromsoft-boss-checker"
              target="_blank"
            >
              {props.dic["topMenu_sourceCodeLink_text"]}{" "}
              <FontAwesomeIcon className="h-4 w-4" icon={faGithub} />
            </a>
          </div>
        </div>
      </nav>
      {!show && (
        <div className="fixed top-1 left-0 flex sm:hidden">
          <Button
            icon={<Bars3Icon className="h-4 w-4" />}
            onClick={() => setShow(true)}
          />
        </div>
      )}
    </>
  );
}
