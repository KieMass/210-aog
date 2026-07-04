import { Users, HeartHandshake, BookOpen, Church } from 'lucide-react';

export const MINISTRIES = [
  {
    icon: Users,
    title: 'Family Ministry',
    description:
      'Our recurring Family Matters forum builds strong Christian foundations through marriage counseling and home leadership workshops.',
  },
  {
    icon: HeartHandshake,
    title: 'Community Outreach',
    description: 'Free public workshops and educational seminars that serve our Lodge, Georgetown neighbors.',
  },
  {
    icon: BookOpen,
    title: 'Christian Education',
    description: 'Biblical education and discipleship for every generation in our congregation.',
  },
  {
    icon: Church,
    title: 'Worship Ministry',
    description: 'Leading our church family in heartfelt Pentecostal worship every service.',
  },
] as const;
