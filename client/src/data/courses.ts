export const categories = [
  "Development",
  "Design",
  "Business",
  "Marketing",
  "Data Science",
  "Cloud",
  "AI",
  "Productivity"
];
export const levels = ["Beginner", "Intermediate", "Advanced"];

export const courses = [
  {
    id: "react-101",
    title: "React for Beginners",
    banner: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    instructor: {
      name: "Jane Doe",
      avatar: "https://ui-avatars.com/api/?name=Jane+Doe&background=0099cc&color=fff",
      bio: "Senior Frontend Engineer and React educator.",
      social: {
        twitter: "https://twitter.com/janedoe",
        linkedin: "https://linkedin.com/in/janedoe"
      }
    },
    description: "Learn the basics of React, including components, hooks, and state management.",
    category: "Development",
    level: "Beginner",
    duration: "4 weeks",
    price: 0,
    rating: 4.8,
    language: "English",
    enrollment: 1200,
    badges: ["Bestseller"],
    prerequisites: ["Basic computer skills"],
    targetAudience: ["Beginners", "Students", "Anyone interested in web development"],
    requirements: ["Laptop or desktop", "Internet connection"],
    reviews: [
      { user: "Alice", rating: 5, comment: "Great course!", date: "2024-05-01" },
      { user: "Bob", rating: 4, comment: "Very helpful.", date: "2024-05-02" }
    ],
    relatedCourses: ["ml-bootcamp", "ux-design-fundamentals"],
    modules: [
      {
        title: "Getting Started",
        lessons: [
          {
            title: "Introduction to React",
            description: "What is React and why use it?",
            videoUrl: "https://www.example.com/video1.mp4",
            resources: [
              { type: "pdf", label: "Slides", url: "/resources/react-intro.pdf" },
              { type: "code", label: "Starter Code", url: "/resources/react-starter.zip" }
            ]
          },
          {
            title: "JSX & Components",
            description: "Understanding JSX and building components.",
            videoUrl: "https://www.example.com/video2.mp4",
            resources: []
          }
        ]
      },
      {
        title: "State & Props",
        lessons: [
          {
            title: "Props in React",
            description: "Passing data to components.",
            videoUrl: "https://www.example.com/video3.mp4",
            resources: []
          },
          {
            title: "State Management",
            description: "Using useState and managing state.",
            videoUrl: "https://www.example.com/video4.mp4",
            resources: []
          }
        ]
      }
    ]
  },
  {
    id: "ml-bootcamp",
    title: "Machine Learning Bootcamp",
    banner: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
    instructor: {
      name: "John Smith",
      avatar: "https://ui-avatars.com/api/?name=John+Smith&background=ffcc00&color=222",
      bio: "Data Scientist and ML instructor.",
      social: {
        twitter: "https://twitter.com/johnsmith",
        linkedin: "https://linkedin.com/in/johnsmith"
      }
    },
    description: "A hands-on bootcamp covering the essentials of machine learning.",
    category: "Data Science",
    level: "Intermediate",
    duration: "8 weeks",
    price: 199,
    rating: 4.8,
    language: "English",
    enrollment: 1200,
    badges: ["Bestseller"],
    prerequisites: ["Basic programming knowledge"],
    targetAudience: ["Intermediate learners", "Data scientists", "Anyone interested in AI"],
    requirements: ["Laptop or desktop", "Internet connection"],
    reviews: [
      { user: "Eve", rating: 5, comment: "Excellent course!", date: "2024-05-03" },
      { user: "Charlie", rating: 4, comment: "Very informative.", date: "2024-05-04" }
    ],
    relatedCourses: ["react-101", "ux-design-fundamentals"],
    modules: [
      {
        title: "ML Foundations",
        lessons: [
          {
            title: "What is Machine Learning?",
            description: "Overview of ML concepts and history.",
            videoUrl: "https://www.example.com/ml1.mp4",
            resources: [
              { type: "pdf", label: "Course Slides", url: "/resources/ml-foundations.pdf" }
            ]
          },
          {
            title: "Supervised vs Unsupervised Learning",
            description: "Key differences and use cases.",
            videoUrl: "https://www.example.com/ml2.mp4",
            resources: []
          }
        ]
      },
      {
        title: "Model Building",
        lessons: [
          {
            title: "Data Preprocessing",
            description: "Cleaning and preparing data for ML.",
            videoUrl: "https://www.example.com/ml3.mp4",
            resources: []
          },
          {
            title: "Training & Evaluation",
            description: "How to train and evaluate ML models.",
            videoUrl: "https://www.example.com/ml4.mp4",
            resources: []
          }
        ]
      }
    ]
  },
  {
    id: "ux-design-fundamentals",
    title: "UX Design Fundamentals",
    banner: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    instructor: {
      name: "Emily Clark",
      avatar: "https://ui-avatars.com/api/?name=Emily+Clark&background=ff6f61&color=fff",
      bio: "UX Designer at BigTech, passionate about user-centered design.",
      social: {
        twitter: "https://twitter.com/emilyclark",
        linkedin: "https://linkedin.com/in/emilyclark"
      }
    },
    description: "Master the basics of user experience design, wireframing, and prototyping.",
    category: "Design",
    level: "Beginner",
    duration: "3 weeks",
    price: 49,
    rating: 4.8,
    language: "English",
    enrollment: 1200,
    badges: ["Bestseller"],
    prerequisites: ["Basic design principles"],
    targetAudience: ["Beginners", "Design students", "Anyone interested in UX"],
    requirements: ["Laptop or desktop", "Internet connection"],
    reviews: [
      { user: "Grace", rating: 5, comment: "Great course!", date: "2024-05-05" },
      { user: "Frank", rating: 4, comment: "Very informative.", date: "2024-05-06" }
    ],
    relatedCourses: ["react-101", "ml-bootcamp"],
    modules: [
      {
        title: "UX Principles",
        lessons: [
          {
            title: "What is UX?",
            description: "Understanding the user experience field.",
            videoUrl: "https://www.example.com/ux1.mp4",
            resources: [
              { type: "pdf", label: "UX Principles Slides", url: "/resources/ux-principles.pdf" }
            ]
          },
          {
            title: "User Research",
            description: "Methods for gathering user insights.",
            videoUrl: "https://www.example.com/ux2.mp4",
            resources: []
          }
        ]
      },
      {
        title: "Wireframing & Prototyping",
        lessons: [
          {
            title: "Wireframing Basics",
            description: "How to create effective wireframes.",
            videoUrl: "https://www.example.com/ux3.mp4",
            resources: []
          },
          {
            title: "Prototyping Tools",
            description: "Overview of popular prototyping tools.",
            videoUrl: "https://www.example.com/ux4.mp4",
            resources: []
          }
        ]
      }
    ]
  },
  {
    id: "cloud-aws-essentials",
    title: "AWS Cloud Essentials",
    banner: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    instructor: {
      name: "Michael Lee",
      avatar: "https://ui-avatars.com/api/?name=Michael+Lee&background=00b894&color=fff",
      bio: "Cloud Solutions Architect, AWS Certified.",
      social: {
        twitter: "https://twitter.com/michaellee",
        linkedin: "https://linkedin.com/in/michaellee"
      }
    },
    description: "Get started with AWS cloud, core services, and best practices.",
    category: "Cloud",
    level: "Beginner",
    duration: "5 weeks",
    price: 99,
    rating: 4.8,
    language: "English",
    enrollment: 1200,
    badges: ["Bestseller"],
    prerequisites: ["Basic computer skills"],
    targetAudience: ["Beginners", "Cloud administrators", "Anyone interested in cloud computing"],
    requirements: ["Laptop or desktop", "Internet connection"],
    reviews: [
      { user: "Grace", rating: 5, comment: "Excellent course!", date: "2024-05-07" },
      { user: "Frank", rating: 4, comment: "Very informative.", date: "2024-05-08" }
    ],
    relatedCourses: ["react-101", "ml-bootcamp"],
    modules: [
      {
        title: "AWS Basics",
        lessons: [
          {
            title: "Intro to Cloud Computing",
            description: "Cloud concepts and AWS overview.",
            videoUrl: "https://www.example.com/aws1.mp4",
            resources: [
              { type: "pdf", label: "Cloud Basics", url: "/resources/aws-basics.pdf" }
            ]
          },
          {
            title: "AWS Core Services",
            description: "EC2, S3, Lambda, and more.",
            videoUrl: "https://www.example.com/aws2.mp4",
            resources: []
          }
        ]
      },
      {
        title: "Security & Best Practices",
        lessons: [
          {
            title: "IAM & Security",
            description: "Identity and Access Management in AWS.",
            videoUrl: "https://www.example.com/aws3.mp4",
            resources: []
          },
          {
            title: "Cost Optimization",
            description: "How to save money on AWS.",
            videoUrl: "https://www.example.com/aws4.mp4",
            resources: []
          }
        ]
      }
    ]
  },
  {
    id: "ai-ethics",
    title: "AI Ethics & Society",
    banner: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80",
    instructor: {
      name: "Dr. Priya Nair",
      avatar: "https://ui-avatars.com/api/?name=Priya+Nair&background=6c5ce7&color=fff",
      bio: "AI Researcher and Ethics Advocate.",
      social: {
        twitter: "https://twitter.com/priyanair",
        linkedin: "https://linkedin.com/in/priyanair"
      }
    },
    description: "Explore the ethical implications of AI and its impact on society.",
    category: "AI",
    level: "Advanced",
    duration: "6 weeks",
    price: 149,
    rating: 4.8,
    language: "English",
    enrollment: 1200,
    badges: ["Bestseller"],
    prerequisites: ["Basic AI knowledge"],
    targetAudience: ["Advanced learners", "AI researchers", "Anyone interested in AI ethics"],
    requirements: ["Laptop or desktop", "Internet connection"],
    reviews: [
      { user: "Grace", rating: 5, comment: "Excellent course!", date: "2024-05-09" },
      { user: "Frank", rating: 4, comment: "Very informative.", date: "2024-05-10" }
    ],
    relatedCourses: ["react-101", "ml-bootcamp"],
    modules: [
      {
        title: "Ethics Foundations",
        lessons: [
          {
            title: "History of AI Ethics",
            description: "How AI ethics evolved over time.",
            videoUrl: "https://www.example.com/aiethics1.mp4",
            resources: [
              { type: "pdf", label: "Ethics Timeline", url: "/resources/ai-ethics-timeline.pdf" }
            ]
          },
          {
            title: "Bias in AI",
            description: "Understanding and mitigating bias.",
            videoUrl: "https://www.example.com/aiethics2.mp4",
            resources: []
          }
        ]
      },
      {
        title: "Societal Impact",
        lessons: [
          {
            title: "AI and Law",
            description: "Legal frameworks for AI.",
            videoUrl: "https://www.example.com/aiethics3.mp4",
            resources: []
          },
          {
            title: "Future of Work",
            description: "How AI is changing jobs and skills.",
            videoUrl: "https://www.example.com/aiethics4.mp4",
            resources: []
          }
        ]
      }
    ]
  }
]; 