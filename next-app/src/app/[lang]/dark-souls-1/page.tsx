import { BossChecklist } from "@/components/organisms";
import { getDictionary } from "@/dictionaries";
import { FromSoftwareGame } from "@/enumerations";
import { getBosses } from "@/helper/darkSoulsDataHelper";
import { IPageParams } from "@/types";
import { ReactElement } from "react";

// The key in the local storage to store the users progress.
const localStorageFelledBossesKey = "darkSoulsFelledBossIds";
// The key in the local storage to store the marked bosses.
const localStorageMarkedBossesKey = "darkSoulsMarkedBossIds";

export default async function Page({
  params,
}: {
  params: Promise<IPageParams>;
}): Promise<ReactElement> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const darkSoulsBosses = getBosses();

  return (
    <>
      <BossChecklist
        dic={dict}
        fromSoftwareGame={FromSoftwareGame.DarkSouls}
        localStorageFelledBossesKey={localStorageFelledBossesKey}
        localStorageMarkedBossesKey={localStorageMarkedBossesKey}
        bosses={darkSoulsBosses}
      />
    </>
  );
}
