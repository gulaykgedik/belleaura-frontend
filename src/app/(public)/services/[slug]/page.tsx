import type { Metadata } from "next";
import { ServiceDetail } from "@/features/services/service-detail";

export const metadata: Metadata = { title: "Hizmet Detayı" };
export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; return <ServiceDetail slug={slug}/>; }
