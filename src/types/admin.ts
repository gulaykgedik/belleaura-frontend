import type { PaginationMeta } from "./appointment";
export interface AdminPage<T>{items:T[];meta:PaginationMeta}
export interface AdminSettings{business_name:string;short_description:string;logo_url:string;favicon_url:string;primary_color:string;secondary_color:string;background_color:string;accent_color:string;text_color:string;card_background:string;default_theme:"light"|"dark";contact_email:string;contact_phone:string;whatsapp:string;address:string;city:string;google_maps_url:string;instagram_url:string;facebook_url:string;youtube_url:string;tiktok_url:string;twitter_url:string;monday_open:string;monday_close:string;tuesday_open:string;tuesday_close:string;wednesday_open:string;wednesday_close:string;thursday_open:string;thursday_close:string;friday_open:string;friday_close:string;saturday_open:string;saturday_close:string;sunday_open:string;sunday_close:string;seo_title:string;meta_description:string;seo_keywords:string;og_image_url:string;footer_description:string;copyright_text:string;footer_phone:string;footer_email:string}
export type AdminRecord=Record<string,unknown>&{id:number};
export interface DashboardStats{customers:number;staff:number;active_services:number;today_appointments:number;pending_appointments:number;orders:number;paid_orders:number;today_revenue:number}
export interface RevenuePeriod{today:number;month:number;total:number}
export interface RevenueRange{date_from:string;date_to:string;products:number;appointments:number;total:number}
export interface RevenueChartItem{date:string;products:number;appointments:number;total:number}
export interface RevenueSummary{products:RevenuePeriod;appointments:RevenuePeriod;totals:RevenuePeriod;pending_payment_amount:number;range:RevenueRange;chart:RevenueChartItem[]}
export interface NotificationLog{created_at:string;event_type:string;channel:"sms"|"email"|"whatsapp";recipient:string;status:string;attempt_count:number;sent_at:string|null;error:string}
export interface NotificationOverview{providers:Record<string,{name:string;configured:boolean}>;settings:Record<string,string>;items:NotificationLog[]}
