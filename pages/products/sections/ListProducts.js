import {
  Col,
} from 'react-bootstrap'
import CardProduct from '../components/CardProduct';


export default function ListProducts({ dataProducts }) {

  const handleDefineStock = (stock) => {

    if (stock <= 0) {

      return {
        label: 'Sold Out',
        color: '#E64580'
      }
    } else if(stock < 5) {

      return {
        label: 'Stock < 5',
        color: '#E64580'
      }
    } else {

      return {
        label: 'In Stock',
        color: '#79B625'
      }
    }
  }

  return <>
    {
      Array.isArray(dataProducts) && dataProducts.length !== 0 ?
      dataProducts.map((item, index) => {
        const stockStatus = handleDefineStock(parseInt(item?.attributes?.stock))

        return <CardProduct stockStatus={stockStatus} key={item.id + index} item={item} />
      }) : <Col>Data Empty</Col>
    }
  </>
}