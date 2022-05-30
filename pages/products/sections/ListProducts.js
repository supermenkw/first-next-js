import {
  Col, Stack,
} from 'react-bootstrap'
import CardProduct from '../components/CardProduct';
import { calculateRatingStar, renderRibbonLabel, defineStock } from '../helper/helper';

export default function ListProducts({ dataProducts, setDataProducts }) {

  return <>
    {
      Array.isArray(dataProducts) && dataProducts.length !== 0 ?
      dataProducts.map((item, index, array) => {
        const stockStatus = defineStock(parseInt(item?.attributes?.stock))
        const ribbonStatus = renderRibbonLabel(item?.attributes?.isNew, item?.attributes?.rating, item?.attributes?.stock, item?.attributes?.numOfReviews)
        const ratingStatus = calculateRatingStar(item?.attributes?.rating)

        console.log(item)

        return <CardProduct data={array} index={index} setDataProducts={setDataProducts} stockStatus={stockStatus} ribbonStatus={ribbonStatus} ratingStatus={ratingStatus} key={item.id + index} item={item} />
      }) : <Col>Data Empty</Col>
    }
  </>
}