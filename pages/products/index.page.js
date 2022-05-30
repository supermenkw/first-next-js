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
import { BASE_URL } from '../../constants/GlobalConstant';

export async function getStaticProps() {
  const res = await fetch(`${BASE_URL}/gifts?page[number]=1&page[size]=9`)
  const productsData = await res.json()

  return {
    props: {
      products: productsData
    }
  }
}

export default function Products({ products }) {
  // State
  const [dataProducts, setDataProducts] = useState(products?.data)
  const [filteredData, setFilteredData] = useState([])
  const [currentPage, setCurrentPage] = useState(products?.meta?.currentPage)
  const [isLoading, setIsLoading] = useState(false)
  const [isFilteredByRating, setIsFilteredByRating] = useState(false)
  const [isFilteredByStock, setIsFilteredByStock] = useState(false)

  const handleGetProducts = async (page = 1, size = 6) => {
    const product = await GetProducts(page, size)

    if(product.status === 200) {
      const temp = [...dataProducts]
      const concatedData = temp.concat(product.data.data)

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
              <input className="form-check-input float-end rounded-0" style={{ width: '10%' }} checked={isFilteredByRating} type="checkbox" 
                onClick={() => {
                  const val = !isFilteredByRating
                  const filterStockStatus = isFilteredByStock

                  if(val && filteredData.length === 0) {
                    const tempData = [...dataProducts]
                    const filtered = tempData.filter(d => d.attributes.rating > 4)
  
                    setFilteredData(filtered)
                    setIsFilteredByRating(val)
                  } else if(val && filteredData.length !== 0) {
                    const tempData = [...filteredData]
                    const filtered = tempData.filter(d => {

                      if(filterStockStatus) return d.attributes.rating > 4 && d.attributes.stock > 0
                      else return d.attributes.rating > 4
                    })
  
                    setFilteredData(filtered)
                    setIsFilteredByRating(val)
                  } else if(!val && filterStockStatus && filteredData.length !== 0) {
                    const tempData = [...dataProducts]
                    const filtered = tempData.filter(d => {

                      return d.attributes.stock > 0
                    })
  
                    setFilteredData(filtered)
                    setIsFilteredByRating(val)
                  } else {
                    setFilteredData([])
                    setIsFilteredByRating(val)
                  }
                }}/>
            </Stack>
            <Stack direction='horizontal' gap={2}>
              <p style={{ width: '90%' }}>Stock tersedia</p>
              <input className="form-check-input float-end rounded-0" style={{ width: '10%' }} checked={isFilteredByStock} type="checkbox" 
                 onClick={() => {
                  const val = !isFilteredByStock
                  const filterRatingStatus = isFilteredByRating

                  if(val && filteredData.length === 0) {
                    const tempData = [...dataProducts]
                    const filtered = tempData.filter(d => d.attributes.stock > 0)
  
                    setFilteredData(filtered)
                    setIsFilteredByStock(val)
                  } else if(val && filteredData.length !== 0) {
                    const tempData = [...filteredData]
                    const filtered = tempData.filter(d => {

                      if(filterRatingStatus) return d.attributes.rating > 4 && d.attributes.stock > 0
                      else return d.attributes.stock > 0
                    })
  
                    setFilteredData(filtered)
                    setIsFilteredByStock(val)
                  } else if(!val && filterRatingStatus && filteredData.length !== 0) {
                    const tempData = [...dataProducts]
                    const filtered = tempData.filter(d => {

                      return d.attributes.rating > 4
                    })
  
                    setFilteredData(filtered)
                    setIsFilteredByStock(val)
                  } else {
                    setFilteredData([])
                    setIsFilteredByStock(val)
                  }
                }}/>
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
          <ListProducts dataProducts={filteredData.length !== 0 ? filteredData : dataProducts} setDataProducts={setDataProducts} />
          <Col sm={12} className='d-flex justify-content-center align-items-center mb-4'>
            <Button variant='success' className='rounded-btn w-50' disabled={isLoading}
              onClick={() => {
                setIsLoading(true)
                setCurrentPage(d => d + 1)
                setIsFilteredByRating(false)
                setIsFilteredByStock(false)
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