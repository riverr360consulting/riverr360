// FILE: data/webinars.ts

export interface Webinar {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  registrationLink: string;
  status: 'upcoming' | 'archived';
  youtubeVideoId?: string;
  topics: string[];
  speaker: {
    name: string;
    title: string;
    image?: string;
  };
  thumbnail?: string;
}

export const currentWebinar: Webinar | null = null;

export const archivedWebinars: Webinar[] = [
  {
    id: 'seo-2026-trends-apr-2026',
    title: 'SEO in 2026: What Actually Works',
    description: 'Discover the latest SEO strategies that are driving real results. Learn how to rank higher on Google, avoid common mistakes, and implement proven tactics that increase organic traffic by 300%+.',
    date: 'April 26, 2026',
    time: '3:00 PM IST',
    duration: '60 minutes',
    registrationLink: '',
    status: 'archived',
    youtubeVideoId: '',
    topics: [
      'Google Algorithm Updates 2026',
      'AI-Powered SEO Strategies',
      'Technical SEO Essentials',
      'Local SEO Domination',
      'Link Building That Works',
      'Content Strategy for 2026',
    ],
    speaker: {
      name: 'Bijeesh Kuttikrishnan',
      title: 'SEO Expert & Founder, Riverr360',
    },
  },
  {
    id: 'google-ads-mastery-feb-2026',
    title: 'Google Ads Mastery: Reduce CPC by 50%',
    description: 'Learn proven strategies to cut your Google Ads costs in half while increasing conversions.',
    date: 'February 15, 2026',
    time: '2:00 PM IST',
    duration: '75 minutes',
    registrationLink: '',
    status: 'archived',
    youtubeVideoId: '',
    topics: [
      'Quality Score Optimization',
      'Negative Keywords Strategy',
      'Ad Copy That Converts',
    ],
    speaker: {
      name: 'Bijeesh Kuttikrishnan',
      title: 'PPC Expert, Riverr360',
    },
  },
  {
    id: 'social-media-roi-jan-2026',
    title: 'Social Media ROI: From Likes to Sales',
    description: 'Turn your social media followers into paying customers.',
    date: 'January 20, 2026',
    time: '4:00 PM IST',
    duration: '60 minutes',
    registrationLink: '',
    status: 'archived',
    youtubeVideoId: '',
    topics: [
      'Instagram Shopping Setup',
      'Facebook Ads Funnel',
      'Content Strategy',
    ],
    speaker: {
      name: 'Bijeesh Kuttikrishnan',
      title: 'Social Media Strategist, Riverr360',
    },
  },
];

export const getArchivedWebinars = () => archivedWebinars;
export const getUpcomingWebinars = (): Webinar[] =>
  currentWebinar ? [currentWebinar] : [];
