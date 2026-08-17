import type { Paginated } from "./appointment";

export interface Category { id:number; name:string; slug:string; description:string|null }
export interface ProductImage { media_id:number; path:string; original_name:string; mime_type:string }
export interface Product { id:number; category_id:number|null; category_name:string|null; category_slug:string|null; sku:string; name:string; slug:string; short_description:string|null; description:string|null; price:string; sale_price:string|null; stock_quantity:number; track_stock:number|boolean; is_active:number|boolean; image_path?:string|null; image?:ProductImage|null }
export interface ProductFilters { search?:string; category?:string; min_price?:string; max_price?:string; in_stock?:boolean; sort?:string; page?:number; per_page?:number }
export interface CartItem { id:number; product_id:number; quantity:number; name:string; slug:string; sku:string; price:string; sale_price:string|null; stock_quantity:number; track_stock:number|boolean; is_active:number|boolean; unit_price:string; line_total:string }
export interface Cart { id:number; items:CartItem[]; subtotal:string }
export interface Address { id:number; user_id:number; title:string; full_name:string; phone:string; country:string; city:string; district:string; address_line:string; postal_code:string|null; is_default:number|boolean }
export interface AddressPayload { title:string; full_name:string; phone:string; country:string; city:string; district:string; address_line:string; postal_code?:string; is_default:boolean }
export interface OrderItem { id:number; product_id:number; sku_snapshot:string; product_name_snapshot:string; unit_price:string; quantity:number; line_total:string }
export type PaymentMethod="iyzico"|"bank_transfer"|"cash_on_delivery";
export interface PaymentInstructions { bank_name:string; account_name:string; iban:string; reference:string }
export interface Order { id:number; order_no:string; customer_id:number; status:string; payment_status:string; payment_method:PaymentMethod; subtotal:string; discount_total:string; shipping_total:string; grand_total:string; currency:string; shipping_snapshot:string|Address; shipping_company:string|null; tracking_number:string|null; tracking_url:string|null; shipped_at:string|null; customer_note:string|null; placed_at:string; cancelled_at:string|null; created_at:string; items?:OrderItem[]; payment_instructions?:PaymentInstructions }
export interface PaymentInitialize { paymentPageUrl:string|null; checkoutFormContent:string|null; token:string; payment_id:number }
export interface Payment { id:number; order_id:number; provider:string; payment_method:PaymentMethod; amount:string; currency:string; status:"pending"|"paid"|"failed"|"cancelled"|"refunded"; failure_reason:string|null; paid_at:string|null; created_at:string }
export interface PublicCoupon { id:number; code:string; type:"percentage"|"fixed"; value:string; minimum_order_amount:string|null; expires_at:string|null }
export type ProductPage = Paginated<Product>;
