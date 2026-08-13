import type { Metadata } from "next";
import { AppointmentWizard } from "@/features/appointments/appointment-wizard";
export const metadata:Metadata={title:"Yeni Randevu"};
export default function NewAppointmentPage(){return <AppointmentWizard/>;}
