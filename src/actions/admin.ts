'use server'

import { createClient } from '@/lib/supabase/server'

export async function verifyPasscode(key: string): Promise<boolean> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('settings')
    .select('value')
    .eq('key', 'admin_passcode')
    .single()

  if (error || !data) {
    console.error("Failed to fetch admin passcode:", error)
    return false
  }

  return data.value === key
}

export async function createClub(formData: FormData) {
  const supabase = await createClient();
  
  const name = formData.get('name') as string;
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const description = formData.get('description') as string;
  let logoUrl = formData.get('logo') as string || null;
  const logoFile = formData.get('logoFile') as File | null;
  const category = formData.get('category') as string || null;

  if (logoFile && logoFile.size > 0) {
    const fileExt = logoFile.name.split('.').pop();
    const fileName = `${slug}-${Date.now()}.${fileExt}`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('media')
      .upload(`clubs/${fileName}`, logoFile);
      
    if (uploadError) {
      console.error("Failed to upload logo:", uploadError);
      return { success: false, error: "Failed to upload logo image" };
    }
    
    const { data: { publicUrl } } = supabase.storage
      .from('media')
      .getPublicUrl(`clubs/${fileName}`);
      
    logoUrl = publicUrl;
  }

  const newClub = {
    id: slug + '-' + Date.now().toString(),
    name,
    slug,
    description,
    logo: logoUrl,
    category,
    color: 'text-blue-400',
    gradient: 'bg-gradient-to-br from-blue-500/20 to-purple-500/20',
    stats: { members: 0, events: 0, projects: 0 },
    facultyCoordinator: { name: "", designation: "", image: "" },
    studentCoordinator: { name: "", role: "", image: "" }
  };

  const { error } = await supabase.from('clubs').insert(newClub);
  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function createPost(formData: FormData) {
  const supabase = await createClient();
  
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const category = formData.get('category') as string;
  const imageFile = formData.get('imageFile') as File | null;
  const author = "Admin";
  const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  
  let imageUrl = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80"; // fallback

  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `post-${Date.now()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(`posts/${fileName}`, imageFile);
      
    if (!uploadError) {
      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(`posts/${fileName}`);
      imageUrl = publicUrl;
    }
  }

  const newPost = {
    id: 'post-' + Date.now().toString(),
    title,
    content,
    author,
    date,
    category,
    readTime: Math.max(1, Math.ceil(content.split(' ').length / 200)) + ' min read',
    image: imageUrl,
    likes: 0,
    comments: 0
  };

  const { error } = await supabase.from('posts').insert(newPost);
  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}
