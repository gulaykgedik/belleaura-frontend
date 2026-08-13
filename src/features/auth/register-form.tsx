"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ApiError } from "@/types/api";
import { useAuth } from "@/hooks/use-auth";
import { destinationForRole } from "./role-routing";

export function RegisterForm() {
  const [errors,setErrors]=useState<Record<string,string>>({});const [message,setMessage]=useState("");const [pending,setPending]=useState(false);const { register }=useAuth();const router=useRouter();
  async function submit(event:FormEvent<HTMLFormElement>){event.preventDefault();setPending(true);setErrors({});setMessage("");const data=new FormData(event.currentTarget);const password=String(data.get("password"));const confirmation=String(data.get("password_confirmation"));if(password!==confirmation){setErrors({password_confirmation:"Parolalar eşleşmiyor."});setPending(false);return;}try{const user=await register({name:String(data.get("name")),email:String(data.get("email")),phone:String(data.get("phone"))||undefined,password});router.replace(destinationForRole(user.role_slug));router.refresh();}catch(error){if(error instanceof ApiError){setErrors(error.errors);setMessage(error.message);}else setMessage("Beklenmeyen bir hata oluştu.");}finally{setPending(false);}}
  return <form onSubmit={submit} className="grid gap-5"><Input id="name" name="name" label="Ad soyad" autoComplete="name" required minLength={2} error={errors.name}/><Input id="email" name="email" label="E-posta" type="email" autoComplete="email" required error={errors.email}/><Input id="phone" name="phone" label="Telefon (isteğe bağlı)" type="tel" autoComplete="tel" error={errors.phone}/><Input id="password" name="password" label="Parola" type="password" autoComplete="new-password" minLength={12} required error={errors.password}/><Input id="password_confirmation" name="password_confirmation" label="Parola tekrar" type="password" autoComplete="new-password" minLength={12} required error={errors.password_confirmation}/>{message?<p role="alert" className="rounded-xl bg-danger/10 p-3 text-sm text-danger">{message}</p>:null}<Button type="submit" disabled={pending}>{pending?"Hesap oluşturuluyor…":"Hesap oluştur"}</Button></form>;
}
