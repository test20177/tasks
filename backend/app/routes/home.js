import express from 'express'
const router = express.Router()

import * as homeController from '../controllers/api/home.js'

router.get('/' , homeController.homePage)

export default router