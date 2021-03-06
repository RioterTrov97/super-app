import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import Admin from '../models/AdminModel.js'


const protect = asyncHandler(async (req, res, next) => {

    let token 

    if (req.headers.authorization &&
         req.headers.authorization.startsWith('Bearer')
    ) {

        try {

            token = req.headers.authorization.split(' ') [1]

            const decoded = jwt.verify(token, 'Nepali')

            req.admin= await Admin.findById(decoded.id).select('-password')

            if(req.admin.isActive) {
                next()
            } else {
                console.error(error)
                res.status(403)
                throw new Error('Account not active.')

            }


        } catch (error) {

            console.error(error)
            res.status(401)
            throw new Error('Not authorized, token failed')

        }

    }

    if(!token) {
        res.status(401)
        throw new Error('Please authenticate.')
    }

 

})

const superadmin = (req, res, next) => {
    if (req.admin && req.admin.isSuperAdmin) {
      next()
    } else {
      res.status(401)
      throw new Error('Not authorized as an admin')
    }
  }

  


  
  export { protect, superadmin }