import { DocumentTextIcon, FlagIcon, MapPinIcon } from '@heroicons/react/24/solid';
import { GetStaticProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect, useState } from 'react';

import IconButton from '../components/base/button/iconButton';
import PrimaryButton from '../components/base/button/primaryButton';
import Checkbox from '../components/base/checkbox';
import Dialog from '../components/base/dialog';
import Stack from '../components/base/layout/stack';
import { getRegions } from '../helper/eldenRingDataHelper';
import { IEldenRingBoss } from '../types';

// Get all Elden Ring regions with the boss lists.
const eldenRingRegions = getRegions();
// The key in the local storage to store the users progress.
const localStorageFelledBossesKey = 'eldenRingFelledBossIds';
// The key in the local storage to store the marked bosses.
const localStorageMarkedBossesKey = 'markedBossIds';
// The counter of all bosses.
const bossCounter = eldenRingRegions.reduce((acc, region) => acc + region.bosses.length, 0);

/**
 * The page component to render at "/elden-ring".
 *
 * @returns {NextPage} The Elden Ring page component.
 */
const EldenRing: NextPage = () => {
    /** Access to translations. */
    const { t } = useTranslation();

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
        // Load the users stored progress from the local storage.
        const storedFelledBossIdsString = localStorage.getItem(localStorageFelledBossesKey);
        if (storedFelledBossIdsString) {
            const storedFelledBossIds = JSON.parse(storedFelledBossIdsString);
            setFelledBossIds(storedFelledBossIds);
        }
        // Load the marked bosses from the local storage.
        const storedMarkedBossIdsString = localStorage.getItem(localStorageMarkedBossesKey);
        if (storedMarkedBossIdsString) {
            const storedMarkedBossIds = JSON.parse(storedMarkedBossIdsString);
            setMarkedBossIds(storedMarkedBossIds);
        }
        setIsInitializedClientSide(true);
    }, []);

    /** Store felled bosses changes in the local storage. */
    useEffect(() => {
        if (!isInitializedClientSide) {
            return;
        }
        const felledBossIdsString = JSON.stringify(felledBossIds);
        localStorage.setItem(localStorageFelledBossesKey, felledBossIdsString);
    }, [felledBossIds, isInitializedClientSide]);

    /** Store marked bosses changes in the local storage. */
    useEffect(() => {
        if (!isInitializedClientSide) {
            return;
        }
        const markedBossIdsString = JSON.stringify(markedBossIds);
        localStorage.setItem(localStorageMarkedBossesKey, markedBossIdsString);
    }, [isInitializedClientSide, markedBossIds]);

    /**
     * Callback to mark a boss as felled or not.
     *
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
     *
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

    return (
        <div className="flex flex-1 flex-col overflow-auto p-10">
            <Stack horizontalAlign="Center">
                <h1>Elden Ring</h1>
            </Stack>
            <Stack>
                {eldenRingRegions.map((region) => (
                    <Stack key={`region-${region.id}-${region.name}`}>
                        <h2 className="border-b border-base-content">{region.name}</h2>
                        {region.bosses.map((boss) => {
                            // Cast the boss to the Elden Ring boss interface.
                            const eldenRingBoss = boss as IEldenRingBoss;
                            // Return the rendered boss as row.
                            return (
                                <div
                                    className="flex h-12 w-full cursor-pointer items-center"
                                    key={`boss-${eldenRingBoss.id}-${eldenRingBoss.name}`}
                                    onClick={() => toggleFelledState(eldenRingBoss.id)}
                                    onContextMenu={(e) => {
                                        e.preventDefault();
                                        toggleMarkedState(eldenRingBoss.id);
                                    }}>
                                    <div className="w-full">
                                        <Stack horizontal horizontalAlign="SpaceBetween">
                                            <div className={`relative flex items-center ${felledBossIds.includes(eldenRingBoss.id) ? 'line-through' : ''}`}>
                                                {markedBossIds.includes(eldenRingBoss.id) && <FlagIcon className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-red-600" />}
                                                <div className="pl-7">{eldenRingBoss.name}</div>
                                            </div>
                                            <div className="flex w-40 items-center justify-between">
                                                <div className="mr-9">
                                                    <Checkbox
                                                        isChecked={felledBossIds.includes(eldenRingBoss.id)}
                                                        disabled={!isInitializedClientSide}
                                                        onChange={() => toggleFelledState(eldenRingBoss.id)}
                                                    />
                                                </div>
                                                {eldenRingBoss.wikiReference && eldenRingBoss.wikiReference !== '' && (
                                                    <IconButton
                                                        icon={<DocumentTextIcon className="h-5 w-5" />}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            window.open(eldenRingBoss.wikiReference, '_blank');
                                                        }}
                                                    />
                                                )}
                                                {eldenRingBoss.wikiMapReference && eldenRingBoss.wikiMapReference !== '' && (
                                                    <IconButton
                                                        icon={<MapPinIcon className="h-5 w-5" />}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            window.open(eldenRingBoss.wikiMapReference, '_blank');
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        </Stack>
                                    </div>
                                </div>
                            );
                        })}
                    </Stack>
                ))}
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

/**
 * Server side executed method to inject properties into the component.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStaticProps: GetStaticProps = async ({ locale }: { [key: string]: any }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
};

export default EldenRing;
