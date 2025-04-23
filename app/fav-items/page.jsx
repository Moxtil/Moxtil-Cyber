"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./page.module.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { MyCartItems } from "../Context/CartContext";
import Image from "next/image";
import notFoundImg from "../assets/undraw_page-not-found_6wni.svg";
import emptyList from "../assets/undraw_wishlist_0k5w.svg";
import { FaHeart } from "react-icons/fa";
import Swal from "sweetalert2";
import Link from "next/link";
export default function page() {
  const { toggleFavorite, user } = useContext(MyCartItems);

  const [favoriteItems, setFavoriteItems] = useState([]);

  const loadFavorites = async (user) => {
    if (!user) return;

    const favRef = collection(db, "users", user.email, "favorite-items");
    const snapshot = await getDocs(favRef);

    const items = snapshot.docs.map((doc) => doc.data().product);
    setFavoriteItems(items);
  };

  useEffect(() => {
    if (user) {
      loadFavorites(user);
    }
  }, [user]);

  {
    !user && <div className="loader"></div>;
  }
  return (
    <div className={styles.mainContainer}>
      {favoriteItems.length > 0 && <h1>FAVORITES</h1>}
      {favoriteItems.length < 1 ? (
        <div className={styles.emptyList}>
          <h2>You Have No Favorite Items!</h2>
          <Image
            src={emptyList}
            alt="Empty Wishlist"
            width={375}
            height={375}
          />
        </div>
      ) : (
        <div className={styles.container}>
          {favoriteItems.map((fa) => {
            return (
              <div className={styles.item} key={fa.id}>
                <Link href={`/products/${fa.id}`}>
                  <Image
                    src={fa?.images[0] || notFoundImg}
                    alt="Item"
                    width={300}
                    height={300}
                  />
                </Link>
                <div>
                  <p>{fa.title}</p>
                  <FaHeart
                    size={20}
                    color="red"
                    cursor={"pointer"}
                    onClick={async () => {
                      await toggleFavorite(user, fa);
                      Swal.fire({
                        title: "Done!",
                        text: "Item Is Not On Your Favorite List!",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false,
                      });
                      loadFavorites(user);
                    }}
                  />
                </div>
                <div>
                  <p>{fa?.brand}</p>
                  <h4>${fa?.price}</h4>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
