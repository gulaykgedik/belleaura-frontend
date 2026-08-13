import { RoleGuard } from "@/features/auth/role-guard";
import { SidebarShell, type SidebarItem } from "@/components/layout/sidebar-shell";
const items:SidebarItem[]=[{label:"Dashboard",href:"/staff"},{label:"Randevularım",href:"/staff/appointments"},{label:"Hizmetlerim",href:"/staff/services"},{label:"Çalışma Saatlerim",href:"/staff/working-hours"},{label:"İzin Günlerim",href:"/staff/days-off"}];
export default function StaffLayout({children}:{children:React.ReactNode}){return <RoleGuard allowed={["staff"]}><SidebarShell title="Personel Paneli" items={items}>{children}</SidebarShell></RoleGuard>;}
