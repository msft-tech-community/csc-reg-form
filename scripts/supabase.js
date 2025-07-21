const SUPABASE_URL = 'https://zebimgjgpbphxxbyirfl.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InplYmltZ2pncGJwaHh4YnlpcmZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxMjI4NDksImV4cCI6MjA2NzY5ODg0OX0.eHJyBujpdiZCtvi8V7YbcfCkzBhWP7EpYg3zN2LPGJs';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function uploadFormData(formData) {
  const { data, error } = await supabase
    .from('registrations')
    .insert([formData]);
  return { data, error };
}

async function uploadPDF(file, teamLeaderName) {
  const fileName = `${teamLeaderName}-id card.pdf`;
  const { data, error } = await supabase.storage
    .from('id-cards')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    });
  return { data, error };
}

window.uploadFormData = uploadFormData;
window.uploadPDF = uploadPDF;
