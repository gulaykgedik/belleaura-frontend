import type { Metadata } from "next";
import { AuthCard } from "@/features/auth/auth-card";
import { RegisterForm } from "@/features/auth/register-form";
export const metadata:Metadata={title:"Kayıt Ol"};
export default function RegisterPage(){return <div className="px-4 py-14 sm:py-20"><AuthCard title="Hesabınızı oluşturun" description="Randevu ve alışveriş deneyiminize birkaç bilgiyle başlayın." alternate={{text:"Zaten hesabınız var mı?",label:"Giriş yapın",href:"/login"}}><RegisterForm/></AuthCard></div>;}
