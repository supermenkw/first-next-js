import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../constants/GlobalConstant";
import {
  Container,
  Row,
  Col,
  Dropdown,
  Stack,
  Button,
  Image as BsImage
} from 'react-bootstrap'
import Image from "next/image";
import { calculateRatingStar, defineStock, renderRibbonLabel } from "./helper/helper";
import PointImage from '../../assets/image/Group 2752@2x.png'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { FaRegHeart } from 'react-icons/fa'
import Tabs from "../../components/sections/tabs";
import { PostWishlistProduct } from "../../data/products";
import { toast } from "react-toastify";

export default function Products({ detailProducts }) {
  const router = useRouter()
  const { id } = router.query
  const [detailData, setDetailData] = useState(detailProducts?.data?.attributes)
  const stockStatus = defineStock(parseInt(detailProducts?.data?.attributes.stock))
  const ribbonVal = renderRibbonLabel(detailProducts?.data?.attributes.isNew, detailProducts?.data?.attributes.rating, detailProducts?.data?.attributes.stock, detailProducts?.data?.attributes.numOfReviews)
  const [totalBuy, setTotalBuy] = useState(0)
  const [step, setStep] = useState(1)

  let stepItem = [
    {
        title: 'Info Product',
        value: 1,
    },
    {
        title: 'Reviews',
        value: 2
    }
]

  useEffect(() => {
    console.log(detailProducts)
  }, [])

  // Render
  return <Container className='mb-5'>
    <Row>
      <Col md={12} className='mb-3 fs-6'>List Product {'>'} {detailData?.name}</Col>
      <Col md={5} className='p-3 mb-5'>
        <div className='d-flex justify-content-center align-items-center position-relative'>
          {
            ribbonVal &&
            <div className="flipping-card-ribbon">
                {
                  ribbonVal
                }
            </div>
          }
          <BsImage src={detailData.images[0]} className='w-100' alt='Image Product' />
        </div>
      </Col>
      <Col md={7}>
        <Stack gap={3}>
          <h1 className="fs-4 fw-bold">{detailData.name}</h1>
          <Stack direction='horizontal' gap={2}>
            {calculateRatingStar(detailData.rating, 20)}
            <p style={{ fontSize: '14px', color: '#838EAB' }}>{detailData.numOfReviews} reviews</p>
          </Stack>
          <Stack direction='horizontal' gap={2}>
            <Image 
              src={PointImage}
              alt='point image'
            /> {' '}
            <p className="fw-bold" style={{ fontSize: '24px', color: '#74B71B' }}>{detailData.points} points</p>
            <p className="fw-bold"  style={{ color: stockStatus.color, fontSize: '14px' }}>{stockStatus?.label}</p>
          </Stack>
          <div style={{ fontSize: '14px' }} dangerouslySetInnerHTML={{ __html: detailData.description }}></div>
          <p style={{ color: '#838EAB', fontSize: '14px' }}>Jumlah</p>
          <Stack className="mb-3" direction='horizontal' gap={3}>
            <Button className="btn-plus-minus"
              onClick={() => {
                if(totalBuy > 0) {
                  setTotalBuy(d => d - 1)
                } else {
                  setTotalBuy(0)
                }
              }}
            ><AiOutlineMinus color="#525F7F" /></Button>
            <p className="current-qty">{totalBuy}</p>
            <Button className="btn-plus-minus"
              onClick={() => {
                if(totalBuy < detailData.stock) {
                  setTotalBuy(d => d + 1)
                } else {
                  setTotalBuy(detailData.stock)
                }
              }}
            ><AiOutlinePlus color="#525F7F" /></Button>
          </Stack>
          <Stack direction='horizontal' gap={3}>
            <Button className={detailData.isWishlist === 1 ? 'wish-listed' : 'unwishlist'} style={{ width: '5rem' }}
              onClick={() => {
                const val = detailData.isWishlist === 1 ? 0 : 1

                PostWishlistProduct(detailData.id)

                if(val == 1) toast.success('successfully added to wish list')
                else toast.success('successfully remove to wish list')       
                

                setDetailData({
                  ...detailData,
                  isWishlist: val
                })
              }}
            >
            {
              detailData.isWishlist === 1 ?
              <FaRegHeart size={20} />
              :
              <FaRegHeart color='#E1E1E1' size={20} />
            }
            </Button>
            <Button className="rounded-pill" variant="outline-success" style={{ width: '8rem' }}>Reedem</Button>
            <Button className="rounded-pill" variant="outline-primary" style={{ width: '8rem' }}>Add to Cart</Button>
          </Stack>
        </Stack>
      </Col>
      <Col md={12}>
        <Tabs
          items={stepItem}
          toggle={(value) => setStep(value)}
          active={step}
        />
        <hr className="solid m-0 p-0" />
        {
          step === 1 &&
          <Stack className="mt-4" gap={4}>
            <h3 style={{ color: '#006A4E', fontSize: '20px' }}>Rincian</h3>
            <div dangerouslySetInnerHTML={{ __html: detailData.info }}></div>
          </Stack>
        }
        {
          step === 2 &&
          <Stack className="mt-4" gap={4}>
            <h3 style={{ color: '#006A4E', fontSize: '20px' }}>Reviews</h3>
            <div>Under Development</div>
          </Stack>
        }
      </Col>
    </Row>
  </Container>
}

export async function getStaticPaths() {
  const res = await fetch(`${BASE_URL}/gifts?page[number]=1&page[size]=999`)
  const productsData = await res.json()

  const paths = productsData?.data.map(item => ({
    params: {
      id: item.id
    }
  }))

  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps(context) {
  const id = context.params.id
  const res = await fetch(`${BASE_URL}/gifts/${id}`)
  const productData = await res.json()

  return {
    props: {
      detailProducts: productData
    }
  }
}