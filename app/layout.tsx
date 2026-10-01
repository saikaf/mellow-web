import type { Metadata } from "next";
import "./globals.css";
import BackToTop from "../components/back-to-top";
const origin = process.env.NEXT_PUBLIC_SITE_URL || "https://mellow-web.youxiyede6.chatgpt.site";
const description = "個人店・小規模事業向けの、分かりやすく使いやすいホームページ制作。飲食店、美容室、教室、個人サービスなどに対応。制作料金15,000円から。";
export const metadata: Metadata = {
 metadataBase: new URL(origin),
 title: { default: "Mellow Web | 個人店・小規模事業向けのホームページ制作", template: "%s | Mellow Web" },
 description,
 openGraph: {title:"Mellow Web | 個人店・小規模事業向けのホームページ制作",description,siteName:"Mellow Web",locale:"ja_JP",type:"website"},
 twitter: {card:"summary",title:"Mellow Web",description},
 icons: {icon:"/favicon.svg",shortcut:"/favicon.svg"},
 robots: {index:true,follow:true},
};
export default function RootLayout({children}:{children:React.ReactNode}) {
 return <html lang="ja"><body><a className="skip-link" href="#main">本文へ移動</a>{children}<BackToTop/></body></html>;
}
