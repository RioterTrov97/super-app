import jwt from 'jsonwebtoken'

const generateToken = (id) => {
  return jwt.sign({ id }, 'Nepali', {
    expiresIn: '30d',
  })
}

export default generateToken


