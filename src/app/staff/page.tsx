import type { Metadata } from "next";
import { StaffDashboard } from "@/features/staff/staff-dashboard";
export const metadata:Metadata={title:"Personel Dashboard"};
export default function StaffPage(){return <StaffDashboard/>}
