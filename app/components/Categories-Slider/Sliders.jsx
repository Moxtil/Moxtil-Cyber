"use client";
import "react-multi-carousel/lib/styles.css";
import styles from "../../page.module.css";
import Carousel from "react-multi-carousel";
import {
  MdOutlinePhoneIphone,
  MdWatch,
  MdComputer,
  MdSpeaker,
} from "react-icons/md";
import { BsWatch } from "react-icons/bs";
import { FaTabletAlt } from "react-icons/fa";

import Link from "next/link";

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 4 },
  desktop: { breakpoint: { max: 1024, min: 768 }, items: 3 },
  tablet: { breakpoint: { max: 768, min: 625 }, items: 2 },
  mobile: { breakpoint: { max: 625, min: 0 }, items: 1 },
};

const CategorySlider = () => {
  return (
    <Carousel
      responsive={responsive}
      infinite={true} // Loop images
      autoPlay={true} // Auto-play enabled
      autoPlaySpeed={3000} // 3 seconds per slide
      showDots={false} // Show navigation dots
      arrows={true} // Show arrows
      className={styles.carousel}
    >
      <Link href={"/products/category/Smartphones"} className={styles.carous}>
        <MdOutlinePhoneIphone />
        <h2>Phones</h2>
      </Link>
      <Link href={"/products/category/Mens-Watches"} className={styles.carous}>
        <MdWatch />
        <h2>Men's Watches</h2>
      </Link>
      <Link
        href={"/products/category/Mobile-Accessories"}
        className={styles.carous}
      >
        <MdSpeaker />
        <h2>Accessories</h2>
      </Link>
      <Link href={"/products/category/Tablets"} className={styles.carous}>
        <FaTabletAlt />
        <h2>Tablets</h2>
      </Link>
      <Link href={"/products/category/Laptops"} className={styles.carous}>
        <MdComputer />
        <h2>Laptop</h2>
      </Link>
      <Link
        href={"/products/category/Womens-Watches"}
        className={styles.carous}
      >
        <BsWatch />
        <h2>Women's Watches</h2>
      </Link>
    </Carousel>
  );
};

export default CategorySlider;
