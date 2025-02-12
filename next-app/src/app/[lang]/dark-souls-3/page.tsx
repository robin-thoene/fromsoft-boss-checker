import { BossChecklist } from "@/components/organisms";
import { getDictionary } from "@/dictionaries";
import { FromSoftwareGame } from "@/enumerations";
import { getBosses } from "@/helper/darkSouls3DataHelper";
import { IPageParams } from "@/types";
import { ReactElement } from "react";

// The key in the local storage to store the users progress.
const localStorageFelledBossesKey = "darkSouls3FelledBossIds";
// The key in the local storage to store the marked bosses.
const localStorageMarkedBossesKey = "darkSouls3MarkedBossIds";

export default async function Page({
  params,
}: {
  params: Promise<IPageParams>;
}): Promise<ReactElement> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const darkSouls3Bosses = getBosses();

  return (
    <>
      <BossChecklist
        dic={dict}
        fromSoftwareGame={FromSoftwareGame.DarkSouls3}
        localStorageFelledBossesKey={localStorageFelledBossesKey}
        localStorageMarkedBossesKey={localStorageMarkedBossesKey}
        bosses={darkSouls3Bosses}
      />
    </>
  );
}
