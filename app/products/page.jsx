"use client";
import Swal from "sweetalert2";
import React, { Suspense, useEffect, useState, useContext } from "react";
import { IoStarSharp, IoCartOutline } from "react-icons/io5";
import styles from "./products.module.css";
import Image from "next/image";
import Link from "next/link";
import { FaRegHeart, FaHashtag, FaHeart } from "react-icons/fa";
import Button from "../components/Button/button";
import { MyCartItems } from "../Context/CartContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

export default function page() {
  const showSuccess = () => {
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Item has been added",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  const categories = [
    "laptops",
    "tablets",
    "smartphones",
    "mens-watches",
    "mobile-accessories",
    "womens-watches",
  ];
  const { addMyItem, toggleFavorite, user } = useContext(MyCartItems);

  const [products, setProducts] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);

  const loadFavorites = async (user) => {
    if (!user) return;

    const favRef = collection(db, "users", user.email, "favorite-items");
    const snapshot = await getDocs(favRef);

    const ids = snapshot.docs.map((doc) => doc.data().product.id);
    setFavoriteIds(ids);
  };

  useEffect(() => {
    if (user) {
      loadFavorites(user);
    }
  }, [user]);

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const responses = await Promise.all(
          categories.map((cat) =>
            fetch(`https://dummyjson.com/products/category/${cat}`).then(
              (res) => res.json()
            )
          )
        );

        const combined = responses.flatMap((res) => res.products);
        setProducts(combined);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchAllCategories();
  }, []);

  if (!user) {
    return <div className="loader"></div>;
  } else
    return (
      <div className={styles.mainContainer}>
        <div className={styles.upperSide}></div>
        <div className={styles.container}>
          {products.map((m) => {
            const isFavorite = favoriteIds.includes(m.id);

            return (
              <div className={styles.cardsContainer} key={m?.id}>
                <div
                  className={styles.cardTop}
                  onClick={async () => {
                    await toggleFavorite(user, m);
                    loadFavorites(user); // refresh UI after toggle
                  }}
                >
                  {isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
                </div>
                <Link href={`/products/${m?.id}`}>
                  <Image
                    src={m?.thumbnail}
                    alt={m?.title}
                    width={250}
                    height={200}
                  />
                </Link>
                <div className={styles.cardDesc}>
                  <p>
                    <FaHashtag />
                    {m?.title}
                  </p>
                  <h3>${m?.price}</h3>
                  <p>
                    <IoStarSharp size={22} color="gold" />
                    {m?.rating}
                  </p>
                </div>
                <div
                  onClick={() => {
                    addMyItem(m);
                    showSuccess();
                  }}
                >
                  <Button title={"Add To Cart"} width={"100%"} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
}
