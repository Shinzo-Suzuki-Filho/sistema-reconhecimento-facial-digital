import { createClient } from '@supabase/supabase-js';

// Substitua pelas suas credenciais do Supabase
const supabaseUrl = 'https://your-project-url.supabase.co';
const supabaseAnonKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getForagidos = async () => {
  const { data, error } = await supabase
    .from('foragidos')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const reportCapture = async (foragidoId: string, location: string) => {
  const { data, error } = await supabase
    .from('capturas')
    .insert([{ foragido_id: foragidoId, localizacao: location, data_captura: new Date().toISOString() }]);
  
  if (error) throw error;
  return data;
};
