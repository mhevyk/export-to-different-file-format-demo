type Currency = "USD" | "EUR" | "UAH";
type OrderStatus = "Paid" | "Pending" | "Cancelled";

export type Order = {
  id: number;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  createdAt: string;
  status: OrderStatus;
  currency: Currency;
  amount: number;
};
