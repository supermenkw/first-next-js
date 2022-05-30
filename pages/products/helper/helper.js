import { IoStar, IoStarOutline, IoStarHalf } from 'react-icons/io5'
import {
  Col, Stack,
} from 'react-bootstrap'
import { IN_STOCK, SOLD_OUT, STOCK_LESS_THAN_FIVE } from '../../../constants/GlobalConstant';


export const calculateRatingStar = (rating, sizeStar = 15) => {
  const roundRating = Math.round(rating*2)/2;
  const totalStar = Math.floor(roundRating) / 1 ?? 0
  const totalHalfStar = roundRating % 1 ?? 0
  const totalEmptyStar = 5 - (totalStar + Math.ceil(totalHalfStar))

  const tempArrTotalStar = [...Array(totalStar)]
  const tempArrTotalHalfStar = [...Array(totalEmptyStar)]
  
  return <Stack direction='horizontal' gap={1}>
    {
      tempArrTotalStar.map((d, i) => {

        return <IoStar color='#F0D946' key={i} size={sizeStar} />
      })
    }
    {
      totalHalfStar !== 0 && <IoStarHalf color='#F0D946' size={sizeStar} />
    }
    {
      tempArrTotalHalfStar.length !== 0 && tempArrTotalHalfStar.map((d, i) => {

        return <IoStarOutline color='#F0D946' key={i} size={sizeStar} />
      })
    }
  </Stack>
}

export const renderRibbonLabel = (isNew, rating, review) => {
  if(rating >= 4 && review >= 25 && isNew === 1) {

    return <span style={{ backgroundColor: '#e7246b' }}>Hot <pre /> Item</span>
  } else if(rating >= 4 && review >= 25) {

    return <span style={{ backgroundColor: '#1dbfdc' }}>Best <pre /> Seller</span>     
  } else if(isNew === 1) {

    return <span style={{ lineHeight: '65px', backgroundColor: '#dcb81d' }}>New</span>
  } else {
    return false
  }
}

export const defineStock = (stock) => {

  if (stock <= 0) {

    return {
      label: SOLD_OUT,
      color: '#E64580'
    }
  } else if(stock < 5) {

    return {
      label: STOCK_LESS_THAN_FIVE,
      color: '#E64580'
    }
  } else {

    return {
      label: IN_STOCK,
      color: '#79B625'
    }
  }
}