import express from 'express'
import api from './api'

const app = new express()

app.use(api)

app.listen(1337)
