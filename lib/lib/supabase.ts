import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://hifuxuydkrqpyxpcpfqv.supabase.co/rest/v1/"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpZnV4dXlka3JxcHl4cGNwZnF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzODAzNTgsImV4cCI6MjA5Mzk1NjM1OH0.WNKmLxbLUzWDLfdQtYXFiWMG9-K80MDUXydjKyF6Fe8"

export const supabase = createClient(supabaseUrl, supabaseKey)