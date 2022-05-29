import {
  Navbar as BootstrapNav,
  Container,
  Nav
} from 'react-bootstrap'
import Image from 'next/image'
import Logo from '../../assets/image/logo-dummy.png'
import Link from 'next/link'

export default function Navbar() {
  return <BootstrapNav collapseOnSelect expand="lg" variant="light">
  <Container fluid>
    <Link href='/'>
      <BootstrapNav.Brand>
        <Image 
          src={Logo}
          alt='logo-company'
        />
      </BootstrapNav.Brand>
    </Link>
    <BootstrapNav.Toggle aria-controls="responsive-navbar-nav" />
    <BootstrapNav.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto">
        <Link href='/' passHref>
          <Nav.Link><h1 className='fs-6'>Home</h1></Nav.Link>
        </Link>
        <Link href='/products' passHref>
          <Nav.Link><h1 className='fs-6'>Products</h1></Nav.Link>
        </Link>
      </Nav>
    </BootstrapNav.Collapse>
  </Container>
</BootstrapNav>
}