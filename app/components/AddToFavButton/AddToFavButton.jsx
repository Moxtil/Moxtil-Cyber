"use client";
import React, { useContext, useEffect, useState } from "react";
import Button from "../Button/button";
import { MyCartItems } from "@/app/Context/CartContext";
import Swal from "sweetalert2";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { FaRegHeart, FaHeart } from "react-icons/fa";
const showSuccess = () => {
  Swal.fire({
    title: "Done!",
    text: "Item has been added",
    icon: "success",
    showConfirmButton: false,
    timer: 1200,
  });
};

export default function AddToFavButton({ item }) {
  const [favoriteIds, setFavoriteIds] = useState([item.id]);

  const { toggleFavorite, user } = useContext(MyCartItems);
  const loadFavorites = async (user) => {
    if (!user) return;

    const favRef = collection(db, "users", user.email, "favorite-items");
    const snapshot = await getDocs(favRef);

    const ids = snapshot.docs.map((doc) => doc.data().product.id);
    console.log(ids);

    setFavoriteIds(ids);
  };
  useEffect(() => {
    loadFavorites(user);
  }, [favoriteIds]);
  const isFavorite = favoriteIds.includes(item.id);
  return (
    <div
      onClick={async () => {
        await toggleFavorite(user, item);
        loadFavorites(user);
      }}
    >
      {isFavorite ? (
        <FaHeart color="red" cursor={"pointer"} size={24} />
      ) : (
        <FaRegHeart cursor={"pointer"} size={24} />
      )}
    </div>
  );
}
