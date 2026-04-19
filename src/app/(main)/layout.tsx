
import {Container, Row, Col} from 'react-bootstrap'

// components

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Question from "@/components/Question/Question";



export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
          <Container fluid style={{padding: 0}}>
              <Header />
                  {children}
                <Question />
              <Footer />
          </Container>
  );
}
