import { RoleGuard } from "@/features/auth/role-guard";
import { SidebarShell, type SidebarItem } from "@/components/layout/sidebar-shell";

const items:SidebarItem[]=[{label:"Dashboard",href:"/admin"},{label:"Randevular",href:"/admin/appointments"},{label:"Müşteriler",href:"/admin/customers"},{label:"Personeller",href:"/admin/staff"},{label:"Hizmetler",href:"/admin/services"},{label:"Sliderlar",href:"/admin/sliders"},{label:"Bannerlar",href:"/admin/banners"},{label:"Ürünler",href:"/admin/products"},{label:"Kategoriler",href:"/admin/categories"},{label:"Siparişler",href:"/admin/orders"},{label:"Kuponlar",href:"/admin/coupons"},{label:"Ödemeler",href:"/admin/payments"},{label:"Bildirimler",href:"/admin/notifications"},{label:"Ayarlar",href:"/admin/settings"}];
export default function AdminLayout({children}:{children:React.ReactNode}){return <RoleGuard allowed={["admin","super_admin"]}><SidebarShell title="Yönetim Paneli" items={items} adminTheme>{children}</SidebarShell></RoleGuard>;}
