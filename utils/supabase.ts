import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const isValid = supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl !== 'FILL_ME_IN' &&
    supabaseAnonKey !== 'FILL_ME_IN' &&
    supabaseUrl.startsWith('http')

export const supabase = isValid
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null
