"use client";
import "react-multi-carousel/lib/styles.css";
import styles from "../../page.module.css";
import Carousel from "react-multi-carousel";
import Link from "next/link";
import Image from "next/image";
import Button from "../Button/button";
import img1 from "../../assets/Cam.png";
import img2 from "../../assets/ipads.png";
import img3 from "../../assets/Samasung.png";
import img4 from "../../assets/Macbook 1.png";
import img5 from "../../assets/PlayStation.png";
import img6 from "../../assets/heads.png";
const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 4 },
  desktop: { breakpoint: { max: 1024, min: 768 }, items: 3 },
  tablet: { breakpoint: { max: 768, min: 625 }, items: 2 },
  mobile: { breakpoint: { max: 625, min: 0 }, items: 1 },
};

const OffersSlider = ({ imgSrc, title, desc }) => {
  return (
    <Carousel
      responsive={responsive}
      infinite={true} // Loop images
      autoPlay={true} // Auto-play enabled
      autoPlaySpeed={2000} // 3 seconds per slide
      showDots={true} // Show navigation dots
      arrows={true} // Show arrows
      draggable={true}
      swipeable={true}
      className={styles.OffersCarousel}
    >
      <Link href={"/products"} className={styles.offersCarous}>
        <Image src={img1} alt="Shop-Now" width={225} height={225} />
        <h2>{"Cinema Camera"}</h2>
        <p>
          {
            "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use."
          }
        </p>
        <Button title={"Shop Now"} />
      </Link>
      <Link href={"/products"} className={styles.offersCarous}>
        <Image src={img2} alt="Shop-Now" width={225} height={225} />
        <h2>Ipad Pro</h2>
        <p>
          iPad combines a magnificent 10.2-inch Retina display, incredible
          performance, multitasking and ease of use.
        </p>
        <Button title={"Shop Now"} />
      </Link>
      <Link href={"/products"} className={styles.offersCarous}>
        <Image src={img3} alt="Shop-Now" width={225} height={225} />
        <h2>Samsung Galaxy </h2>
        <p>
          iPad combines a magnificent 10.2-inch Retina display, incredible
          performance, multitasking and ease of use.
        </p>
        <Button title={"Shop Now"} />
      </Link>
      <Link href={"/products"} className={styles.offersCarous}>
        <Image src={img4} alt="Shop-Now" width={225} height={225} />
        <h2>Macbook Pro</h2>
        <p>
          iPad combines a magnificent 10.2-inch Retina display, incredible
          performance, multitasking and ease of use.
        </p>
        <Button title={"Shop Now"} />
      </Link>
      <Link href={"/products"} className={styles.offersCarous}>
        <Image src={img5} alt="Shop-Now" width={225} height={225} />
        <h2>PlayStation 5</h2>
        <p>
          iPad combines a magnificent 10.2-inch Retina display, incredible
          performance, multitasking and ease of use.
        </p>
        <Button title={"Shop Now"} />
      </Link>
      <Link href={"/products"} className={styles.offersCarous}>
        <Image src={img6} alt="Shop-Now" width={225} height={225} />
        <h2>AirPods Max Silve </h2>
        <p>
          iPad combines a magnificent 10.2-inch Retina display, incredible
          performance, multitasking and ease of use.
        </p>
        <Button title={"Shop Now"} />
      </Link>
    </Carousel>
  );
};

export default OffersSlider;
