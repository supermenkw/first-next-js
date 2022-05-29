import {
  Row,
  Col,
  Container,
  Stack,
} from 'react-bootstrap'
import { BsInstagram, BsTwitter } from 'react-icons/bs'
import { FaFacebookF } from 'react-icons/fa'

export default function Footer() {
  
  return (
    <Row className='bg-black p-0 m-0 gx-0 gy-0' style={{ minHeight: '99px' }}>
      <Col md={4} className='ps-4 pt-4 pe-4 pb-4 d-flex justify-content-center align-items-center'>
        <Stack direction='horizontal' gap={4}>
          <BsInstagram color='#fff' size={25}/>
          <FaFacebookF color='#fff' size={25}/>
          <BsTwitter color='#fff' size={25}/>
        </Stack>
      </Col>
      <Col md={8} className='text-white ps-4 pt-4 pe-4 pb-4 d-flex justify-content-center align-items-center'>
        <Row className='p-0 m-0 gx-0 gy-0 w-100'>
          <Col md={2} className='fs-6 text-center'>Terms & Condition</Col>
          <Col md={1} className='fs-6 text-center'>|</Col>
          <Col md={6}className='fs-6 text-center'> Copyright © 2018. All rights reserved. PT Radya Gita Bahagi</Col>
        </Row>
      </Col>
    </Row>    
  )
}