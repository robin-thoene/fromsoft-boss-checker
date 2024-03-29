import { DocumentTextIcon, FlagIcon, MapPinIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'next-i18next';
import React, { FunctionComponent, ReactElement, useEffect, useMemo, useState } from 'react';

import { FromSoftwareGame } from '../../enumerations';
import { IBoss, IEldenRingBoss } from '../../types';
import IconButton from '../base/button/iconButton';
import PrimaryButton from '../base/button/primaryButton';
import Checkbox from '../base/checkbox';
import Dialog from '../base/dialog';
import Stack from '../base/layout/stack';
import { IBossChecklistPageProps } from './properties';

/**
 * Standardized page component for the boss checklist of a single FromSoftware game.
 * @param {IBossChecklistPageProps} props The properties for the component.
 * @returns {ReactElement} The rendered component.
 */
const BossChecklistPage: FunctionComponent<IBossChecklistPageProps> = (props): ReactElement => {
    /** Access to translations. */
    const { t } = useTranslation();

    /** The page title. */
    const title = useMemo(() => {
        switch (props.fromSoftwareGame) {
            case FromSoftwareGame.DarkSouls:
                return 'Dark Souls';
            case FromSoftwareGame.DarkSouls2:
                return 'Dark Souls II';
            case FromSoftwareGame.DarkSouls3:
                return 'Dark Souls III';
            case FromSoftwareGame.Bloodborne:
                return 'Bloodborne';
            case FromSoftwareGame.Sekiro:
                return 'Sekiro';
            case FromSoftwareGame.EldenRing:
                return 'Elden Ring';
            case FromSoftwareGame.DemonSouls:
                return 'Demon Souls';
            default:
                return '';
        }
    }, [props.fromSoftwareGame]);

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

    /**
     * Custom render component for a single boss.
     * @param {IBoss} boss The boss to render.
     * @returns {ReactElement} The rendered boss.
     */
    const BossRow = (boss: IBoss): ReactElement => (
        <div
            className="flex h-12 w-full cursor-pointer items-center hover:rounded-lg hover:bg-base-200"
            onClick={() => toggleFelledState(boss.id)}
            onContextMenu={(e) => {
                e.preventDefault();
                toggleMarkedState(boss.id);
            }}>
            <div className="w-full">
                <Stack horizontal horizontalAlign="SpaceBetween">
                    <div className={`relative flex items-center ${felledBossIds.includes(boss.id) ? 'line-through' : ''}`}>
                        {markedBossIds.includes(boss.id) && <FlagIcon className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-red-600" />}
                        <div className="pl-7">{boss.name}</div>
                    </div>
                    <div className="flex w-40 items-center justify-between">
                        <div className="mr-9">
                            <Checkbox
                                ariaLabel={
                                    (felledBossIds.includes(boss.id) ? t('uncheckBossAriaLabel', { bossName: boss.name }) : t('checkBossAriaLabel', { bossName: boss.name })) ??
                                    undefined
                                }
                                isChecked={felledBossIds.includes(boss.id)}
                                disabled={!isInitializedClientSide}
                                onChange={() => toggleFelledState(boss.id)}
                            />
                        </div>
                        {boss.wikiReference && boss.wikiReference !== '' && (
                            <IconButton
                                ariaLabel={t('openWikiAriaLabel', { bossName: boss.name }) ?? undefined}
                                icon={<DocumentTextIcon className="h-5 w-5" />}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(boss.wikiReference, '_blank');
                                }}
                            />
                        )}
                        {props.fromSoftwareGame === FromSoftwareGame.EldenRing && (boss as IEldenRingBoss).wikiMapReference && (
                            <IconButton
                                ariaLabel={t('openMapAriaLabel', { bossName: boss.name }) ?? undefined}
                                icon={<MapPinIcon className="h-5 w-5" />}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    window.open((boss as IEldenRingBoss).wikiMapReference, '_blank');
                                }}
                            />
                        )}
                    </div>
                </Stack>
            </div>
        </div>
    );

    return (
        <div className="flex flex-1 flex-col overflow-auto p-10">
            <Stack horizontalAlign="Center">
                <h1>{title}</h1>
            </Stack>
            <Stack>
                {props.regions?.map((region) => (
                    <Stack key={`region-${region.id}-${region.name}`}>
                        <h2 className="border-b border-base-content">{region.name}</h2>
                        {region.bosses.map((boss) => (
                            <BossRow key={`boss-${boss.id}-${boss.name}`} {...boss} />
                        ))}
                    </Stack>
                ))}
                {props.bosses?.map((boss) => <BossRow key={`boss-${boss.id}-${boss.name}`} {...boss} />)}
                <div className="mt-16 flex w-full justify-center">
                    <PrimaryButton text={t('gameProgress_reset_button')} fullWidth onClick={() => setIsClearDialogOpen(true)} />
                </div>
            </Stack>
            <Dialog
                title={t('gameProgress_reset_confirmDialog_title')}
                isDangerous
                isOpen={isClearDialogOpen}
                onClose={() => setIsClearDialogOpen(false)}
                onConfirm={() => {
                    setFelledBossIds([]);
                    setMarkedBossIds([]);
                    setIsClearDialogOpen(false);
                }}>
                <p>{t('gameProgress_reset_confirmDialog_text')}</p>
            </Dialog>
            <div className="fixed bottom-10 right-10 z-50 flex h-24 w-24 items-center justify-center rounded-full border border-base-content bg-base-300">
                {felledBossIds.length} / {bossCounter}
            </div>
        </div>
    );
};

export default BossChecklistPage;
