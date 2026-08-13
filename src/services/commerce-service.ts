import { apiRequest } from "@/lib/api/client";
import type { Address, AddressPayload, Cart, Category, Order, Payment, PaymentInitialize, PaymentMethod, Product, ProductFilters, ProductPage } from "@/types/commerce";
import type { Paginated } from "@/types/appointment";

function query(params:object):string{const search=new URLSearchParams();for(const[key,value]of Object.entries(params))if(value!==undefined&&value!=="")search.set(key,String(value));const value=search.toString();return value?`?${value}`:"";}
function cartUpdated(cart:Cart){if(typeof window!=="undefined")window.dispatchEvent(new CustomEvent("cart:updated",{detail:cart}));return cart;}
export const commerceService={
  categories:()=>apiRequest<Category[]>("/categories",{auth:false}),
  products:(filters:ProductFilters)=>apiRequest<ProductPage>(`/products${query(filters)}`,{auth:false}),
  product:(slug:string)=>apiRequest<Product>(`/products/${encodeURIComponent(slug)}`,{auth:false}),
  cart:()=>apiRequest<Cart>("/cart"),
  addCart:(productId:number,quantity:number)=>apiRequest<Cart>("/cart/items",{method:"POST",body:{product_id:productId,quantity}}).then(cartUpdated),
  updateCart:(itemId:number,quantity:number)=>apiRequest<Cart>(`/cart/items/${itemId}`,{method:"PATCH",body:{quantity}}).then(cartUpdated),
  removeCart:(itemId:number)=>apiRequest<Cart>(`/cart/items/${itemId}`,{method:"DELETE"}).then(cartUpdated),
  clearCart:()=>apiRequest<Cart>("/cart",{method:"DELETE"}).then(cartUpdated),
  addresses:()=>apiRequest<Address[]>("/addresses"),
  createAddress:(payload:AddressPayload)=>apiRequest<Address>("/addresses",{method:"POST",body:payload}),
  checkout:(payload:{address_id:number;payment_method:PaymentMethod;coupon_code?:string;customer_note?:string})=>apiRequest<Order>("/checkout",{method:"POST",body:payload}),
  orders:(page=1)=>apiRequest<Paginated<Order>>(`/orders${query({page,per_page:12})}`),
  order:(id:number)=>apiRequest<Order>(`/orders/${id}`),
  cancelOrder:(id:number)=>apiRequest<Order>(`/orders/${id}/cancel`,{method:"PATCH",body:{}}),
  initializePayment:(orderId:number)=>apiRequest<PaymentInitialize>("/payments/initialize",{method:"POST",body:{order_id:orderId}}),
  payment:(id:number)=>apiRequest<Payment>(`/payments/${id}`),
};

export function mediaUrl(path?:string|null):string|null{if(!path)return null;if(/^https?:\/\//i.test(path))return path;const api=(process.env.NEXT_PUBLIC_API_URL??"http://localhost:8000/api").replace(/\/api\/?$/,"").replace(/\/$/,"");return `${api}/${path.replace(/^\//,"")}`;}
