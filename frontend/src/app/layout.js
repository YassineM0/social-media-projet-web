import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/authContext";
import { PostProvider } from "./context/postsContext";
<<<<<<< HEAD
import { ChakraProvider } from "@chakra-ui/react";
=======
import ChatProvider from "./context/ChatProvider";
import { ChakraProvider } from "@chakra-ui/react";
import "./layout.css"
>>>>>>> origin/Hamza_Akdim

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
<<<<<<< HEAD
        <body className={inter.className}>
      <ChakraProvider>
          <AuthProvider>
            <PostProvider>{children}</PostProvider>
          </AuthProvider>
      </ChakraProvider>
        </body>
=======
      <body className={`Layout ${inter.className}`}>
        <AuthProvider>
          <PostProvider>
            <ChatProvider>
              <ChakraProvider>{children}</ChakraProvider>
            </ChatProvider>
          </PostProvider>
        </AuthProvider>
      </body>
>>>>>>> origin/Hamza_Akdim
    </html>
  );
}
