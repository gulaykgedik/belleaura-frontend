"use client";

import { useState } from "react";
import type { InputHTMLAttributes } from "react";

export function Input({ label, error, id, type="text", ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  const [visible,setVisible]=useState(false);const password=type==="password";
  return <label className="grid gap-2 text-sm font-medium" htmlFor={id}><span>{label}</span><span className="relative"><input id={id} type={password&&visible?"text":type} aria-invalid={!!error} aria-describedby={error?`${id}-error`:undefined} className="h-12 w-full rounded-xl border bg-card px-3.5 pr-12 outline-none transition placeholder:text-muted focus:border-primary focus:ring-4 focus:ring-primary/10" {...props} />{password?<button type="button" onClick={()=>setVisible(!visible)} className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg px-2.5 py-2 text-xs font-semibold text-muted hover:bg-muted-surface" aria-label={visible?"Parolayı gizle":"Parolayı göster"}>{visible?"Gizle":"Göster"}</button>:null}</span>{error ? <span id={`${id}-error`} className="text-xs text-danger">{error}</span> : null}</label>;
}
