import type { Metadata } from "next";
import { ProductBrowser } from "@/features/commerce/product-browser";
import type { ProductFilters } from "@/types/commerce";
export const metadata:Metadata={title:"Ürünler"};
export default async function ProductsPage({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}){const query=await searchParams;const value=(key:string)=>typeof query[key]==="string"?query[key] as string:undefined;const page=Math.max(1,Number(value("page"))||1);const filters:ProductFilters={search:value("search"),category:value("category"),min_price:value("min_price"),max_price:value("max_price"),in_stock:value("in_stock")==="true"?true:undefined,sort:value("sort"),page,per_page:12};return <ProductBrowser initialFilters={filters}/>;}
