"use client";
import React, { useContext } from "react";
import Button from "../Button/button";
import { MyCartItems } from "@/app/Context/CartContext";
import Swal from "sweetalert2";

const showSuccess = () => {
  Swal.fire({
    title: "Done!",
    text: "Item has been added",
    icon: "success",
    showConfirmButton: false,
    timer: 1200,
  });
};
export default function AddToCartButton({ item }) {
  const { addMyItem } = useContext(MyCartItems);
  return (
    <div
      onClick={() => {
        addMyItem(item);
        showSuccess();
      }}
    >
      <Button title={"Add To Cart"} />
    </div>
  );
}
