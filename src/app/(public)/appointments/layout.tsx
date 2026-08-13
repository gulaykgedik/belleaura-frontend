import { RoleGuard } from "@/features/auth/role-guard";
export default function CustomerAppointmentsLayout({children}:{children:React.ReactNode}){return <RoleGuard allowed={["customer","staff","admin","super_admin"]}>{children}</RoleGuard>;}
