"use client";

import React from "react";

import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown";

const AddButton = () => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="shadow" color="primary">
          Add{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 1024 1024"
          >
            <path
              fill="currentColor"
              d="M831.872 340.864L512 652.672L192.128 340.864a30.59 30.59 0 0 0-42.752 0a29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728a30.59 30.59 0 0 0-42.752 0z"
            />
          </svg>
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem className="text-primary" color="primary" key="product">
          Add Product
        </DropdownItem>
        <DropdownItem className="text-primary" color="primary" key="blog">
          Add Blog
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default AddButton;
