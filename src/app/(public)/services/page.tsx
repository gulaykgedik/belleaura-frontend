import type { Metadata } from "next";
import { ServicesBrowser } from "@/features/services/services-browser";

export const metadata: Metadata = { title: "Hizmetler", description: "Lotus Güzellik bakım hizmetleri" };
export default async function ServicesPage({searchParams}:{searchParams:Promise<{category?:string}>}){const{category}=await searchParams;return <ServicesBrowser key={category??"all"} initialCategorySlug={category}/>;}
