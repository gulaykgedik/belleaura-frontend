import type { Metadata } from "next";
import { AuthCard } from "@/features/auth/auth-card";
import { LoginForm } from "@/features/auth/login-form";
export const metadata:Metadata={title:"Giriş"};
export default async function LoginPage({searchParams}:{searchParams:Promise<{next?:string}>}){const{next}=await searchParams;return <div className="px-4 py-14 sm:py-20"><AuthCard title="Tekrar hoş geldiniz" description="Randevularınızı ve siparişlerinizi yönetmek için giriş yapın." alternate={{text:"Hesabınız yok mu?",label:"Kayıt olun",href:"/register"}}><LoginForm nextPath={next}/></AuthCard></div>;}
