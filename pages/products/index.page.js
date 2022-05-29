import { useEffect, useState } from 'react';
import { GetProducts } from '../../data/products';
import {
  Container,
  Row,
  Col,
  Dropdown,
  Stack,
  Button
} from 'react-bootstrap'
import { toast } from 'react-toastify';
import ListProducts from './sections/ListProducts';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export async function getStaticProps() {
  const res = await fetch(`${BASE_URL}/gifts?page[number]=1&page[size]=9`)
  const productJson = await res.json()

  return {
    props: {
      products: productJson
    }
  }
}

export default function Products({ products }) {
  // State
  const [dataProducts, setDataProducts] = useState(products?.data)
  const [currentPage, setCurrentPage] = useState(products?.meta?.currentPage)
  const [isLoading, setIsLoading] = useState(false)

  const handleGetProducts = async (page = 1, size = 6) => {
    const product = await GetProducts(page, size)

    if(product.status === 200) {
      const temp = [...dataProducts]
      const concatedData = temp.concat(product.data.data)

      console.log(concatedData)

      setDataProducts(concatedData)
    } else {
      toast.error('Failed to fetch data.')
    }

    setIsLoading(false)
  }

  useEffect(() => {
    if(currentPage !== 1) handleGetProducts(currentPage)
  }, [currentPage])

  // Render
  return <Container fluid>
    <Row className='ms-5 me-5 mt-5'>
      <Col sm={12} md={2}>
        <Row style={{ minHeight: '4em' }}>
          <Col className='ps-0'>
            <h2 className='fs-5'>Filter</h2>
          </Col>
          <hr className='solid solid mt-2'></hr>
        </Row>
        <Row className='box-filter'>
          <Col>
            <Stack direction='horizontal' className='mb-2' gap={2}>
              <p style={{ width: '90%' }}>Rating 4 ke atas</p>
              <input className="form-check-input float-end rounded-0" style={{ width: '10%' }} type="checkbox"/>
            </Stack>
            <Stack direction='horizontal' gap={2}>
              <p style={{ width: '90%' }}>Stock tersedia</p>
              <input className="form-check-input float-end rounded-0" style={{ width: '10%' }} type="checkbox" />
            </Stack>
          </Col>
        </Row>
      </Col>
      <Col style={{ maxWidth: '2rem' }}></Col>
      <Col sm={12} md={9}>
        <Row>
          <Col md={8} className='ps-0'>
            <h2 className='fs-5 m-0'>Product List</h2>
          </Col>
          <Col md={4}>
            <Stack direction="horizontal" gap={3}>
              <h3 className='fs-6 m-0'>Urutkan</h3>
              <Dropdown className='w-100'>
                <Dropdown.Toggle variant="success" id="dropdown-basic" className='bg-white w-100' style={{ borderRadius: '1.5rem', borderColor: '#9D9D9D', color: '#9D9D9D' }}>
                  Terbaru
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Terbaru</Dropdown.Item>
                  <Dropdown.Item href="#/action-1">Termurah</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Stack>
          </Col>
          <hr className='solid mt-2'></hr>
        </Row>
        <Row>
          <ListProducts dataProducts={dataProducts} />
          <Col sm={12} className='d-flex justify-content-center align-items-center mb-4'>
            <Button variant='success' className='rounded-btn w-50' disabled={isLoading}
              onClick={() => {
                setIsLoading(true)
                setCurrentPage(d => d + 1)
              }}
            >
              {
                isLoading ? 'Loading...' : 'View More'
              }
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  </Container>;
}