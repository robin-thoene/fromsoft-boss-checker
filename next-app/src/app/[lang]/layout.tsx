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
          type="image/x-icon"
          href="/static/img/favicon/favicon.ico"
        />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/static/img/favicon/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/static/img/favicon/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/static/img/favicon/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/static/img/favicon/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/static/img/favicon/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/static/img/favicon/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/static/img/favicon/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/static/img/favicon/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/static/img/favicon/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/static/img/favicon/android-icon-192x192.png"
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
          sizes="16x16"
          href="/static/img/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/static/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
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
