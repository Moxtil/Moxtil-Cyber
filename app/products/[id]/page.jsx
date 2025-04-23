import React, { Suspense } from "react";
import styles from "../products.module.css";
import ItemImages from "@/app/components/ItemImages/IteImages";
import { FiInfo, FiDollarSign } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";
import { FaTags } from "react-icons/fa";
import {
  MdStorage,
  MdOutlineLocalShipping,
  MdOutlineStorefront,
  MdOutlineSubtitles,
  MdStarRate,
} from "react-icons/md";
import { LiaTextWidthSolid } from "react-icons/lia";
import { GrValidate } from "react-icons/gr";
import { GiReturnArrow } from "react-icons/gi";
import Button from "@/app/components/Button/button";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/app/components/AddToCartButton/AddToCartButton";
import AddToFavButton from "@/app/components/AddToFavButton/AddToFavButton";

const Monts = Montserrat({
  subsets: ["latin"],
  weight: ["200", "400", "500", "600"],
});

const getData = async (id) => {
  const req = await fetch(`https://dummyjson.com/products/${id}`);
  const res = await req.json();
  return res;
};

const getSimilarItems = async (cate) => {
  const req = await fetch(`https://dummyjson.com/products/category/${cate}`);
  return await req.json();
};
export default async function page({ params }) {
  const itemId = params.id;
  const myItem = await getData(itemId);
  const similirItems = await getSimilarItems(myItem?.category);
  return (
    <Suspense fallback={<div className="loader"></div>}>
      <div className={styles.mainContainer}>
        <div className={`${styles.detailedCard} ${Monts.className}`}>
          <div className={styles.itemImages}>
            <ItemImages item={myItem} />
          </div>
          <div className={styles.itemDetails}>
            <AddToFavButton item={myItem} />
            <h2 className={styles.iconed}>
              <MdOutlineSubtitles color="gold" />
              {myItem?.title}
            </h2>
            <span>#{myItem?.sku}</span>
            <p className={styles.iconed}>
              <FaTags />
              {myItem?.brand}
            </p>
            <p className={styles.iconed}>
              <BiCategory color="green" />
              {myItem?.category}
            </p>
            <p
              className={styles.iconed}
              style={{ color: "#777", fontSize: "14px" }}
            >
              <FiInfo color="blue" />
              {myItem?.description}
            </p>
            <p className={styles.iconed}>
              <MdStorage color="purple" />
              <span>{myItem?.stock} Left In Stock</span>
            </p>
            <h3 className={styles.iconed}>
              <LiaTextWidthSolid />
              Item Dimensions
            </h3>
            <p>Width : {myItem?.dimensions?.width}</p>
            <p>Height : {myItem?.dimensions?.height}</p>
            <p>Depth : {myItem.dimensions.depth}</p>

            <p className={styles.iconed}>
              <MdOutlineLocalShipping color="orange" />
              {myItem?.shippingInformation}
            </p>
            <p className={styles.iconed}>
              <MdOutlineStorefront color="red" />
              Availability : {myItem?.availabilityStatus}
            </p>
            <p className={styles.iconed}>
              <GrValidate color="blue" />
              {myItem?.warrantyInformation}
            </p>
            <p className={styles.iconed}>
              <GiReturnArrow />
              {myItem?.returnPolicy}
            </p>
            <p className={styles.iconed} style={{ fontWeight: "700" }}>
              <MdStarRate color="gold" size={24} />
              {myItem?.rating}
            </p>
            <h3 className={styles.iconed}>
              <FiDollarSign />
              {myItem.price}
            </h3>
            <AddToCartButton item={myItem} />
          </div>
        </div>
        <h2 style={{ paddingLeft: "10px", marginBlock: "20px" }}>
          Similar Items
        </h2>
        <div className={styles.similarItemsContainer}>
          {similirItems?.products?.map((sm) => {
            return (
              <div key={sm.id} className={styles.similarItem}>
                <Link href={`/products/${sm.id}`}>
                  <Image
                    src={sm?.thumbnail}
                    alt={sm?.title || "Item"}
                    width={300}
                    height={300}
                  />
                </Link>
                <p>{sm?.title}</p>
                <div>
                  <p>${sm.price}</p>
                  <p>
                    <MdStarRate size={20} color="gold" /> {sm?.rating}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Suspense>
  );
}
