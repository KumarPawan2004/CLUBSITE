import { Club, Event, Post, Notice, Faculty, Achievement, GalleryItem } from "../types";

export const clubs: Club[] = [
  {
    id: "tech-club",
    name: "Tech Club",
    slug: "tech-club",
    description: "The epicenter of technical innovation. We host hackathons, coding workshops, open-source sprints, and sessions on AI, Web3, and Cloud Computing.",
    color: "blue",
    gradient: "from-blue-500/20 to-cyan-500/20",
    stats: { members: 320, events: 45, projects: 12 },
    facultyCoordinator: { name: "Dr. Rajesh Kumar", designation: "Assoc. Professor", image: "/avatars/faculty-1.jpg" },
    studentCoordinator: { name: "Ananya Sharma", role: "President", image: "/avatars/student-1.jpg" }
  },
  {
    id: "sports-club",
    name: "Sports Club",
    slug: "sports-club",
    description: "Fostering physical fitness, teamwork, and competitive spirit. We organize inter-departmental tournaments and athletic meets.",
    color: "green",
    gradient: "from-green-500/20 to-emerald-500/20",
    stats: { members: 180, events: 24, projects: 0 },
    facultyCoordinator: { name: "Prof. Anil Singh", designation: "Sports Director", image: "/avatars/faculty-2.jpg" },
    studentCoordinator: { name: "Vikram Reddy", role: "Captain", image: "/avatars/student-2.jpg" }
  },
  {
    id: "cultural-club",
    name: "Cultural Club",
    slug: "cultural-club",
    description: "Celebrating art, music, dance, and drama. A creative space for students to express themselves and organize the annual cultural fest.",
    color: "purple",
    gradient: "from-purple-500/20 to-pink-500/20",
    stats: { members: 210, events: 30, projects: 5 },
    facultyCoordinator: { name: "Dr. Neha Verma", designation: "Asst. Professor", image: "/avatars/faculty-3.jpg" },
    studentCoordinator: { name: "Priya Das", role: "Secretary", image: "/avatars/student-3.jpg" }
  }
];

export const upcomingEvents: Event[] = [
  {
    id: "evt-1",
    title: "HackSprint 2026: AI & Web3",
    slug: "hacksprint-2026",
    clubId: "tech-club",
    date: "Oct 15, 2026",
    time: "09:00 AM - 48 Hours",
    venue: "Main Auditorium, ACE Lab",
    description: "The largest 48-hour hackathon of the year. Build innovative solutions using AI and Web3 technologies. Huge prizes to be won!",
    poster: "/events/hacksprint.jpg",
    category: "Hackathon",
    status: "upcoming"
  },
  {
    id: "evt-2",
    title: "Annual Sports Meet",
    slug: "annual-sports-meet-2026",
    clubId: "sports-club",
    date: "Nov 02, 2026",
    time: "08:00 AM Onwards",
    venue: "University Ground",
    description: "Inter-departmental sports meet featuring cricket, football, athletics, and indoor games.",
    poster: "/events/sports-meet.jpg",
    category: "Tournament",
    status: "upcoming"
  }
];

export const notices: Notice[] = [
  {
    id: "not-1",
    title: "Mid-Semester Examination Schedule Released",
    date: "Oct 10, 2026",
    urgent: true,
    department: "Academic Section"
  },
  {
    id: "not-2",
    title: "Call for Research Papers - IEEE Conference",
    date: "Oct 08, 2026",
    urgent: false,
    department: "R&D Cell"
  },
  {
    id: "not-3",
    title: "Holiday Declaration: Diwali Break",
    date: "Oct 05, 2026",
    urgent: false,
    department: "Admin"
  }
];

export const recentPosts: Post[] = [
  {
    id: "post-1",
    author: "Tech Club",
    clubId: "tech-club",
    time: "2 hours ago",
    content: "Just wrapped up an amazing workshop on React and Next.js! Thanks to everyone who joined. Check out the resources link in bio. 🚀💻",
    likes: 124,
    comments: 18,
    tags: ["React", "NextJS", "Workshop"]
  },
  {
    id: "post-2",
    author: "Cultural Club",
    clubId: "cultural-club",
    time: "5 hours ago",
    content: "Auditions for the annual theater production 'The Matrix Reborn' are happening this weekend! Don't miss your chance to shine on stage. 🎭✨",
    likes: 342,
    comments: 45,
    tags: ["Theater", "Auditions", "Drama"]
  }
];

export const facultyMembers: Faculty[] = [
  {
    id: "fac-1",
    name: "Dr. Arvind Pathak",
    designation: "Head of Department",
    researchAreas: ["Artificial Intelligence", "Quantum Computing"],
    image: "/avatars/fac-1.jpg",
    email: "arvind.pathak@ybn.edu.in"
  },
  {
    id: "fac-2",
    name: "Dr. Rajesh Kumar",
    designation: "Associate Professor",
    researchAreas: ["Cybersecurity", "Blockchain"],
    image: "/avatars/fac-2.jpg",
    email: "rajesh.k@ybn.edu.in"
  },
  {
    id: "fac-3",
    name: "Dr. Neha Verma",
    designation: "Assistant Professor",
    researchAreas: ["Human-Computer Interaction", "UI/UX"],
    image: "/avatars/fac-3.jpg",
    email: "neha.v@ybn.edu.in"
  },
  {
    id: "fac-4",
    name: "Prof. Anil Singh",
    designation: "Assistant Professor",
    researchAreas: ["Cloud Computing", "Distributed Systems"],
    image: "/avatars/fac-4.jpg",
    email: "anil.s@ybn.edu.in"
  }
];
