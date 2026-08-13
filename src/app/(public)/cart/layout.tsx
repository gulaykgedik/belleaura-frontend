"use client";
import { RoleGuard } from "@/features/auth/role-guard";
export default function CartLayout({children}:{children:React.ReactNode}){return <RoleGuard allowed={["customer","staff","admin","super_admin"]}>{children}</RoleGuard>}
