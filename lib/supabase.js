import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gffjdhxpfgvvdctqsspi.supabase.co'
const supabaseAnonKey = 'sb_publishable_tGZixxCoNGd8wTgvNmScXA_Rd0RVkSV'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

