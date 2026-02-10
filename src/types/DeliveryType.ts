export type DeliveryInfoDraft = {
    tenantId?: number;
    cartId: number;
    addressId?: number;
    userId?: number;
    canLeaveAtDoor?: boolean;
    deliveryType: "DELIVERY" | "PICKUP";
    deliveryDate?: Date | null;
    deliveryPeriod?: string | null;
};