import Image from "next/image";
import styles from "./page.module.css";
import IphoneImg from "./assets/Iphone Image.png";
import { Instrument_Sans } from "next/font/google";
import Link from "next/link";
import img1 from "./assets/headset.png";
import img2 from "./assets/image 36.png";
import img3 from "./assets/MacBook Pro 14.png";
import img4 from "./assets/PlayStation.png";
import Button from "./components/Button/button";
import CategorySlider from "./components/Categories-Slider/Sliders";
import { BiCategory } from "react-icons/bi";

import ShopCard from "./components/ShopCard/ShopCard";
import product1 from "./assets/Iphone 14 pro 1.png";
import product2 from "./assets/img2.png";
import product3 from "./assets/thumbnail.png";
import product4 from "./assets/heads.png";
import product5 from "./assets/watch.png";
import product6 from "./assets/galaxyTab.png";
import product7 from "./assets/airpods.png";
import product8 from "./assets/ipad.png";
import OffersSlider from "./components/OffersSlider/OffersSlider";
import bgImg from "./assets/bg.jpg";
import { Suspense } from "react";
import Loading from "./Loading";

const instru = Instrument_Sans({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <Suspense fallback={<div className="loader"></div>}>
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <div className={styles.homeLeftSide}>
            <h4>Pro.Beyond.</h4>
            <h1 className={instru.className}>
              Iphone 14 <span>Pro</span>
            </h1>
            <p>Created to change everything for the better. For everyone</p>
            <Link href={"/products"}>
              <Button
                border={"2px solid #fff"}
                color={"#fff"}
                title={"Shop Now"}
              />
            </Link>
          </div>
          <div className={styles.homeRightSide}>
            <Image
              src={IphoneImg}
              alt="Iphone 14 Pro"
              height={632}
              width={360}
            />
          </div>
        </div>
        <div className={styles.offers}>
          <div className={styles.parent}>
            <div className={styles.div1}>
              <Image src={img4} alt="Item" height={360} width={225} />
              <div className={styles.cardDetails}>
                <h3>Playstation 5</h3>
                <p>
                  Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O
                  will redefine your PlayStation experience.
                </p>
              </div>
            </div>
            <div className={styles.div2}>
              <Image src={img1} alt="Item" width={100} height={270} />
              <div className={styles.cardDetails}>
                <h1>
                  Apple AirPods <span>Max</span>
                </h1>
                <p>Computational audio. Listen, it's powerful</p>
              </div>
            </div>
            <div className={styles.div3}>
              <div className={styles.cardDetails}>
                <h1>
                  Macbook <span>Air</span>
                </h1>
                <p>
                  The new 15‑inch MacBook Air makes room for more of what you
                  love with a spacious Liquid Retina display.
                </p>
                <Link href={"/products"}>
                  <Button
                    border={"2px solid #fff"}
                    color={"#fff"}
                    title={"Shop Now"}
                  />
                </Link>
              </div>
              <Image src={img3} alt="Item" height={500} width={290} />
            </div>
            <div className={styles.div4}>
              <Image src={img2} alt="Item" width={136} height={190} />
              <div className={styles.cardDetails}>
                <h1>Apple Vision Pro</h1>
                <p>An immersive way to experience entertainment</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.categories}>
          <div className={styles.categoryBrowse}>
            <h2>Browse By Category </h2>
            <BiCategory size={35} />
          </div>
          <CategorySlider />
        </div>
        <div className={styles.products}>
          <ShopCard
            imgSrc={product1}
            price={1099.99}
            title={"Iphone 14 Pro Max"}
            productId={123}
          />
          <ShopCard
            imgSrc={product2}
            price={99.99}
            title={"Apple HomePod Mini Cosmic Grey"}
            productId={103}
          />
          <ShopCard
            imgSrc={product3}
            price={349.99}
            title={"Apple Watch Series 4 Gold"}
            productId={106}
          />
          <ShopCard
            imgSrc={product4}
            price={549.99}
            title={"Apple AirPods Max Silver"}
            productId={101}
          />
          <ShopCard
            imgSrc={product5}
            price={8999.99}
            title={"Rolex Cellini Date Black Dial"}
            productId={95}
          />
          <ShopCard
            imgSrc={product6}
            price={599.99}
            title={"Samsung Galaxy Tab S8 Plus Grey"}
            productId={160}
          />
          <ShopCard
            imgSrc={product7}
            price={129.99}
            title={"Apple Airpods"}
            productId={100}
          />
          <ShopCard
            imgSrc={product8}
            price={499.99}
            title={"iPad Mini 2021 Starlight"}
            productId={159}
          />
        </div>
        <div className={styles.moreOffers}>
          <OffersSlider />
        </div>

        <div
          className={styles.summerSale}
          style={{ backgroundImage: `url(${bgImg.src})` }}
        >
          <h1>
            Big Summer <span>Sale</span>
          </h1>
          <p>Commodo fames vitae vitae leo mauris in. Eu consequat.</p>
          <Button
            title={"Browse Now"}
            border={"2px solid #fff"}
            color={"#fff"}
          />
        </div>
      </div>
    </Suspense>
  );
}
