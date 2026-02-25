// FILE: data/webinars.ts
// EDIT THIS FILE to update webinars - no coding needed!

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

// ============================================
// CURRENT WEBINAR - Edit this section!
// ============================================
export const currentWebinar: Webinar = {
  id: 'seo-2024-trends',
  title: 'SEO in 2024: What Actually Works',
  description: 'Discover the latest SEO strategies that are driving real results. Learn how to rank higher on Google, avoid common mistakes, and implement proven tactics that increase organic traffic by 300%+.',
  date: 'March 25, 2024',
  time: '3:00 PM IST',
  duration: '60 minutes',
  registrationLink: 'https://zoom.us/webinar/register/YOUR_WEBINAR_ID',
  status: 'upcoming',
  topics: [
    'Google Algorithm Updates 2024',
    'AI-Powered SEO Strategies',
    'Technical SEO Essentials',
    'Local SEO Domination',
    'Link Building That Works',
    'Content Strategy for 2024',
  ],
  speaker: {
    name: 'Your Name',
    title: 'SEO Expert & Founder, Riverr360',
    image: '/images/speaker.jpg',
  },
  thumbnail: '/images/webinar-seo-2024.jpg',
};

// ============================================
// ARCHIVED WEBINARS - Add completed ones here
// ============================================
export const archivedWebinars: Webinar[] = [
  {
    id: 'google-ads-mastery-feb-2024',
    title: 'Google Ads Mastery: Reduce CPC by 50%',
    description: 'Learn proven strategies to cut your Google Ads costs in half while increasing conversions.',
    date: 'February 15, 2024',
    time: '2:00 PM IST',
    duration: '75 minutes',
    registrationLink: '',
    status: 'archived',
    youtubeVideoId: 'dQw4w9WgXcQ', // UPDATE with real YouTube ID
    topics: [
      'Quality Score Optimization',
      'Negative Keywords Strategy',
      'Ad Copy That Converts',
    ],
    speaker: {
      name: 'Your Name',
      title: 'PPC Expert, Riverr360',
    },
  },
  {
    id: 'social-media-roi-jan-2024',
    title: 'Social Media ROI: From Likes to Sales',
    description: 'Turn your social media followers into paying customers.',
    date: 'January 20, 2024',
    time: '4:00 PM IST',
    duration: '60 minutes',
    registrationLink: '',
    status: 'archived',
    youtubeVideoId: 'dQw4w9WgXcQ', // UPDATE
    topics: [
      'Instagram Shopping Setup',
      'Facebook Ads Funnel',
      'Content Strategy',
    ],
    speaker: {
      name: 'Your Name',
      title: 'Social Media Strategist, Riverr360',
    },
  },
];

export const getArchivedWebinars = () => archivedWebinars;
export const getUpcomingWebinars = () => [currentWebinar].filter(w => w.status === 'upcoming');
