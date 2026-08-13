import type { Metadata } from "next";
import { AppointmentDetail } from "@/features/appointments/appointment-detail";

export const metadata: Metadata = { title: "Randevu Detayı" };
export default async function AppointmentDetailPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; return <AppointmentDetail id={Number(id)} />; }
