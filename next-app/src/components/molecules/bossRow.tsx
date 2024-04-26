'use client';

import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';

import { Button, Checkbox } from '@/components/atoms';
import { FromSoftwareGame } from '@/enumerations';
import { IBoss } from '@/types';

import ContextActions from './bossRowContextActions';

interface IBossRowProps {
    boss: IBoss;
    felledBossIds: number[];
    markedBossIds: number[];
    updateFelledBossIds: (newBossIds: number[]) => void;
    isInitialized: boolean;
    fromSoftwareGame: FromSoftwareGame;
    updateMarkedBossIds: (newMarkedBossIds: number[]) => void;
}
/**
 * Custom render component for a single boss.
 * @param {IBossRowProps} props - The component properties,
 * @returns {ReactElement} The rendered boss.
 */
export default function BossRow(props: IBossRowProps): ReactElement {
    const [openContextMenu, setOpenContextMenu] = useState(false);

    /**
     * Callback to mark a boss as felled or not.
     * @param {number} bossId The id of the boss to mark as felled / not felled.
     */
    const toggleFelledState = useCallback(
        (bossId: number) => {
            const tmpFelledBossIds = [...props.felledBossIds];
            const alreadyExists = props.felledBossIds.includes(bossId);
            if (!alreadyExists) {
                // If the boss is checked, add it to the list.
                tmpFelledBossIds.push(bossId);
            } else {
                // If the boss is unchecked, remove it from the list.
                const index = tmpFelledBossIds.indexOf(bossId);
                if (index > -1) {
                    tmpFelledBossIds.splice(index, 1);
                }
            }
            props.updateFelledBossIds([...tmpFelledBossIds]);
        },
        [props],
    );

    useEffect(() => {
        /**
         * Function to handle light dismiss for the context menu on mobile devices.
         */
        function lightDismiss() {
            setOpenContextMenu(false);
        }
        if (openContextMenu) {
            document.addEventListener('click', lightDismiss);
        }
        return () => document.removeEventListener('click', lightDismiss);
    }, [openContextMenu]);

    const rowContent = useMemo(
        () => (
            <>
                <div className={`flex items-center ${props.felledBossIds.includes(props.boss.id) ? 'line-through' : ''}`}>
                    <Checkbox isChecked={props.felledBossIds.includes(props.boss.id)} disabled={!props.isInitialized} onChange={() => toggleFelledState(props.boss.id)} />
                    <div className="pl-7">{props.boss.name}</div>
                </div>
                <div className="hidden xs:flex gap-4 items-center justify-between">
                    <ContextActions
                        boss={props.boss}
                        markedBossIds={props.markedBossIds}
                        fromSoftwareGame={props.fromSoftwareGame}
                        updateMarkedBossIds={props.updateMarkedBossIds}
                    />
                </div>
                <div className="flex xs:hidden relative">
                    <Button
                        icon={<EllipsisVerticalIcon className={`h-4 w-4 ${props.markedBossIds.includes(props.boss.id) ? 'text-red-600' : ''}`} />}
                        onClick={() => setOpenContextMenu(true)}
                    />
                    {openContextMenu && (
                        <div className="absolute flex flex-row right-full top-1/2 -translate-y-1/2 rounded-lg p-1 border border-black dark:border-white bg-white dark:bg-black">
                            <ContextActions
                                boss={props.boss}
                                markedBossIds={props.markedBossIds}
                                fromSoftwareGame={props.fromSoftwareGame}
                                updateMarkedBossIds={props.updateMarkedBossIds}
                            />
                        </div>
                    )}
                </div>
            </>
        ),
        [openContextMenu, props.boss, props.felledBossIds, props.fromSoftwareGame, props.isInitialized, props.markedBossIds, props.updateMarkedBossIds, toggleFelledState],
    );

    return (
        <div className="flex w-full items-center">
            <div className="w-full">
                <div className="flex sm:hidden flex-row w-full gap-4 justify-between">{rowContent}</div>
                <div className="cursor-pointer hidden sm:flex flex-row w-full gap-4 justify-between" onClick={() => toggleFelledState(props.boss.id)}>
                    {rowContent}
                </div>
            </div>
        </div>
    );
}
