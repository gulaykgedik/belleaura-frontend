import {apiRequest} from "@/lib/api/client";import type{HomepageBanner,HomepageSlide}from"@/types/homepage";import type{PublicCoupon}from"@/types/commerce";
export const homepageService={slides:()=>apiRequest<HomepageSlide[]>("/home/slides",{auth:false}),banners:()=>apiRequest<HomepageBanner[]>("/home/banners",{auth:false}),coupons:()=>apiRequest<PublicCoupon[]>("/home/coupons",{auth:false})};
