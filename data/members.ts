export const membersList = [
  {
    id: 1,
    name: 'আব্দুল্লাহ আল মামুন',
    phone: '01712345678',
    address: 'মধুপুর, টাঙ্গাইল',
    email: 'mamun@example.com',
    joinDate: '১২ জানুয়ারি, ২০২৩',
    monthlyYanat: 500,
    totalYanat: 8000,
    isAdmin: true,
    books: [
      {
        id: 1,
        title: 'তাওহীদের দাওয়াত',
        author: 'ইমাম মুহাম্মদ বিন আব্দুল ওয়াহহাব',
        coverImage: 'https://images.pexels.com/photos/58639/pexels-photo-58639.jpeg?auto=compress&cs=tinysrgb&w=600',
        borrowDate: '১০ মে, ২০২৫',
        returnDate: '১০ জুন, ২০২৫'
      }
    ],
    targets: [
      {
        id: 1,
        title: 'ইসলামী বইয়ের স্টল প্রতিষ্ঠা',
        description: 'মধুপুর বাজারে একটি ইসলামী বইয়ের স্টল প্রতিষ্ঠা করা',
        deadline: '৩০ জুন, ২০২৫',
        progress: 75,
        completed: false
      },
      {
        id: 2,
        title: 'দাওয়াতি কর্মসূচি',
        description: 'পাঁচজন নতুন ব্যক্তিকে দাওয়াত দেওয়া',
        deadline: '১৫ মে, ২০২৫',
        progress: 100,
        completed: true
      }
    ]
  },
  {
    id: 2,
    name: 'মাহমুদুল হাসান',
    phone: '01812345678',
    address: 'গাজীপুর সদর',
    email: '',
    joinDate: '৫ মার্চ, ২০২৩',
    monthlyYanat: 300,
    totalYanat: 4500,
    isAdmin: false,
    books: [],
    targets: []
  },
  {
    id: 3,
    name: 'তানজিল আহমেদ',
    phone: '01912345678',
    address: 'জয়দেবপুর, গাজীপুর',
    email: 'tanzil@example.com',
    joinDate: '২১ এপ্রিল, ২০২৩',
    monthlyYanat: 500,
    totalYanat: 7000,
    isAdmin: false,
    books: [],
    targets: []
  },
  {
    id: 4,
    name: 'আতিক উল্লাহ',
    phone: '01612345678',
    address: 'ময়মনসিংহ সদর',
    email: '',
    joinDate: '১৮ জুন, ২০২৩',
    monthlyYanat: 500,
    totalYanat: 6500,
    isAdmin: false,
    books: [],
    targets: []
  },
  {
    id: 5,
    name: 'ফারহান আহমেদ',
    phone: '01312345678',
    address: 'টাঙ্গাইল সদর',
    email: 'farhan@example.com',
    joinDate: '৩ আগস্ট, ২০২৩',
    monthlyYanat: 400,
    totalYanat: 5200,
    isAdmin: false,
    books: [],
    targets: []
  }
];