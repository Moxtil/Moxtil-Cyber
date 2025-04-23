import React, { Suspense } from "react";
import { IoStarSharp, IoCartOutline } from "react-icons/io5";
import styles from "../../products.module.css";
import Image from "next/image";
import Link from "next/link";
import { FaHashtag } from "react-icons/fa";
import noContentImg from "../../../assets/undraw_server-error_syuz.svg";
import Button from "../../../components/Button/button";
const getData = async (searchQuery) => {
  const req = await fetch(
    `https://dummyjson.com/products/search?q=${searchQuery}`
  );
  const res = await req.json();
  return res;
};
export default async function page({ params }) {
  const searchQuery = params.query;
  const products = await getData(searchQuery);

  if (products.products.length < 1) {
    return (
      <div className={styles.noContent}>
        <h1
          style={{
            textAlign: "center",
            padding: "10px",
            fontSize: "30px",
            fontFamily: "sans-serif",
          }}
        >
          No Available Items With The Search{" "}
          <span style={{ color: "red" }}>{searchQuery}</span> !
        </h1>
        <Image
          src={noContentImg}
          width={500}
          height={500}
          alt="No Available Items"
        />
      </div>
    );
  }
  return (
    <Suspense fallback={<div className="loader"></div>}>
      <div className={styles.mainContainer}>
        <div className={styles.upperSide}></div>
        <div className={styles.container}>
          <Suspense fallback={<div className="loader"></div>}>
            {products.products.map((m) => {
              return (
                <div className={styles.cardsContainer} key={m?.id}>
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
                  <Button title={"Add To Cart"} width={"100%"} />
                </div>
              );
            })}
          </Suspense>
        </div>
      </div>
    </Suspense>
  );
}
