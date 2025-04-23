"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { Inknut_Antiqua } from "next/font/google";
import {
  FaRegHeart,
  FaRegUser,
  FaHeart,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { HiMenuAlt1, HiMenu } from "react-icons/hi";
import { Dialog } from "@headlessui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useAuth } from "@/app/Context/AuthContext";
const logoFont = Inknut_Antiqua({
  subsets: ["latin"],
  weight: ["700"],
});
export default function Navbar() {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [mobileMode, setMobileMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const path = usePathname();

  if (!user) {
    return;
  } else
    return (
      <nav className="navbar">
        <div className="nav-logo">
          <Link href={"/"} className={logoFont.className}>
            Cyber
          </Link>
        </div>
        <div className="search-box">
          <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="search-dialog"
          >
            <div className="overlay" aria-hidden="true" />
            <div className="dialog-container">
              <Dialog.Panel className="dialog-panel">
                <Dialog.Title className="dialog-title">Search</Dialog.Title>
                <input
                  type="text"
                  placeholder="Search"
                  value={searchInput}
                  className="search-input"
                  onChange={(e) => setSearchInput(e.target.value)}
                />

                <div className="search-buttons">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="close-button"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      if (searchInput !== "") {
                        if (!path.includes("products/")) {
                          router.push("/products");
                          setTimeout(() => {
                            router.push(`products/search/${searchInput}`);
                          }, 1);
                          setSearchInput("");
                        } else if (path.includes(`products/search/`)) {
                          router.push(`${searchInput}`);
                        } else {
                          router.push(`search/${searchInput}`);
                        }
                      } else {
                        Swal.fire("Search Input Is Empty!");
                      }
                    }}
                    className="submit-button"
                  >
                    Search
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </Dialog>
        </div>
        <ul
          className="navbar-list"
          style={mobileMode ? { maxHeight: "500px" } : { maxHeight: "0px" }}
        >
          <Link href={"/"} className={path == "/" ? "active" : ""}>
            Home
          </Link>
          <Link
            href={"/products"}
            className={path.includes("/products") ? "active" : ""}
          >
            Products
          </Link>
          <Link
            href={"/contact"}
            className={path == "/contact" ? "active" : ""}
          >
            Contact Us
          </Link>
          <div className="icons-div">
            <Link href={"/fav-items"}>
              {path == "/fav-items" ? (
                <FaHeart color="red" size={20} />
              ) : (
                <FaRegHeart size={20} />
              )}
            </Link>
            <Link href={"/cart"}>
              {path == "/cart" ? (
                <FaShoppingCart color="orange" size={20} />
              ) : (
                <FiShoppingCart size={20} />
              )}
            </Link>
            <Link href={"/account"}>
              {path == "/account" ? (
                <FaUser size={20} color="gold" />
              ) : (
                <FaRegUser size={20} />
              )}
            </Link>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="search-icon-button"
          >
            <CiSearch size={24} fontWeight={700} />
          </button>
        </ul>
        <div className="menu" onClick={() => setMobileMode(!mobileMode)}>
          {mobileMode ? <HiMenu size={27} /> : <HiMenuAlt1 size={27} />}
        </div>
      </nav>
    );
}
