import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col , Carousel} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CarouselDisplay from '../components/Carousel'

import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/adminActions'
import './display.css'


const LoginScreen = ({ history }) => {
  const [phoneNumber, setphoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')
  
  const dispatch = useDispatch()

  const adminLogin = useSelector((state) => state.adminLogin)
  const { loading, error, adminInfo } = adminLogin



  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(phoneNumber, password))
  }

  return (
    <>
    <div className="split left center">
    <div className="centered">
      <CarouselDisplay/>
    </div>
  </div>
      
    <div className='split right center'>  
    <FormContainer>
    <h1>SuperApp Admin Sign Up</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
      <Form.Group controlId='userName'>
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter User Name'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='phoneNumber'>
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            type='phoneNumber'
            placeholder='Enter Mobile Number'
            value={phoneNumber}
            onChange={(e) => setphoneNumber(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='phoneNumber'
            placeholder='Enter Mobile Number'
            value={phoneNumber}
            onChange={(e) => setphoneNumber(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Sign Up
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Already have account?{' '}
          <Link to={'/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
    </div>
    </>
  )
}

export default LoginScreen