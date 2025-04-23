import React, { Suspense } from "react";
import styles from "./contact.module.css";
import Image from "next/image";
import mainImg from "../assets/undraw_modern-design_yur1.svg";
import { MdContactPhone, MdPhoneInTalk } from "react-icons/md";

export default function page() {
  return (
    <Suspense fallback={<div className="loader"></div>}>
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <div>
            <h1>Get In Touch</h1>
            <p>
              Want To Get In Touch? We'd Love To Hear From You . Here's How You
              Can Reach Us .
            </p>
          </div>
          <div>
            <Image src={mainImg} alt="Contact Us" width={350} height={350} />
          </div>
        </div>
        <div className={styles.contactCards}>
          <div>
            <MdPhoneInTalk />
            <h3>Talk To Sales</h3>
            <p>
              Want To Ask About Something ? Just Pick Up The Phone To Chat With
              Our Sales Team
            </p>
            <span>+1 234 5678 9000</span>
          </div>
          <div>
            <MdContactPhone />
            <h3>Contact Customer Support</h3>
            <p>
              Facing Problem ? Start A Chat With Our Customer Support To Get It
              Solved .
            </p>
            <button>Contact Support</button>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
