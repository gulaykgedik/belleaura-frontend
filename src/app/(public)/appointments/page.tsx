import type { Metadata } from "next";
import { AppointmentList } from "@/features/appointments/appointment-list";

export const metadata: Metadata = { title: "Randevularım" };
export default function AppointmentsPage() { return <AppointmentList />; }
