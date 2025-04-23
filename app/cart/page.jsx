"use client";
import Swal from "sweetalert2";
import Image from "next/image";
import styles from "./cart.module.css";
import { Suspense, useContext, useEffect, useState } from "react";
import img from "../assets/undraw_empty-cart_574u.svg";
import Link from "next/link";
import { IoMdPricetags } from "react-icons/io";
import { FaTrashAlt, FaTag } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { MyCartItems } from "../Context/CartContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
// Main Component Function
export default function page() {
  // Cart Related Items Function
  const { items, loadItems, setUser, deleteItem, total, user } =
    useContext(MyCartItems);
  // Loader OnLoad

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) loadItems(user.email);
    });
    return () => unsub();
  }, []);

  if (!user) return <div className="loader"></div>;

  return (
    <div>
      <div className={styles.topHeading}>
        <h3>
          Shopping Cart <LuShoppingCart />
        </h3>
        <h3>
          <span>Total : ${total}</span>
        </h3>
      </div>
      {items.length === 0 ? (
        <div className={styles.emptyCart}>
          <h3>Your Shopping Cart Is Empty !</h3>
          <Image src={img} alt="Empty Cart" width={350} height={400} />
        </div>
      ) : (
        <div className={styles.cart}>
          <Suspense fallback={<div className="loader"></div>}>
            {items.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <Link href={`/products/${item.product.id}`}>
                  <Image
                    src={item?.product?.thumbnail}
                    alt={item.product.title}
                    width={150}
                    height={150}
                  />
                </Link>
                <div className={styles.cartItemDetails}>
                  <h4>
                    <IoMdPricetags size={17} />
                    {item.product.title}
                  </h4>
                  <p className={styles.cartItemPrice}>${item.product.price}</p>

                  {/* <div className={styles.cartItemAmount}>
              
                  </div> */}
                  <button
                    className={styles.cartItemDelete}
                    onClick={() => {
                      Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          deleteItem(item.id);
                          // decreaseTotal(item.product.price);
                          Swal.fire({
                            title: "Deleted!",
                            text: "Item has been deleted.",
                            icon: "success",
                            timer: 800,
                            showConfirmButton: false,
                          });
                        }
                      });
                    }}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            ))}
          </Suspense>
        </div>
      )}
      {items.length >= 1 && (
        <div className={styles.cartSummary}>
          <h2>Summary</h2>
          <div>
            <div className={styles.promoSide}>
              <input type="text" placeholder="Enter Promo Code" />
              <button>Apply</button>
            </div>
            <div className={styles.cartSubtotal}>
              <div>
                <p>Total Items</p>
                <p>{items.length}</p>
              </div>
              <div>
                <p>Subtotal</p>
                <p>${total}</p>
              </div>
              <div>
                <p>TAX</p>
                <p>$0.00</p>
              </div>
              <div>
                <h3>Order Total</h3>
                <h3>${total}</h3>
              </div>
            </div>
            <button>Proceed To Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}
