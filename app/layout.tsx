import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My App",
  description: "Welcome to my app",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <nav className="bg-white p-4 shadow">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">🍅Fresh Mart</Link>
            <div className="flex space-x-4">
              <Link href="/" className="hover:text-blue-600">🏡홈</Link>
              <Link href="/list" className="hover:text-blue-600">🛒상품 목록</Link>
              <Link href="#" className="hover:text-blue-600">🛒장바구니</Link>
              <Link href="#" className="hover:text-blue-600">👤마이페이지</Link>
            </div>
          </div>
        </nav>
        <main className="container mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
