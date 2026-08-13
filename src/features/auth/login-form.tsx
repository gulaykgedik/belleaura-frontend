"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ApiError } from "@/types/api";
import { useAuth } from "@/hooks/use-auth";

export function LoginForm({ nextPath }: { nextPath?: string }) {
  const [errors,setErrors]=useState<Record<string,string>>({});const [message,setMessage]=useState("");const [pending,setPending]=useState(false);const { login }=useAuth();const router=useRouter();
  async function submit(event:FormEvent<HTMLFormElement>){event.preventDefault();setPending(true);setErrors({});setMessage("");const data=new FormData(event.currentTarget);try{await login({email:String(data.get("email")),password:String(data.get("password"))});const safeNext=nextPath?.startsWith("/")&&!nextPath.startsWith("//")?nextPath:null;router.replace(safeNext??"/");router.refresh();}catch(error){if(error instanceof ApiError){setErrors(error.errors);setMessage(error.message);}else setMessage("Beklenmeyen bir hata oluştu.");}finally{setPending(false);}}
  return <form onSubmit={submit} className="grid gap-5"><Input id="email" name="email" label="E-posta" type="email" autoComplete="email" placeholder="ornek@email.com" required error={errors.email}/><Input id="password" name="password" label="Parola" type="password" autoComplete="current-password" required error={errors.password}/>{message?<p role="alert" className="rounded-xl bg-danger/10 p-3 text-sm text-danger">{message}</p>:null}<Button type="submit" disabled={pending}>{pending?"Giriş yapılıyor…":"Giriş yap"}</Button></form>;
}
