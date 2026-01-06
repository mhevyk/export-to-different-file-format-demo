import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import ordersData from "@/data/orders.json";
import type { Order } from "@/types/order";

export const useOrdersTable = () => {
  const columnHelper = createColumnHelper<Order>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        cell: (info) => info.getValue(),
        header: "Id",
      }),
      columnHelper.accessor("orderNumber", {
        cell: (info) => info.getValue(),
        header: "Order Number",
      }),
      columnHelper.accessor("customerName", {
        cell: (info) => info.getValue(),
        header: "Customer Name",
      }),
      columnHelper.accessor("customerEmail", {
        cell: (info) => info.getValue(),
        header: "Customer Email",
      }),
      columnHelper.accessor("createdAt", {
        cell: (info) => info.getValue(),
        header: "Created At",
      }),
      columnHelper.accessor("status", {
        cell: (info) => info.getValue(),
        header: "Status",
      }),
      columnHelper.accessor("currency", {
        cell: (info) => info.getValue(),
        header: "Currency",
      }),
      columnHelper.accessor("amount", {
        cell: (info) => info.getValue(),
        header: "Amount",
      }),
    ],
    [columnHelper]
  );

  return {
    data: ordersData as Order[],
    columns,
  };
};
