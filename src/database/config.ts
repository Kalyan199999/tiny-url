import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const url = process.env.SUPABASE_URL || "";
const annon = process.env.SUPABASE_ANNON || "";

// console.log(url,annon);

const supabase = createClient( url,annon );
console.log("Database is conncted successfully!");

export default supabase;