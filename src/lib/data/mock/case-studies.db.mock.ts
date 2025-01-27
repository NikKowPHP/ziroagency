// Mock data for case studies

export const mockCaseStudies = [
  {
    id: 'a-new-case-1737272315512',
    title: 'a new case ',
    description:
      'SuperNormal is an innovative app concept designed specifically for "Rejuvenation Athletes," individuals dedicated to slowing biological aging and enhancing their overall well-being. This project aims to integrate various features that support users in their journey toward longevity through a user-friendly interface and community engagement.',
    tags: ['sdffds', 'asdasda', 'sdfsdfsdfsd'],
    images: [
      {
        alt: 'fsdkljflskdjfksdlf sdkfj',
        url: 'https://i.postimg.cc/HnJWWQdV/iqubx.avif',
      },
      {
        alt: 'qewweqweqweqwe',
        url: 'https://i.postimg.cc/9DppCJXz/download.jpg',
      },
      {
        alt: 'fdsfdsfsdfsdf',
        url: 'https://i.postimg.cc/4mpPFXr6/download-1.jpg',
      },
      {
        alt: 'dfgdfgdfgsdfgsdfg',
        url: 'https://i.postimg.cc/RqK2DvSv/download.jpg',
      },
      {
        alt: 'fdsgdf',
        url: 'https://i.postimg.cc/JG8SwS0Z/photo-1735287367310-2648443f086f.avif',
      },
      {
        alt: 'dsadsadasdas',
        url: 'https://i.postimg.cc/4m1qXwHM/photo-1735814933921-ab6afbdf5d17.avif',
      },
      {
        alt: 'sadasdasdads',
        url: 'https://i.postimg.cc/WdbKzrM4/photo-1736264335209-05960b7aa567.avif',
      },
    ],
    cta_text: 'sdfsd',
    cta_text_name: 'caseStudy.ctaText.viewCaseStudy',
    cta_url:
      'https://vercel.com/nikkowphps-projects/ziroagency/settings/environment-variables',
    created_at: '2025-01-11T14:23:58.999Z',
    updated_at: '2025-01-11T14:23:58.999Z',
    slug: 'a-new-case',
  },
  {
    id: 'gsense',
    title: 'gSense',
    description:
      'gSense is a health platform which focuses on personalized health monitoring. It integrates various health metrics and devices to assist in managing chronic diseases.',
    tags: ['Branding', 'Saas', 'HealthTech'],
    images: [
      {
        alt: 'gSense branded bag',
        url: '/images/case-studies/gsense/gsense.avif',
      },
    ],
    cta_text: 'View Case Study',
    cta_text_name: 'caseStudy.ctaText.viewCaseStudy',
    cta_url: '#',
    created_at: '2025-01-07T12:51:46.986Z',
    updated_at: '2025-01-07T12:51:46.986Z',
    slug: 'gsense',
  },
  {
    id: 'iqubx',
    title: 'IQUBX',
    description:
      'A redesigned website for Iqubx, a New Delhi leader in green building products. The project focused on enhancing user experience and showcasing eco-friendly offerings like aluminum ceiling trapdoors, featuring a responsive design and a dedicated sustainability section.',
    tags: ['Website', 'Visual Identity', 'Sustainability'],
    images: [
      {
        alt: 'IQUBX website redesign showcasing baffle ceiling systems',
        url: '/images/case-studies/iqubx/iqubx.avif',
      },
    ],
    cta_text: 'View Case Study',
    cta_text_name: 'caseStudy.ctaText.viewCaseStudy',
    cta_url: 'https://iqubx.framer.website/',
    created_at: '2025-01-07T12:51:46.986Z',
    updated_at: '2025-01-07T12:51:46.986Z',
    slug: 'iqubx',
  },
  {
    id: 'supernormal',
    title: 'SuperNormal',
    description:
      'SuperNormal is an innovative app concept designed specifically for "Rejuvenation Athletes," individuals dedicated to slowing biological aging and enhancing their overall well-being. This project aims to integrate various features that support users in their journey toward longevity through a user-friendly interface and community engagement.',
    tags: ['Mobile Application', 'HealthTech'],
    images: [
      {
        alt: 'SuperNormal app interface',
        url: '/images/case-studies/supernormal/supernormal.avif',
      },
    ],
    cta_text: 'View Case Study',
    cta_text_name: 'caseStudy.ctaText.viewCaseStudy',
    cta_url: 'https://www.nikhil.health/p/supernormal-a-longevity-app-concept',
    created_at: '2025-01-07T12:51:46.986Z',
    updated_at: '2025-01-07T12:51:46.986Z',
    slug: 'supernormal',
  },
];


export const mockSupabaseClient = {
  from: (tableName: string) => ({
    select: (selectQuery: string) => ({
      order: (column: string, { ascending }: { ascending: boolean }) => {
        let data = mockCaseStudies;
        if (tableName === `case_studies_en`) { // Assuming locale 'en' for mock data
          data = mockCaseStudies;
        } else if (tableName === `case_studies_de`) { // Example for 'de' locale if you have mock data
          data = mockCaseStudies; // Replace with actual mock data for 'de'
        }
        return {
          data: data.sort((a, b) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);
            return ascending ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
          }),
          error: null,
        };
      },
      eq: (columnName: string, slug: string) => {
        let data = mockCaseStudies.find(item => item.slug === slug);
        if (tableName === `case_studies_en`) { // Assuming locale 'en' for mock data
          data = mockCaseStudies.find(item => item.slug === slug);
        } else if (tableName === `case_studies_de`) { // Example for 'de' locale if you have mock data
          data = mockCaseStudies.find(item => item.slug === slug); // Replace with actual mock data for 'de'
        }
        return {
          single: () => ({
            data: data || null,
            error: null,
          })
        };
      },
      single: () => ({
        data: mockCaseStudies[0] || null, // Return the first item for single() in mocks
        error: null,
      })
    }),
  }),
};