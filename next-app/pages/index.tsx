import { GetStaticProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect, useState } from 'react';

import PrimaryButton from '../components/base/button/primaryButton';
import Checkbox from '../components/base/checkbox';
import Dialog from '../components/base/dialog';
import Stack from '../components/base/layout/stack';
import { getRegions } from '../helper/eldenRingDataHelper';

// Get all Elden Ring regions with the boss lists.
const eldenRingRegions = getRegions();
// The key in the local storage to store the users progress.
const localStorageKey = 'eldenRingFelledBossIds';
// The counter of all bosses.
const bossCounter = eldenRingRegions.reduce((acc, region) => acc + region.bosses.length, 0);

/**
 * The page component to render at "/".
 *
 * @returns {NextPage} The home page component.
 */
const Home: NextPage = () => {
    /** Access to translations. */
    const { t } = useTranslation();

    /** Whether the page is initialized on the client or not. */
    const [isInitializedClientSide, setIsInitializedClientSide] = useState<boolean>(false);
    /** The list of the bosses the user has marked as felled. */
    const [felledBossIds, setFelledBossIds] = useState<number[]>([]);
    /** Whether the dialog to confirm clearing the progress is open or not. */
    const [isClearDialogOpen, setIsClearDialogOpen] = useState<boolean>(false);

    /** Initialize the page on client side. */
    useEffect(() => {
        // Load the users stored progress from the local storage.
        const storedFelledBossIdsString = localStorage.getItem(localStorageKey);
        if (storedFelledBossIdsString) {
            const storedFelledBossIds = JSON.parse(storedFelledBossIdsString);
            setFelledBossIds(storedFelledBossIds);
        }
        setIsInitializedClientSide(true);
    }, []);

    /** Store changes in the local storage. */
    useEffect(() => {
        if (!isInitializedClientSide) {
            return;
        }
        const felledBossIdsString = JSON.stringify(felledBossIds);
        localStorage.setItem(localStorageKey, felledBossIdsString);
    }, [felledBossIds, isInitializedClientSide]);

    return (
        <div className="flex flex-1 flex-col overflow-auto p-10">
            <Stack horizontalAlign="Center">
                <h1>Elden Ring</h1>
            </Stack>
            <Stack>
                {eldenRingRegions.map((region) => (
                    <Stack key={`region-${region.id}-${region.name}`}>
                        <h2 className="border-b border-base-content">
                            {region.id}. {region.name}
                        </h2>
                        {region.bosses.map((boss) => (
                            <Stack key={`boss-${boss.id}-${boss.name}`} horizontal horizontalAlign="SpaceBetween">
                                <div className={felledBossIds.includes(boss.id) ? 'line-through' : ''}>{boss.name}</div>
                                <Checkbox
                                    isChecked={felledBossIds.includes(boss.id)}
                                    disabled={!isInitializedClientSide}
                                    onChange={(newValue) => {
                                        const tmpFelledBossIds = [...felledBossIds];
                                        if (newValue) {
                                            // If the boss is checked, add it to the list.
                                            tmpFelledBossIds.push(boss.id);
                                        } else {
                                            // If the boss is unchecked, remove it from the list.
                                            const index = tmpFelledBossIds.indexOf(boss.id);
                                            if (index > -1) {
                                                tmpFelledBossIds.splice(index, 1);
                                            }
                                        }
                                        setFelledBossIds([...tmpFelledBossIds]);
                                    }}
                                />
                            </Stack>
                        ))}
                    </Stack>
                ))}
                <div className="mt-16 flex w-full justify-center">
                    <PrimaryButton text={t('eldenRing_reset_button')} fullWidth onClick={() => setIsClearDialogOpen(true)} />
                </div>
            </Stack>
            <Dialog
                title={t('eldenRing_reset_confirmDialog_title')}
                isDangerous
                isOpen={isClearDialogOpen}
                onClose={() => setIsClearDialogOpen(false)}
                onConfirm={() => {
                    setFelledBossIds([]);
                    setIsClearDialogOpen(false);
                }}>
                <p>{t('eldenRing_reset_confirmDialog_text')}</p>
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

export default Home;
