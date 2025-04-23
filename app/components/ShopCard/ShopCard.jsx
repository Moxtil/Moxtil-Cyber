import React from "react";
import styles from "../../page.module.css";
import Image from "next/image";
import Button from "../Button/button";
import Link from "next/link";
export default function ShopCard({ imgSrc, price, title, productId }) {
  return (
    <div className={styles.shopCard}>
      <Image width={160} height={160} src={imgSrc} alt="Shop-Now" />
      <h4>{title}</h4>
      <h3>${price}</h3>
      <Link href={`/products/${productId}`}>
        <Button color={"#333"} title={"Buy Now"} border={"2px solid #333"} />
      </Link>
    </div>
  );
}
