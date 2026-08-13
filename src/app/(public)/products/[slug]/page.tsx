import type { Metadata } from "next";
import { ProductDetail } from "@/features/commerce/product-detail";
export const metadata:Metadata={title:"Ürün Detayı"};
export default async function ProductPage({params}:{params:Promise<{slug:string}>}){const{slug}=await params;return <ProductDetail slug={slug}/>;}
