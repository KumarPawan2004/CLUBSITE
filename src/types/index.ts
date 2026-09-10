// YBN Pulse - Core TypeScript Interfaces

export interface Club {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo?: string;
  category?: string;
  color: string;
  gradient: string;
  stats: {
    members: number;
    events: number;
    projects: number;
  };
  facultyCoordinator: {
    name: string;
    designation: string;
    image: string;
  };
  studentCoordinator: {
    name: string;
    role: string;
    image: string;
  };
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  clubId: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  poster: string;
  category: string;
  status: 'upcoming' | 'ongoing' | 'past';
  registrationLink?: string;
}

export interface Post {
  id: string;
  author: string;
  clubId: string;
  time: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  tags: string[];
}

export interface Notice {
  id: string;
  title: string;
  date: string;
  urgent: boolean;
  department: string;
  attachmentUrl?: string;
  content?: string;
}

export interface Faculty {
  id: string;
  name: string;
  designation: string;
  researchAreas: string[];
  image: string;
  email: string;
  linkedin?: string;
}

export interface Achievement {
  id: string;
  title: string;
  date: string;
  category: 'hackathon' | 'sports' | 'research' | 'placement';
  description: string;
  image?: string;
  winners: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  clubId: string;
  category: string;
  url: string;
  type: 'image' | 'video';
  year: number;
}
