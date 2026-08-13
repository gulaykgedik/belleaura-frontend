import{apiRequest}from"@/lib/api/client";import type{AdminSettings}from"@/types/admin";export const settingsService={public:()=>apiRequest<AdminSettings>("/settings",{auth:false})};
