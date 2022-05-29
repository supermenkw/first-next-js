import {
  Col,
  Stack,
  Card,
  Button
} from 'react-bootstrap'
import { FaRegHeart } from 'react-icons/fa'
import Image from 'next/image';
import PointImage from '../../../assets/image/Group 2752.png'

export default function CardProduct({ item, stockStatus }) {

  const handleRoundRating = (rating) => {

    return Math.round(rating*2)/2;
  }

  const handleSetSpecialIcon = (isNew, rating, review) => {

  }

  return <Col sm={6} md={4} xxl={3} className='d-flex justify-content-center mb-4'>
    <Card style={{ width: '18rem', padding: '0.8rem', borderRadius: '0.5rem' }}>
      <Card.Title><h3 style={{ fontSize: '12px', color: stockStatus.color }}>{stockStatus.label}</h3></Card.Title>
      <Card.Img variant="top" className='product-img-on-list' src={item?.attributes?.images[0]} />
      <Card.Body className='ps-0 pe-0'>
        <Card.Title style={{ fontSize: '16px' }}>{item?.attributes?.name}</Card.Title>
        <Stack direction="horizontal" gap={3}>
          <div style={{ width: '70%' }}>
            <div style={{ color: '#74B71B', fontSize: '14px' }}>
              <Image 
                src={PointImage}
                alt='point image'
              /> {' '}
              {item?.attributes?.points} points</div>
            <Stack direction="horizontal" gap={2}>
              {handleRoundRating(item?.attributes?.rating)} {' '}
              <p>{item?.attributes?.numOfReviews} reviews</p>
            </Stack>
          </div>
          <div style={{ width: '30%' }}>
            <Button className={item?.attributes?.isWishlist === 1 ? 'wish-listed' : 'unwishlist'}>
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