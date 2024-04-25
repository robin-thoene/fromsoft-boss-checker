'use client';

import { DocumentTextIcon, EllipsisVerticalIcon, FlagIcon, LinkIcon, MapPinIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { Button, Checkbox } from '@/components/atoms';
import { Dialog } from '@/components/molecules';
import { FromSoftwareGame } from '@/enumerations/fromSoftwareGame';
import { IBoss, IDictionary, IEldenRingBoss, IRegion } from '@/types';

/**
 * Properties for the boss checklist page component.
 */
interface IBossChecklistProps {
    /** The dictionary to use for translating texts. */
    dic: IDictionary;
    /** The FromSoftware game to display. */
    fromSoftwareGame: FromSoftwareGame;
    /** The regions including the boss lists to display. */
    regions?: IRegion[];
    /** The boss list to display. */
    bosses?: IBoss[];
    /** The key to use for retrieving / saving the ID's of the bosses marked as felled. */
    localStorageFelledBossesKey: string;
    /** The key to use for retrieving / saving the ID's of the bosses marked by the user. */
    localStorageMarkedBossesKey: string;
}

/**
 * Standardized page component for the boss checklist of a single FromSoftware game.
 * @param {IBossChecklistProps} props The properties for the component.
 * @returns {ReactElement} The rendered component.
 */
export default function BossChecklist(props: IBossChecklistProps): ReactElement {
    const router = useRouter();
    /** The page title. */
    const title = useMemo(() => {
        switch (props.fromSoftwareGame) {
            case FromSoftwareGame.DarkSouls:
                return props.dic['darkSoulsOne_label'];
            case FromSoftwareGame.DarkSouls2:
                return props.dic['darkSoulsTwo_label'];
            case FromSoftwareGame.DarkSouls3:
                return props.dic['darkSoulsThree_label'];
            case FromSoftwareGame.Bloodborne:
                return props.dic['bloodborne_label'];
            case FromSoftwareGame.Sekiro:
                return props.dic['sekiro_label'];
            case FromSoftwareGame.EldenRing:
                return props.dic['eldenRing_label'];
            case FromSoftwareGame.DemonSouls:
                return props.dic['demonSouls_label'];
            default:
                return '';
        }
    }, [props.dic, props.fromSoftwareGame]);

    /** The counter of all bosses. */
    const bossCounter = useMemo(() => {
        if (props.bosses) {
            return props.bosses.length;
        }
        if (props.regions) {
            return props.regions.reduce((acc, region) => acc + region.bosses.length, 0);
        }
        return 0;
    }, [props.bosses, props.regions]);

    /** Whether the page is initialized on the client or not. */
    const [isInitializedClientSide, setIsInitializedClientSide] = useState<boolean>(false);
    /** The list of the bosses the user has marked as felled. */
    const [felledBossIds, setFelledBossIds] = useState<number[]>([]);
    /** Whether the dialog to confirm clearing the progress is open or not. */
    const [isClearDialogOpen, setIsClearDialogOpen] = useState<boolean>(false);
    /** The list of the bosses the user has marked. */
    const [markedBossIds, setMarkedBossIds] = useState<number[]>([]);

    /** Initialize the page on client side. */
    useEffect(() => {
        // Validate a correct usage of the properties.
        if (props.regions && props.bosses) {
            throw new Error('The properties "regions" and "bosses" are mutually exclusive. Please use only one of them.');
        }
        // Load the users stored progress from the local storage.
        const storedFelledBossIdsString = localStorage.getItem(props.localStorageFelledBossesKey);
        if (storedFelledBossIdsString) {
            const storedFelledBossIds = JSON.parse(storedFelledBossIdsString);
            setFelledBossIds(storedFelledBossIds);
        }
        // Load the marked bosses from the local storage.
        const storedMarkedBossIdsString = localStorage.getItem(props.localStorageMarkedBossesKey);
        if (storedMarkedBossIdsString) {
            const storedMarkedBossIds = JSON.parse(storedMarkedBossIdsString);
            setMarkedBossIds(storedMarkedBossIds);
        }
        setIsInitializedClientSide(true);
    }, [props.bosses, props.localStorageFelledBossesKey, props.localStorageMarkedBossesKey, props.regions]);

    /** Store felled bosses changes in the local storage. */
    useEffect(() => {
        if (!isInitializedClientSide) {
            return;
        }
        const felledBossIdsString = JSON.stringify(felledBossIds);
        localStorage.setItem(props.localStorageFelledBossesKey, felledBossIdsString);
    }, [felledBossIds, isInitializedClientSide, props.localStorageFelledBossesKey]);

    /** Store marked bosses changes in the local storage. */
    useEffect(() => {
        if (!isInitializedClientSide) {
            return;
        }
        const markedBossIdsString = JSON.stringify(markedBossIds);
        localStorage.setItem(props.localStorageMarkedBossesKey, markedBossIdsString);
    }, [isInitializedClientSide, markedBossIds, props.localStorageMarkedBossesKey]);

    /**
     * Callback to mark a boss as felled or not.
     * @param {number} bossId The id of the boss to mark as felled / not felled.
     */
    const toggleFelledState = (bossId: number) => {
        const tmpFelledBossIds = [...felledBossIds];
        const alreadyExists = felledBossIds.includes(bossId);
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
        setFelledBossIds([...tmpFelledBossIds]);
    };

    /**
     * Callback to mark a boss.
     * @param {number} bossId The id of the boss to mark.
     */
    const toggleMarkedState = (bossId: number) => {
        const tmpMarkedBossIds = [...markedBossIds];
        const alreadyExists = markedBossIds.includes(bossId);
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
        setMarkedBossIds([...tmpMarkedBossIds]);
    };

    const ContextActions = (boss: IBoss) => (
        <>
            {boss.wikiReference && boss.wikiReference !== '' && (
                <Button
                    icon={<DocumentTextIcon className="h-5 w-5" />}
                    onClick={(e) => {
                        e.stopPropagation();
                        window.open(boss.wikiReference, '_blank');
                    }}
                />
            )}
            {props.fromSoftwareGame === FromSoftwareGame.EldenRing && (boss as IEldenRingBoss).wikiMapReference && (
                <Button
                    icon={<MapPinIcon className="h-5 w-5" />}
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        window.open((boss as IEldenRingBoss).wikiMapReference, '_blank');
                    }}
                />
            )}
            <Button
                icon={<FlagIcon className={`h-5 w-5 ${markedBossIds.includes(boss.id) ? 'text-red-600' : ''}`} />}
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    toggleMarkedState(boss.id);
                }}
            />
        </>
    );

    /**
     * Custom render component for a single boss.
     * @param {IBoss} boss The boss to render.
     * @returns {ReactElement} The rendered boss.
     */
    const BossRow = (boss: IBoss): ReactElement => {
        const [openContextMenu, setOpenContextMenu] = useState(false);
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
                    <div className={`flex items-center ${felledBossIds.includes(boss.id) ? 'line-through' : ''}`}>
                        <Checkbox isChecked={felledBossIds.includes(boss.id)} disabled={!isInitializedClientSide} onChange={() => toggleFelledState(boss.id)} />
                        <div className="pl-7">{boss.name}</div>
                    </div>
                    <div className="hidden xs:flex gap-4 items-center justify-between">
                        <ContextActions {...boss} />
                    </div>
                    <div className="flex xs:hidden relative">
                        <Button
                            icon={<EllipsisVerticalIcon className={`h-4 w-4 ${markedBossIds.includes(boss.id) ? 'text-red-600' : ''}`} />}
                            onClick={() => setOpenContextMenu(true)}
                        />
                        {openContextMenu && (
                            <div className="absolute flex flex-row right-full top-1/2 -translate-y-1/2 rounded-lg p-1 border border-black dark:border-white bg-white dark:bg-black">
                                <ContextActions {...boss} />
                            </div>
                        )}
                    </div>
                </>
            ),
            [boss, openContextMenu],
        );
        return (
            <div className="flex w-full items-center">
                <div className="w-full">
                    <div className="flex sm:hidden flex-row w-full gap-4 justify-between">{rowContent}</div>
                    <div className="cursor-pointer hidden sm:flex flex-row w-full gap-4 justify-between" onClick={() => toggleFelledState(boss.id)}>
                        {rowContent}
                    </div>
                </div>
            </div>
        );
    };

    /**
     * Navigates to the region directly and copies the link to the users clipboard.
     * @param {string} regionName - The name of the region to navigate to.
     * @returns Nothing.
     */
    const linkToRegion = useCallback(
        (regionName: string) => {
            let newRelUrl = `${window.location.pathname}${window.location.search}#${regionName}`;
            router.push(newRelUrl);
            navigator.clipboard.writeText(`${window.location.host}${newRelUrl}`);
            toast(props.dic['regionLinkCopied']);
        },
        [props.dic, router],
    );

    return (
        <div className="flex flex-1 flex-col overflow-auto p-10 max-w-full overflow-x-hidden">
            <div className="w-full flex justify-center mb-10">
                <h1>{title}</h1>
            </div>
            {props.regions ? (
                <div className="flex flex-col gap-10">
                    {props.regions?.map((region) => (
                        <div id={region.name} className="flex flex-col gap-4" key={`region-${region.id}-${region.name}`}>
                            <h2 className="border-b">
                                <div className="hidden sm:flex">
                                    <Button text={region.name} icon={<LinkIcon className="h-4 w-4" />} onClick={() => linkToRegion(region.name)} />
                                </div>
                                <div className="flex sm:hidden items-center">
                                    <Button icon={<LinkIcon className="h-4 w-4" />} onClick={() => linkToRegion(region.name)} />
                                    <div>{region.name}</div>
                                </div>
                            </h2>
                            {region.bosses.map((boss) => (
                                <BossRow key={`boss-${boss.id}-${boss.name}`} {...boss} />
                            ))}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col gap-4">{props.bosses?.map((boss) => <BossRow key={`boss-${boss.id}-${boss.name}`} {...boss} />)}</div>
            )}
            <div className="flex w-full mt-16">
                <Button outlined text={props.dic['gameProgress_reset_button']} fullWidth onClick={() => setIsClearDialogOpen(true)} />
            </div>
            <Dialog
                dic={props.dic}
                title={props.dic['gameProgress_reset_confirmDialog_title']}
                isDangerous
                isOpen={isClearDialogOpen}
                onClose={() => setIsClearDialogOpen(false)}
                onConfirm={() => {
                    setFelledBossIds([]);
                    setMarkedBossIds([]);
                    setIsClearDialogOpen(false);
                }}
            >
                <p>{props.dic['gameProgress_reset_confirmDialog_text']}</p>
            </Dialog>
            <div className="fixed bottom-10 right-10 z-40 flex h-24 w-24 items-center justify-center rounded-full border border-black dark:border-white bg-white dark:bg-black">
                {felledBossIds.length} / {bossCounter}
            </div>
        </div>
    );
}
