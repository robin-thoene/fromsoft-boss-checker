'use client';

import { ChevronDownIcon, ChevronUpIcon, LinkIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { Button } from '@/components/atoms';
import { BossRow, Dialog, GameProgressIndicator } from '@/components/molecules';
import { FromSoftwareGame } from '@/enumerations/fromSoftwareGame';
import { IBoss, IDictionary, IRegion } from '@/types';

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
    /** The key to use for retrieving / saving the ID's of the regions marked as collapsed by the user. */
    localStorageCollapsedRegionsKey?: string;
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
    /** State of the region id's that are marked as collapsed */
    const [collapsedRegions, setCollapsedRegions] = useState<number[]>([]);

    const toggleRegionCollapseState = useCallback(
        (regionId: number) => {
            const newState = [...collapsedRegions];
            const idx = newState.findIndex((id) => id === regionId);
            if (idx !== -1) {
                newState.splice(idx, 1);
            } else {
                newState.push(regionId);
            }
            setCollapsedRegions(newState);
        },
        [collapsedRegions],
    );

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
        // Load the as collapsed marked regions from the local storage.
        if (props.localStorageCollapsedRegionsKey && props.regions) {
            const storedMarkedRegionIdsString = localStorage.getItem(props.localStorageCollapsedRegionsKey);
            if (storedMarkedRegionIdsString) {
                const storedRegionIds = JSON.parse(storedMarkedRegionIdsString);
                setCollapsedRegions(storedRegionIds);
            }
        }
        // Set the state to indicate that the client side initialization is done.
        setIsInitializedClientSide(true);
    }, [props.bosses, props.localStorageCollapsedRegionsKey, props.localStorageFelledBossesKey, props.localStorageMarkedBossesKey, props.regions]);

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

    /** Store marked collapsed region changes in the local storage. */
    useEffect(() => {
        if (!isInitializedClientSide || !props.regions || !props.localStorageCollapsedRegionsKey) {
            return;
        }
        const collapsedRegionsString = JSON.stringify(collapsedRegions);
        localStorage.setItem(props.localStorageCollapsedRegionsKey, collapsedRegionsString);
    }, [collapsedRegions, isInitializedClientSide, markedBossIds, props.localStorageCollapsedRegionsKey, props.localStorageMarkedBossesKey, props.regions]);

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

    const RegionCollapseButton = useCallback(
        ({ regionId }: { regionId: number }) => (
            <Button
                icon={collapsedRegions.includes(regionId) ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
                onClick={() => toggleRegionCollapseState(regionId)}
            />
        ),
        [collapsedRegions, toggleRegionCollapseState],
    );

    return (
        <div className="flex flex-1 flex-col overflow-auto p-10 max-w-full overflow-x-hidden">
            <div className="w-full flex justify-center mb-10">
                <h1>{title}</h1>
            </div>
            {props.regions ? (
                <div className="flex flex-col gap-10">
                    {props.regions?.map((region) => (
                        <div id={region.name} className={`flex flex-col gap-4`} key={`region-${region.id}-${region.name}`}>
                            <h2 className="border-b">
                                <div className="hidden sm:flex items-center">
                                    <div className="w-full">
                                        <Button text={region.name} icon={<LinkIcon className="h-4 w-4" />} onClick={() => linkToRegion(region.name)} />
                                    </div>
                                    <RegionCollapseButton regionId={region.id} />
                                </div>
                                <div className="flex sm:hidden items-center">
                                    <div className="w-full flex flex-row items-center">
                                        <Button icon={<LinkIcon className="h-4 w-4" />} onClick={() => linkToRegion(region.name)} />
                                        <div>{region.name}</div>
                                    </div>
                                    <RegionCollapseButton regionId={region.id} />
                                </div>
                            </h2>
                            <div className={`flex flex-col overflow-hidden ${collapsedRegions.includes(region.id) ? 'h-0' : 'h-full'}`}>
                                {region.bosses.map((boss) => (
                                    <BossRow
                                        key={`boss-${boss.id}-${boss.name}`}
                                        boss={boss}
                                        fromSoftwareGame={props.fromSoftwareGame}
                                        markedBossIds={markedBossIds}
                                        updateMarkedBossIds={setMarkedBossIds}
                                        felledBossIds={felledBossIds}
                                        updateFelledBossIds={(bossIds) => {
                                            if (region.bosses.every((b) => bossIds.includes(b.id))) {
                                                // All bosses of this region are now marked as checked, add the region id to the state of checked regions.
                                                if (!collapsedRegions.includes(region.id)) {
                                                    const newCollapsedRegions = [...collapsedRegions];
                                                    newCollapsedRegions.push(region.id);
                                                    setCollapsedRegions(newCollapsedRegions);
                                                }
                                            }
                                            setFelledBossIds(bossIds);
                                        }}
                                        isInitialized={isInitializedClientSide}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {props.bosses?.map((boss) => (
                        <BossRow
                            key={`boss-${boss.id}-${boss.name}`}
                            boss={boss}
                            fromSoftwareGame={props.fromSoftwareGame}
                            markedBossIds={markedBossIds}
                            updateMarkedBossIds={setMarkedBossIds}
                            felledBossIds={felledBossIds}
                            updateFelledBossIds={setFelledBossIds}
                            isInitialized={isInitializedClientSide}
                        />
                    ))}
                </div>
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
            <GameProgressIndicator totalAmount={bossCounter} felledCount={felledBossIds.length} />
        </div>
    );
}
