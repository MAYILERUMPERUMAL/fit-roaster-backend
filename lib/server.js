import express from 'express'
import { supabase } from './supabase.js'

const app = express()
const PORT = 3002

app.use(express.json())

// ✅ API: Get Products
app.get('/exercises', async (req, res) => {
  const { data, error } = await supabase
    .from('exercises')
    .select('*')

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.json(data)
})

// ✅ API: Insert Product
app.post('/products', async (req, res) => {
  const { name, price } = req.body

  const { data, error } = await supabase
    .from('products')
    .insert([{ name, price }])

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.json(data)
})

const port = process.env.PORT || 3002;

app.listen(port, '0.0.0.0', () => {
  console.log(`Backend running on port ${port}`);
});