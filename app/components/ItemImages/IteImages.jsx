"use client";
import styles from "../../products/[id]/page";
import { useState } from "react";
import Image from "next/image";

export default function ItemImages({ item }) {
  const [mainImg, setMainImg] = useState(item?.images[0]);
  return (
    <div className={styles.itemImg}>
      <Image
        src={mainImg}
        alt={item.title}
        width={250}
        height={200}
        onClick={() => console.log(item)}
        style={{ opacity: "1", objectFit: "contain" }}
      />
      <div className={styles.smallImgs}>
        {item.images?.map((im) => {
          return (
            <Image
              onClick={() => setMainImg(im)}
              key={im}
              src={im}
              alt={item.title}
              width={80}
              height={80}
              style={
                mainImg == im
                  ? {
                      opacity: "1",
                      border: "2px solid #333",
                      borderRadius: "8px",
                      boxShadow: "0 0 6px #222",
                    }
                  : { opacity: "0.6", cursor: "pointer" }
              }
            />
          );
        })}
      </div>
    </div>
  );
}
