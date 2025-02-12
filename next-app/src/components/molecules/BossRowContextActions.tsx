import { Button } from "@/components/atoms";
import { FromSoftwareGame } from "@/enumerations";
import { IBoss, IEldenRingBoss } from "@/types";
import {
  DocumentTextIcon,
  FlagIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import { useCallback } from "react";

interface IContextActionsProps {
  boss: IBoss;
  markedBossIds: number[];
  updateMarkedBossIds: (newMarkedBossIds: number[]) => void;
  fromSoftwareGame: FromSoftwareGame;
}
/**
 * Context menu for a single boss row
 */
export function ContextActions(props: IContextActionsProps) {
  /**
   * Callback to mark a boss.
   * @param {number} bossId The id of the boss to mark.
   */
  const toggleMarkedState = useCallback(
    (bossId: number) => {
      const tmpMarkedBossIds = [...props.markedBossIds];
      const alreadyExists = props.markedBossIds.includes(bossId);
      if (!alreadyExists) {
        // If the boss is checked, add it to the list.
        tmpMarkedBossIds.push(bossId);
      } else {
        // If the boss is unchecked, remove it from the list.
        const index = tmpMarkedBossIds.indexOf(bossId);
        if (index > -1) {
          tmpMarkedBossIds.splice(index, 1);
        }
      }
      props.updateMarkedBossIds([...tmpMarkedBossIds]);
    },
    [props],
  );

  return (
    <>
      {props.boss.wikiReference && props.boss.wikiReference !== "" && (
        <Button
          icon={<DocumentTextIcon className="h-5 w-5" />}
          onClick={(e) => {
            e.stopPropagation();
            window.open(props.boss.wikiReference, "_blank");
          }}
        />
      )}
      {props.fromSoftwareGame === FromSoftwareGame.EldenRing &&
        (props.boss as IEldenRingBoss).wikiMapReference && (
          <Button
            icon={<MapPinIcon className="h-5 w-5" />}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              window.open(
                (props.boss as IEldenRingBoss).wikiMapReference,
                "_blank",
              );
            }}
          />
        )}
      <Button
        icon={
          <FlagIcon
            className={`h-5 w-5 ${props.markedBossIds.includes(props.boss.id) ? "text-red-600" : ""}`}
          />
        }
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          toggleMarkedState(props.boss.id);
        }}
      />
    </>
  );
}
