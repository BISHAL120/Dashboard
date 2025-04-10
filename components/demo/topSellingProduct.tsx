"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  ChipProps,
  getKeyValue,
} from "@nextui-org/react";

import { columns, users } from "./data";
import { EyeIcon } from "@/app/(dashboard)/product/all/icons/EyeIcon";
import { EditIcon } from "@/app/(dashboard)/product/all/icons/EditIcon";
import { DeleteIcon } from "@/app/(dashboard)/product/all/icons/DeleteIcon";
import Link from "next/link";

type User = (typeof users)[0];

export default function TopSellingProduct() {
  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.category}
            name={cellValue}
          >
            {user.category}
          </User>
        );
      case "price":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              Sold : {user.sold}
            </p>
          </div>
        );
      case "revenue":
        return <p className="text-bold text-sm capitalize">{cellValue}</p>;
      case "actions":
        return (
          <div className="relative flex items-center justify-center gap-2">
            <Tooltip content="Details">
              <Link
                href={`/product/${user.id}`}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <EyeIcon />
              </Link>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table
      className=" h-[460px] flex-grow p-1 overflow-auto"
      aria-label="Example table with custom cells"
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody className="overflow-auto" items={users.slice(0, 10)}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
