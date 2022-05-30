import {
  Col,
  Stack,
  Card,
  Button
} from 'react-bootstrap'
import { FaRegHeart } from 'react-icons/fa'
import Image from 'next/image';
import PointImage from '../../../assets/image/Group 2752.png'
import { SOLD_OUT } from '../../../constants/GlobalConstant';
import Link from 'next/link';
import { PostWishlistProduct } from '../../../data/products';
import { toast } from 'react-toastify';

export default function CardProduct({ item, stockStatus, ribbonStatus, ratingStatus, setDataProducts, data, index }) {

  return <Col sm={6} md={4} xxl={3} className='d-flex justify-content-center mb-4'>
    <Card style={{ width: '18rem', padding: '0.8rem', borderRadius: '0.5rem' }}>
    <div className={`card__overlay ${stockStatus.label === SOLD_OUT ? 'sold-out-overlay' : 'available-overlay'}`}>
      {
        stockStatus.label !== SOLD_OUT &&
        <div className="overlay__text">
          <h3 className='fs-5'>{item?.attributes?.name}</h3>
          <Link href={`/products/${item.id}`}>
            <Button className='mt-5 rounded-btn button-view-detail'>View Detail</Button>
          </Link>
        </div>
      }
    </div>
      {
        ribbonStatus &&
        <div className="flipping-card-ribbon">
            {
              ribbonStatus
            }
        </div>
      }
      <Card.Title style={{ zIndex: 2 }}>
        <h3 
          className={`stock-label ${stockStatus.label !== SOLD_OUT && 'in-stock-hover'}`}
          style={{ color: stockStatus.color }}>
            {stockStatus.label}
        </h3>
      </Card.Title>
      <Card.Img variant="top" className='product-img-on-list' src={item?.attributes?.images[0]} />
      <Card.Body className='ps-0 pe-0'>
        <Card.Title style={{ fontSize: '16px' }}>{item?.attributes?.name}</Card.Title>
        <Stack direction="horizontal" gap={2}>
          <div style={{ width: '70%' }}>
            <div style={{ color: '#74B71B', fontSize: '14px' }}>
              <Image 
                src={PointImage}
                alt='point image'
              /> {' '}
              {item?.attributes?.points} points</div>
            <Stack direction="horizontal" gap={1} className='mt-2'>
              {ratingStatus}
              <p style={{ fontSize: '12px', color: '#838EAB' }}>{item?.attributes?.numOfReviews} reviews</p>
            </Stack>
          </div>
          <div style={{ width: '30%', zIndex: 2 }}>
            <Button className={item?.attributes?.isWishlist === 1 ? 'wish-listed' : 'unwishlist'}
              onClick={() => {
                const tempData= [...data]
                const val = item?.attributes?.isWishlist === 1 ? 0 : 1

                PostWishlistProduct(item.id)

                if(val == 1) toast.success('successfully added to wish list')
                else toast.success('successfully remove to wish list')  

                const newVal = {
                  ...tempData[index],
                  attributes: {
                    ...tempData[index].attributes,
                    isWishlist: val
                  }
                }

                tempData[index] = newVal

                setDataProducts(tempData)
              }}
            >
            {
              item?.attributes?.isWishlist === 1 ?
              <FaRegHeart size={20} />
              :
              <FaRegHeart color='#E1E1E1' size={20} />
            }
            </Button>
          </div>
        </Stack>
      </Card.Body>
    </Card>
  </Col>
}