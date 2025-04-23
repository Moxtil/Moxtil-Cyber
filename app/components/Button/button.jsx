import Link from "next/link";
import React from "react";

export default function Button({ title, border, color, width }) {
  return (
    <button
      style={{ border: `${border}`, color: `${color}`, width: `${width}` }}
      className="styled-button"
    >
      {title}
    </button>
  );
}
