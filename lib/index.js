import { supabase } from './supabase.js'

async function getProducts() {
  const { data, error } = await supabase
    .from('exercises')
    .select('*')

  if (error) {
    console.log(error)
  } else {
    console.log(data)
  }
}

getProducts()