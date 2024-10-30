"use client";

import ProductModal from "@/components/product/productModal";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  ChipProps,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  Selection,
  SortDescriptor,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
  User,
} from "@nextui-org/react";
import ProductLoading from "./loading";
import { format } from "date-fns";
import Link from "next/link";
import React, { useEffect } from "react";
import { columns } from "./data/data";
import { capitalize } from "./data/utils";
import { ChevronDownIcon } from "./icons/ChevronDownIcon";
import { DeleteIcon } from "./icons/DeleteIcon";
import { EditIcon } from "./icons/EditIcon";
import { EyeIcon } from "./icons/EyeIcon";
import { PlusIcon } from "./icons/PlusIcon";
import { SearchIcon } from "./icons/SearchIcon";
import toast from "react-hot-toast";
import { Product } from "@prisma/client";
import axios from "axios";

const statusColorMap: Record<string, ChipProps["color"]> = {
  In_Stock: "primary",
  Stock_Out: "danger",
  Draft: "warning",
};

const INITIAL_VISIBLE_COLUMNS = [
  "id",
  "name",
  "price",
  "status",
  "category",
  "actions",
  "color",
  "Created_At",
];

export default function App() {
  const [Loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<Product[]>([]);
  const [count, setCount] = React.useState(10);
  const [filterValue, setFilterValue] = React.useState("");
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "createdAt",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/product?skip=${(page - 1) * rowsPerPage}&take=${rowsPerPage}`)
      .then((res) => {
        setData(res.data.data);
        setCount(res.data.count);
        console.log(res.data.data);
        setLoading(false);
      });
  }, [page, rowsPerPage]);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredProducts = [...data];

    if (hasSearchFilter) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredProducts;
  }, [filterValue, data, hasSearchFilter]);

  const pages = Math.ceil(count / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: Product, b: Product) => {
      const first = a[sortDescriptor.column as keyof Product] as number;
      const second = b[sortDescriptor.column as keyof Product] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (data: Product, columnKey: React.Key) => {
      const cellValue = data[columnKey as keyof Product];

      switch (columnKey) {
        case "id":
          return (
            <div>{data.id.substring(data.id.length, data.id.length - 5)}</div>
          );
        case "name":
          return (
            <User
              avatarProps={{ radius: "lg", src: data.images[0].url }}
              description={data.brandName}
              name={data.name}
            >
              {data.categoryName}
            </User>
          );
        case "category":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">
                {data.categoryName}
              </p>
              <p className="text-bold text-tiny capitalize text-default-400">
                {data.brandName}
              </p>
            </div>
          );
        case "Created_At":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">
                {format(data.createdAt, "MMMM dd, yyyy")}
              </p>
            </div>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={
                statusColorMap[
                  data.varients[0].color[0].stock ? "In_Stock" : "Stock_Out"
                ]
              }
              size="sm"
              variant="shadow"
            >
              {data.varients[0].color[0].stock ? "In_Stock" : "Stock_Out"}
            </Chip>
          );
        case "color":
          return (
            <div className="space-y-2">
              {data.varients.map((v, i) => (
                <div className="flex gap-2" key={i}>
                  {v.color.map((color, i) => (
                    <div
                      key={i}
                      style={{
                        backgroundColor: color.color ? color.color : "",
                      }}
                      className={`w-4 h-4 rounded-full ${
                        cellValue ? `bg-${cellValue}-100` : ""
                      }`}
                    />
                  ))}
                </div>
              ))}
            </div>
          );
        case "color":
          return (
            <div className="space-y-2">
              {data.varients.map((v, i) => (
                <div className="flex gap-2" key={i}>
                  {v.color.map((color, i) => (
                    <div key={i}>{color.stock}</div>
                  ))}
                </div>
              ))}
            </div>
          );
        case "size":
          return (
            <div className="space-y-2">
              {data.varients.map((v, i) => (
                <div className="flex gap-2" key={i}>
                  {v.size}
                </div>
              ))}
            </div>
          );
        case "actions":
          return (
            <div className="relative flex items-center justify-center gap-3">
              <Dialog>
                <DialogTrigger className="z-10">
                  <Tooltip color="primary" content="Details">
                    <span className="z-10 text-lg text-default-400 cursor-pointer active:opacity-50">
                      <EyeIcon />
                    </span>
                  </Tooltip>
                </DialogTrigger>
                <DialogContent className="w-[900px]">
                  <ProductModal product={data} />
                </DialogContent>
              </Dialog>
              <Divider className="h-5" orientation="vertical" />
              <Tooltip color="foreground" content="Edit">
                <Link href={`/product/add/${data.id}`}>
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <EditIcon />
                  </span>
                </Link>
              </Tooltip>
            </div>
          );
        default:
          if (typeof cellValue === "string" || typeof cellValue === "number") {
            return cellValue; // Valid ReactNode
          }
      }
    },
    []
  );

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              as={Link}
              href="/product/id/new"
              color="primary"
              endContent={<PlusIcon />}
            >
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center pr-5">
          <span className="text-default-400 text-small">
            Total {data.length} Products
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    data.length,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    onClear,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [page, pages, onNextPage, onPreviousPage]);

  if (Loading) {
    return <ProductLoading />;
  }
  return (
    <div className="max-w-[1200px] mx-auto px-2">
      <div>
        <Table
          aria-label="Example table with custom cells, pagination and sorting"
          isHeaderSticky
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          sortDescriptor={sortDescriptor}
          topContent={topContent}
          topContentPlacement="outside"
          color="primary"
          onSortChange={setSortDescriptor}
        >
          <TableHeader columns={headerColumns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
                allowsSorting={column.sortable}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={sortedItems}>
            {(item) => (
              <TableRow className="border border-t" key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
