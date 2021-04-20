import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LoginScreen from './Screens/LoginScreen'

const App = () => {
  return (
    <Router>
      <main className='py-3'>
        <Container>
          <Route path='/login' component={LoginScreen} />
        </Container>
      </main>
    </Router>
  )
}

export default App