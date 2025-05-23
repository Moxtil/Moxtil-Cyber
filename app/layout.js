import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/navbar";
import AuthProvider from "./Context/AuthContext";
import Routing from "./Context/routing";
import CartContext from "./Context/CartContext";
import AOSProvider from "./Context/AOS";
import HomeWrapper from "./Context/HomeWrapper";
import Footer from "./components/Footer/Footer";

const inter = Montserrat({
  subsets: ["latin"],
  weight: ["200", "400", "500", "600"],
});

export const metadata = {
  title: "Moxtil-Cyber E-commerce",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Routing>
          <CartContext>
            <AOSProvider>
              <AuthProvider>
                <HomeWrapper>
                  <Navbar />
                  {children}
                  <Footer />
                </HomeWrapper>
              </AuthProvider>
            </AOSProvider>
          </CartContext>
        </Routing>
      </body>
    </html>
  );
}
