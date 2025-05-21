import Link from "next/link";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#222",
        color: "#fff",
        padding: "40px 20px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {/* Brand Section */}
        <div style={{ flex: "1 1 250px", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "24px", color: "#fff" }}>Cyber</h2>
          <p style={{ color: "#ccc", lineHeight: "1.6" }}>
            Cyber is a digital frontier exploring the intersection of
            technology, security, and innovation.
          </p>
        </div>

        {/* Quick Links Section */}
        <div style={{ flex: "1 1 150px", marginBottom: "20px" }}>
          <h3 style={{ fontSize: "18px", color: "#fff", marginBottom: "10px" }}>
            Quick Links
          </h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li>
              <Link href="#" style={{ color: "#ccc", textDecoration: "none" }}>
                Home
              </Link>
            </li>
            <li>
              <Link href="#" style={{ color: "#ccc", textDecoration: "none" }}>
                About
              </Link>
            </li>
            <li>
              <Link href="#" style={{ color: "#ccc", textDecoration: "none" }}>
                Services
              </Link>
            </li>
            <li>
              <Link href="#" style={{ color: "#ccc", textDecoration: "none" }}>
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div style={{ flex: "1 1 200px", marginBottom: "20px" }}>
          <h3 style={{ fontSize: "18px", color: "#fff", marginBottom: "10px" }}>
            Contact Us
          </h3>
          <p style={{ color: "#ccc" }}>Email: support@cyber.com</p>
          <p style={{ color: "#ccc" }}>Phone: +1 234 567 890</p>
        </div>
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: "30px",
          color: "#666",
          fontSize: "14px",
        }}
      >
        &copy; {new Date().getFullYear()} Cyber. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
