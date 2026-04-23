import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap'


const montserrat = Montserrat({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Звуконетика",
  description: "Это метод управления состоянием живых систем через звук голоса человека и звучание группы",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable}`}>
      <body>
          <Container fluid style={{padding: 0}}>
                  {children}
          </Container>
          </body>
    </html>
  );
}
