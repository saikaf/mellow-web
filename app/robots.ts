export const dynamic = "force-static";
import type { MetadataRoute } from "next";
export default function robots():MetadataRoute.Robots {
 const origin=process.env.NEXT_PUBLIC_SITE_URL||"https://mellow-web.youxiyede6.chatgpt.site";
 return {rules:{userAgent:"*",allow:"/",disallow:"/samples/"},sitemap:origin+"/sitemap.xml"};
}
