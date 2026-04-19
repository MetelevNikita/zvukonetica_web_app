
import { Container } from 'react-bootstrap'





export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
          <Container fluid style={{padding: 0}}>
                  {children}
          </Container>
  );
}
