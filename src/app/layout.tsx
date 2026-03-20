import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body-family",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display-family",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shraddha Institute of Spine & Orthopaedic Superspeciality | SISOS Sangli",
  description:
    "Sangli's first dedicated Spine & Orthopaedic Superspeciality Institute. 32+ years of excellence in orthopaedic care. NABH Accredited. Book appointments, check live OPD queue, and more.",
  keywords: [
    "orthopaedic hospital sangli",
    "spine surgery sangli",
    "SISOS",
    "shraddha hospital",
    "joint replacement sangli",
    "NABH accredited hospital sangli",
    "Dr GS Kulkarni",
  ],
  openGraph: {
    title: "Shraddha Institute of Spine & Orthopaedic Superspeciality",
    description: "Sangli's first dedicated Spine & Orthopaedic Superspeciality Institute. 32+ years of surgical excellence.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${cormorant.variable} font-body antialiased`}>
        {children}
      </body>
    </html>
  );
}
