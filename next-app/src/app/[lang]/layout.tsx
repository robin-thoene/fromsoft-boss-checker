import "../globals.css";
import { SideNav } from "@/components/molecules";
import { getDictionary } from "@/dictionaries";
import { IPageParams } from "@/types";
import type { Metadata } from "next";
import { ReactElement, ReactNode } from "react";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const metaTitle = "fromsoft-boss-checker";
const metaDesc = "Checklist for bosses of popular FromSoftware games.";

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDesc,
  openGraph: {
    title: metaTitle,
    description: metaDesc,
  },
  verification: {
    google: "9jnA_rAxxb5B8dnl-yvKFsd0Mq1sxsv5rEZnFy963bQ",
  },
};

/**
 * The root layout that wraps all route component with multi language support
 */
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<IPageParams>;
}>): Promise<ReactElement> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <html lang={lang}>
      <head>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/static/img/favicon/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/static/img/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/static/img/favicon/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="256x256"
          href="/static/img/favicon/favicon-256x256.png"
        />
      </head>
      <body className="dark:bg-black dark:text-white flex flex-row overflow-hidden h-screen">
        <SideNav currentLang={lang} dic={dict} />
        <main className="flex flex-1 max-h-screen h-full flex-col">
          <div className="flex flex-1 overflow-auto h-full">{children}</div>
        </main>
        <ToastContainer
          closeButton={false}
          toastClassName="!bg-white dark:!bg-black border border-black dark:border-white text-red-200 !text-black dark:!text-white"
          closeOnClick
          autoClose={3000}
          transition={Slide}
          hideProgressBar
        />
      </body>
    </html>
  );
}
