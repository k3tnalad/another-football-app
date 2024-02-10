import { createClient } from '@supabase/supabase-js'
   

export const supabase = createClient('https://jhouzoedccyriwabnpyc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impob3V6b2VkY2N5cml3YWJucHljIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3NDc1MjYwNywiZXhwIjoxOTkwMzI4NjA3fQ.yGmQfrWCOf8y-7cz8mswvAhNuE_wxR01uBzVr7Po_zQ')