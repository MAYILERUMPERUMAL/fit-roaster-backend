
import express from 'express'
import { supabase } from './supabase.js'

const app = express()
app.use(express.json())

// Existing API
app.get('/exercises', async (req, res) => {
  const { data, error } = await supabase
    .from('exercises')
    .select('*')

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.json(data)
})

// Initial sync API
app.get('/sync/initial', async (req, res) => {
  try {
    const page = Number(req.query.page ?? 0)
    const limit = Number(req.query.limit ?? 500)

    if (
      !Number.isSafeInteger(page) ||
      page < 0 ||
      !Number.isSafeInteger(limit) ||
      limit < 1 ||
      limit > 500
    ) {
      return res.status(400).json({
        error: 'Invalid page or limit',
      })
    }

    const from = page * limit
    const to = from + limit - 1

    const { data, error, count } = await supabase
      .from('exercises')
      .select('*', { count: 'exact' })
      .order('id', { ascending: true })
      .range(from, to)

    if (error) {
      return res.status(500).json({
        error: error.message,
      })
    }

    const total = count ?? 0

    res.json({
      success: true,
      data,
      pagination: {
        page,
        limit,
        total,
        hasMore: to + 1 < total,
        nextPage: to + 1 < total ? page + 1 : null,
      },
    })
  } catch (error) {
    console.error('Initial sync error:', error)

    res.status(500).json({
      error: 'Initial sync failed',
    })
  }
})

// Existing product API
app.post('/products', async (req, res) => {
  const { name, price } = req.body

  const { data, error } = await supabase
    .from('products')
    .insert([{ name, price }])
    .select()

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.json(data)
})

const port = process.env.PORT || 3002

app.listen(port, '0.0.0.0', () => {
  console.log(`Backend running on port ${port}`)
})
