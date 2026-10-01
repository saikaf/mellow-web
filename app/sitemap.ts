export const dynamic = "force-static";
import type { MetadataRoute } from "next";
export default function sitemap():MetadataRoute.Sitemap {
 const origin=process.env.NEXT_PUBLIC_SITE_URL||"https://mellow-web.youxiyede6.chatgpt.site";
 return ["","/faq","/privacy","/terms","/legal"].map(path=>({url:origin+path,changeFrequency:"monthly",priority:path===""?1:.5}));
}
