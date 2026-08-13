import type { Metadata } from "next";
import { RescheduleForm } from "@/features/appointments/reschedule-form";

export const metadata: Metadata = { title: "Randevuyu Yeniden Planla" };
export default async function ReschedulePage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; return <RescheduleForm id={Number(id)} />; }
