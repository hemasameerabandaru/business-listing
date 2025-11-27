export interface Business {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  imageUrl: string;
  address: string;
}

export let businesses: Business[] = [
  {
    id: '1',
    name: 'Tech Sol',
    slug: 'tech-sol',
    description: 'Top tier IT solutions and software development.',
    category: 'Technology',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
    address: 'Rushikonda IT Park Road, Visakhapatnam – 530045'
  },
  {
    id: '2',
    name: 'Green Bites',
    slug: 'green-bites',
    description: 'Healthy organic food and catering services.',
    category: 'Food',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
    address: 'MVP Double Road, Sector 9, Visakhapatnam – 530017'
  },
  {
    id: '3',
    name: 'Urban Clap',
    slug: 'urban-clap',
    description: 'Home services at your doorstep.',
    category: 'Service',
    imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80',
    address: ' Murali Nagar Main Road, Visakhapatnam – 530007'
  },
  {
    id: '4',
    name: 'Bistro 55',
    slug: 'bistro-55',
    description: 'Fine dining experience with italian cuisine.',
    category: 'Food',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
    address: 'Beach Road, Opposite VUDA Park, Visakhapatnam – 530003'
  },
  {
    id: '5',
    name: 'Code Academy',
    slug: 'code-academy',
    description: 'Learn coding from industry experts.',
    category: 'Education',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
    address: 'Maddilapalem Road, Near Andhra University, Visakhapatnam – 530003'
  },
  {
    id: '6',
    name: 'Fit Gym',
    slug: 'fit-gym',
    description: 'State of the art fitness center.',
    category: 'Health',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80',
    address: 'Siripuram Junction, Waltair Main Road, Visakhapatnam – 530003'
  },
  {
    id: '7',
    name: 'Medi Care',
    slug: 'medi-care',
    description: '24/7 Medical assistance and pharmacy.',
    category: 'Health',
    imageUrl: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=600&q=80',
    address: 'Temple Lane, Near Siripuram Junction, Visakhapatnam – 530003'
  },
  {
    id: '8',
    name: 'Travel Bug',
    slug: 'travel-bug',
    description: 'Custom travel packages for holidays.',
    category: 'Travel',
    imageUrl: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80',
    address: 'Beach Road, Opposite RK Beach, Visakhapatnam – 530003'
  },
  {
    id: '9',
    name: 'Auto Fix',
    slug: 'auto-fix',
    description: 'Premium car repair and service.',
    category: 'Automotive',
    imageUrl: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=600&q=80',
    address: 'Gajuwaka Main Road, Visakhapatnam – 530026'
  },
  {
    id: '10',
    name: 'Pet Planet',
    slug: 'pet-planet',
    description: 'Everything your pet needs.',
    category: 'Retail',
    imageUrl: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=600&q=80',
    address: 'Seethammadhara Road, Near Pet Zone, Visakhapatnam – 530013'
  }
];

export const updateBusinesses = (newData: Business[]) => {
  businesses = newData;
};