import { BossChecklist } from "@/components/organisms";
import { getDictionary } from "@/dictionaries";
import { FromSoftwareGame } from "@/enumerations";
import { getBosses } from "@/helper/darkSouls2DataHelper";
import { IPageParams } from "@/types";
import { ReactElement } from "react";

// The key in the local storage to store the users progress.
const localStorageFelledBossesKey = "darkSouls2FelledBossIds";
// The key in the local storage to store the marked bosses.
const localStorageMarkedBossesKey = "darkSouls2MarkedBossIds";

export default async function Page({
  params,
}: {
  params: Promise<IPageParams>;
}): Promise<ReactElement> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const darkSouls2Bosses = getBosses();

  return (
    <>
      <BossChecklist
        dic={dict}
        fromSoftwareGame={FromSoftwareGame.DarkSouls2}
        localStorageFelledBossesKey={localStorageFelledBossesKey}
        localStorageMarkedBossesKey={localStorageMarkedBossesKey}
        bosses={darkSouls2Bosses}
      />
    </>
  );
}
