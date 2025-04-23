"use client";
import React, { useEffect, useState } from "react";
import styles from "./account.module.css";
import { useAuth } from "../Context/AuthContext";
import { FaTrashAlt, FaFileUpload } from "react-icons/fa";
import Image from "next/image";
import userImg from "../assets/user.png";
import { onAuthStateChanged, deleteUser, updateEmail } from "firebase/auth";
import { auth } from "../firebase/config";

import {
  MdOutlineVerifiedUser,
  MdErrorOutline,
  MdOutlineEmail,
  MdLogin,
  MdOutlineLockReset,
  MdOutlineDeleteOutline,
} from "react-icons/md";
import { FaHashtag, FaLock, FaUserFriends } from "react-icons/fa";

import Link from "next/link";
import { BiLogOut } from "react-icons/bi";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  const { logout } = useAuth();
  const [user, setUser] = useState(null);

  const [confirmEmail, setConfirmEmail] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const showInputPopup = async (user) => {
    const { value: inputValue } = await Swal.fire({
      title: "Enter Your Username To Confirm",
      text: "You Need To Write It Not Copy It ",
      input: "text",
      inputPlaceholder: user,
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      confirmButtonColor: "red",
      inputAttributes: {
        maxlength: 75,
        autocapitalize: "off",
        autocorrect: "off",
      },
    });

    if (inputValue == user) {
      setConfirmEmail(inputValue);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email Is Not Matching",
      });
    }
  };
  const handleDeleteAccount = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        throw new Error("No user is signed in.");
      }
      if (user.email === confirmEmail) {
        await deleteUser(user);
      }

      console.log("User account deleted.");
      // redirect to home or login
    } catch (error) {
      console.error("Error deleting user:", error);

      if (error.code === "auth/requires-recent-login") {
        alert("Please reauthenticate and try again.");
        // Optionally: show re-auth popup here
      }
    }
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        {user ? (
          <Image
            src={user.photoURL || userImg}
            alt="User Avatar"
            width={85}
            height={50}
          />
        ) : (
          <>Loading . . .</>
        )}
        {user && <h3>#{user.displayName}</h3>}
        <button className={styles.uploadBtn} onClick={() => console.log(user)}>
          <FaFileUpload /> Upload
        </button>
        {user && (
          <button
            style={
              !user.photoURL && {
                pointerEvents: "none",
                opacity: "0.6",
                borderColor: "#d7d7d7",
              }
            }
          >
            <FaTrashAlt /> Remove
          </button>
        )}
      </div>
      {user ? (
        <div className={styles.accountDets}>
          <div>
            <h3>
              <FaHashtag /> Username : {user.displayName}
            </h3>
            <h3>
              <MdOutlineEmail /> Email : {user.email}
            </h3>
            <h3>
              {user.emailVerified ? (
                <MdOutlineVerifiedUser color="green" />
              ) : (
                <MdErrorOutline color="yellow" />
              )}
              Email Is {user.emailVerified ? "Verified" : "Not Verified"}
            </h3>
          </div>
          <div>
            <h3>
              <FaLock />
              Password : ******** ,
              <Link href={"/account/resetPassword"}>
                <MdOutlineLockReset />
                Reset Password ?
              </Link>
            </h3>
            <h3>
              {" "}
              <FaUserFriends />
              Member Since {user.metadata.creationTime}
            </h3>
            <h3>
              <MdLogin />
              Last Sing In {user.metadata.lastSignInTime}
            </h3>
          </div>
        </div>
      ) : (
        <div className="loader"></div>
      )}
      <div className={styles.accountFooter}>
        <button
          className={styles.deleteAccount}
          onClick={() => {
            Swal.fire({
              title: "Do You Want To Delete This Account?",
              text: "You won't be able to revert this!",
              icon: "error",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!",
            }).then(async (result) => {
              await showInputPopup(user.email);
              setTimeout(() => {
                handleDeleteAccount();
              }, 500);
            });
          }}
        >
          <MdOutlineDeleteOutline size={23} />
          Delete Account
        </button>
        <button
          className={styles.logoutBtn}
          onClick={() => {
            Swal.fire({
              title: "Do You Want To Log Out?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, Log out!",
            }).then((result) => {
              if (result.isConfirmed) {
                logout();
                router.push("/sign-up");
              }
            });
          }}
        >
          <BiLogOut size={23} />
          Logout
        </button>
      </div>
    </div>
  );
}
