"use client";
import { RoleGuard } from "@/features/auth/role-guard";
export default function OrdersLayout({children}:{children:React.ReactNode}){return <RoleGuard allowed={["customer"]}>{children}</RoleGuard>}
