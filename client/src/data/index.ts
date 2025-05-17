export interface Experience {
  id: number;
  company: string;
  position: string;
  period: string;
  description: string;
  projects?: Project[];
}

export interface Project {
  id: number;
  title: string;
  category: string;
  company: string;
  year: string;
  situation?: string;
  task?: string;
  action?: string;
  result?: string;
  technologies: string[];
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  level?: number; // 0-100
}

export interface SkillCategory {
  id: number;
  name: string;
  skills: Skill[];
}

export interface Service {
  id: number;
  icon: string;
  title: string;
  description: string;
  features: string[];
  price: string;
}

export interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  testimonial: string;
  rating: number; // 1-5
}

export interface BlogPost {
  id: number;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
  views?: number;
  comments?: number;
}

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string; // full-time, contract, etc.
  description: string;
  requirements: string[];
  salary?: string;
  logo: string;
  datePosted: string;
}

// Experiences data
export const experiences: Experience[] = [
  {
    id: 1,
    company: "Sirrus.ai, Yukio, Ziki",
    position: "Associate Director - AI",
    period: "Apr 2024 - Present",
    description: "Leading AI innovation through multiple projects including conversational AI assistants, automated brochure generation, and trust & safety systems for community platforms.",
    projects: [
      {
        id: 1,
        title: "Conversational AI Assistant in Service Commerce",
        category: "GenAI",
        company: "Sirrus.ai",
        year: "2024",
        situation: "Led development of intelligent conversational AI for service commerce to enhance customer engagement and streamline bookings.",
        task: "Design and deploy multi-agentic conversational AI framework with state management to interpret user intent, maintain context, and integrate with business systems.",
        action: "Led a team of 6 AI/ML engineers delivering GenAI applications, I architected multi-agentic framework using GPT-3.5 Turbo and Gemini 2.5 Flash with API connectivity. Developed custom LLAMA 3.1 7b model for stateful conversations.",
        result: "Delivered end-to-end AI assistant that enhanced customer journey, achieving 30% adoption and 10x faster booking completion.",
        technologies: ["GPT-3.5 Turbo", "Gemini 2.5 Flash", "LLAMA 3.1 7b", "State Management"]
      },
      {
        id: 2,
        title: "Automated Personalized Brochure Generation",
        category: "GenAI",
        company: "Sirrus.ai",
        year: "2024",
        situation: "Real estate developers needed efficient, high-quality customized marketing materials for different customer segments.",
        task: "Create system to generate personalized brochures with tailored text and images for specific developers and customers.",
        action: "Led a team of 6 AI/ML engineers. Implemented text generation with Mistral 7BX8 LLM for brand-aligned content. Integrated Midjourney and Google's ImageGen for industry-standard visuals.",
        result: "Successfully deployed AI product representing brand identity for three renowned developers with highly personalized marketing materials.",
        technologies: ["Mistral 7BX8", "Midjourney", "Google ImageGen", "Content Personalization"]
      },
      {
        id: 3,
        title: "Trust & Safety AI for Real Estate Society Community Forums",
        category: "GenAI",
        company: "Sirrus.ai",
        year: "2024",
        situation: "Real estate society community forums faced significant challenges in moderating content to ensure a safe, respectful, and compliant environment.",
        task: "Develop an AI-powered safety and moderation system to enhance real-time detection of inappropriate content.",
        action: "Led a team of AI/ML engineers to design and implement the system. Developed Agentic AI, a comprehensive moderation system that checks for 25+ violation categories. Integrated Llama 3.2 & Gemini 2.3 Flash for accurate detection.",
        result: "Reduced inappropriate content by 45%, improved compliance with community guidelines by 50%, and enhanced overall trust and safety standards.",
        technologies: ["Llama 3.2", "Gemini 2.3 Flash", "Agentic AI", "Content Moderation"]
      }
    ]
  },
  {
    id: 2,
    company: "Bajaj FinServ",
    position: "National Lead – AI/ML",
    period: "May 2023 - Apr 2024",
    description: "Led a team of 12 professionals, optimizing contact center operations, enhancing personal loan propensity, and implementing advanced credit risk analytics.",
    projects: [
      {
        id: 4,
        title: "Contact Centre Operations Optimization",
        category: "LLMs",
        company: "Bajaj FinServ",
        year: "2023",
        situation: "Need to enhance lead generation through AI technologies.",
        task: "Optimize contact center operations using large language models.",
        action: "Enhanced lead generation by integrating Large Language Models (LLMs) such as GPT-2, LLAMA, and FLAN-T5. Pioneered in developing agent training programs through innovative zero and few-shot learning techniques.",
        result: "Significantly improved lead generation and contact center efficiency.",
        technologies: ["GPT-2", "LLAMA", "FLAN-T5", "Prompt Engineering", "PEFT"]
      },
      {
        id: 5,
        title: "Credit Risk Analytics",
        category: "ML",
        company: "Bajaj FinServ",
        year: "2023-2024",
        situation: "Need for improved credit risk management.",
        task: "Control credit risk while maintaining key Risk KPIs.",
        action: "Effectively controlled credit risk, maintaining key Risk KPIs such as FEMI, CBB, 0+6MOB, and 3MOB. Enhanced amount loss management and collection efficiency.",
        result: "Built a robust risk management framework with improved collection efficiency.",
        technologies: ["Risk Management", "Predictive Analytics", "Data Integration"]
      }
    ]
  },
  {
    id: 3,
    company: "Citibank",
    position: "AVP – Data Science",
    period: "Aug 2018 - Dec 2022",
    description: "Developed innovative deep learning solutions for image recognition and implemented NLP strategies for regulatory compliance in banking.",
    projects: [
      {
        id: 6,
        title: "Deep Learning Image Recognition Solution",
        category: "CV",
        company: "Citibank",
        year: "2018-2022",
        situation: "Challenge of automating the matching of handwritten checks, including the dollar amount and signature verification.",
        task: "Develop system to accurately interpret human handwriting on payment and deposit checks.",
        action: "Developed and trained Convolutional Neural Networks (CNN) and Bidirectional Recurrent Neural Networks (RNN) models to create a sophisticated in-house Optical Character Recognition system.",
        result: "Successfully achieved an automated system that accurately processes approximately 80% of payment and deposit checks.",
        technologies: ["CNN", "RNN", "OCR", "Computer Vision"]
      },
      {
        id: 7,
        title: "NLP Implementation in Banking",
        category: "NLP",
        company: "Citibank",
        year: "2018-2022",
        situation: "Banks faced substantial financial penalties due to regulatory non-compliance.",
        task: "Develop system to analyze text transcripts and enforce regulatory compliance.",
        action: "Utilized Natural Language Processing (NLP) techniques and integrated Generative AI and LLMs for detecting profanity, misinformation, financial fraud, and fraud in digital communications.",
        result: "Reduced regulatory compliance issues and associated penalties.",
        technologies: ["NLP", "Text Analysis", "Regulatory Compliance", "Generative AI"]
      }
    ]
  }
];

// Skills data
export const skillCategories: SkillCategory[] = [
  {
    id: 1,
    name: "Programming Languages & Scripting",
    skills: [
      { id: 1, name: "Python", category: "language", level: 95 },
      { id: 2, name: "R", category: "language", level: 85 },
      { id: 3, name: "Bash", category: "language", level: 80 },
      { id: 4, name: "Unix", category: "language", level: 82 },
      { id: 5, name: "TensorFlow", category: "framework", level: 90 },
      { id: 6, name: "PyTorch", category: "framework", level: 88 },
      { id: 7, name: "Pyspark", category: "framework", level: 85 }
    ]
  },
  {
    id: 2,
    name: "Machine Learning & AI",
    skills: [
      { id: 8, name: "Regression Analysis", category: "technique", level: 97 },
      { id: 9, name: "Classification Techniques", category: "technique", level: 95 },
      { id: 10, name: "Support Vector Machines", category: "algorithm", level: 90 },
      { id: 11, name: "Random Forest Algorithms", category: "algorithm", level: 92 },
      { id: 12, name: "Bayesian Models", category: "algorithm", level: 88 },
      { id: 13, name: "Recommendation Systems", category: "application", level: 94 }
    ]
  },
  {
    id: 3,
    name: "Deep Learning Technologies",
    skills: [
      { id: 14, name: "BERT", category: "model", level: 96 },
      { id: 15, name: "Recurrent Neural Networks", category: "architecture", level: 95 },
      { id: 16, name: "LSTM Networks", category: "architecture", level: 97 },
      { id: 17, name: "Convolutional Neural Networks", category: "architecture", level: 93 },
      { id: 18, name: "Sequential Modelling", category: "technique", level: 90 },
      { id: 19, name: "Computer Vision", category: "application", level: 91 }
    ]
  },
  {
    id: 4,
    name: "Large Language & Visual Models",
    skills: [
      { id: 20, name: "LLAMA Models", category: "llm", level: 94 },
      { id: 21, name: "OpenAI Models", category: "llm", level: 92 },
      { id: 22, name: "Google Models (Gemini)", category: "llm", level: 93 },
      { id: 23, name: "Image Generation", category: "visual", level: 88 },
      { id: 24, name: "Hugging Face Models", category: "platform", level: 90 },
      { id: 25, name: "Prompt Engineering", category: "technique", level: 95 }
    ]
  }
];

// Areas of expertise
export const expertiseAreas = [
  "Agentic AI", "Trust & Safety", "LLM Finetuning", "NLP", "Credit Risk Analytics", 
  "AI Project Leadership", "Responsible AI", "Market Segmentation", "Strategic Planning",
  "A/B Testing", "Marketing Optimization", "Content Moderation", "Brand Evaluation",
  "Fraud Detection", "Propensity Modelling", "Recommender Systems"
];

// Services data
export const services: Service[] = [
  {
    id: 1,
    icon: "fa-brain",
    title: "AI Strategy Consulting",
    description: "Develop a comprehensive AI roadmap aligned with your business objectives. From opportunity assessment to implementation planning.",
    features: [
      "Strategic opportunity assessment",
      "Competitive landscape analysis",
      "Technology selection guidance",
      "Implementation roadmap"
    ],
    price: "$750/session"
  },
  {
    id: 2,
    icon: "fa-cogs",
    title: "GenAI Implementation",
    description: "Expert guidance on implementing generative AI solutions for your specific business needs, from concept to deployment.",
    features: [
      "Use case definition and prioritization",
      "Model selection and fine-tuning",
      "Integration architecture design",
      "Performance optimization"
    ],
    price: "$3,500/week"
  },
  {
    id: 3,
    icon: "fa-chalkboard-teacher",
    title: "AI/ML Training & Workshops",
    description: "Customized training programs to upskill your team on the latest AI/ML technologies and best practices.",
    features: [
      "Fundamentals of ML & AI",
      "Hands-on LLM fine-tuning",
      "Prompt engineering techniques",
      "Responsible AI practices"
    ],
    price: "$5,000/workshop"
  },
  {
    id: 4,
    icon: "fa-shield-alt",
    title: "Trust & Safety AI Systems",
    description: "Build AI-powered content moderation and safety systems to protect your platform and users from harmful content.",
    features: [
      "Policy development",
      "Model training & deployment",
      "Real-time monitoring",
      "Escalation workflows"
    ],
    price: "$4,500/project"
  },
  {
    id: 5,
    icon: "fa-robot",
    title: "LLM Fine-tuning",
    description: "Custom-tune large language models to your specific domain and use cases for optimal performance.",
    features: [
      "Model selection",
      "Training data preparation",
      "Fine-tuning process",
      "Evaluation & optimization"
    ],
    price: "$6,000/model"
  },
  {
    id: 6,
    icon: "fa-user-tie",
    title: "Executive AI Coaching",
    description: "One-on-one coaching for executives on AI strategy, implementation, and organizational transformation.",
    features: [
      "Personal AI roadmap",
      "Leadership strategies",
      "Technical knowledge transfer",
      "Implementation guidance"
    ],
    price: "$400/hour"
  }
];

// Testimonials data
export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "CTO",
    company: "TechVision Inc.",
    testimonial: "Puneet's strategic guidance helped us transform our approach to AI. His expertise in generative models was instrumental in launching our new product.",
    rating: 5
  },
  {
    id: 2,
    name: "Rajiv Mehta",
    position: "VP Engineering",
    company: "FinTech Solutions",
    testimonial: "The AI implementation workshop was exactly what our team needed. Clear explanations of complex concepts and practical guidance for real-world applications.",
    rating: 4.5
  },
  {
    id: 3,
    name: "Michael Chen",
    position: "CEO",
    company: "AI Startup",
    testimonial: "Puneet's consultation helped us navigate the complex landscape of AI models and select the right approach. His insights saved us months of trial and error.",
    rating: 5
  }
];

// Blog posts data
export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Principles of Responsible Agentic AI",
    category: "AI Ethics",
    date: "June 15, 2024",
    excerpt: "As agentic AI systems become more autonomous, establishing ethical guardrails becomes crucial. This article explores key principles for responsible implementation.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    views: 245,
    comments: 18
  },
  {
    id: 2,
    title: "Advanced LLM Fine-tuning Techniques for Specific Domains",
    category: "LLMs",
    date: "May 28, 2024",
    excerpt: "Fine-tuning large language models for specialized domains can dramatically improve performance. Learn advanced techniques beyond basic LoRA approaches.",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    views: 189,
    comments: 12
  },
  {
    id: 3,
    title: "The Future of AI-Human Collaboration in Creative Work",
    category: "GenAI",
    date: "April 10, 2024",
    excerpt: "Generative AI is transforming creative workflows across industries. Discover how professionals are leveraging these tools while maintaining creative control.",
    image: "https://pixabay.com/get/ge3e3ad7478414b258857cd0c6c2d8f00fd5583c46df64ef01ad9b35621f6cd112a0cdd6158457f26a42e0b72778f8aec81be18b2c453922f2b411974b7fbc669_1280.jpg",
    views: 215,
    comments: 23
  }
];

// Jobs data
export const jobs: Job[] = [
  {
    id: 1,
    title: "Senior AI/ML Engineer",
    company: "Google",
    location: "Mountain View, CA (Hybrid)",
    type: "Full-time",
    description: "Build and optimize ML models for Google's next-generation AI products. Experience with TensorFlow, PyTorch, and LLMs required.",
    requirements: ["TensorFlow", "PyTorch", "LLMs", "5+ Years"],
    salary: "$180K-$250K",
    logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64",
    datePosted: "2 days ago"
  },
  {
    id: 2,
    title: "Lead AI Safety Researcher",
    company: "OpenAI",
    location: "San Francisco, CA (Remote Possible)",
    type: "Full-time",
    description: "Research and develop methods to ensure AI systems behave safely and align with human values. Lead a team of safety researchers.",
    requirements: ["AI Safety", "LLMs", "Research", "PhD"],
    salary: "$200K-$300K",
    logo: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64",
    datePosted: "1 week ago"
  },
  {
    id: 3,
    title: "GenAI Product Manager",
    company: "Meta",
    location: "Remote",
    type: "Full-time",
    description: "Lead product strategy for Meta's generative AI initiatives. Collaborate with ML researchers, engineers, and designers.",
    requirements: ["GenAI", "Product Management", "Strategy", "7+ Years"],
    salary: "$160K-$230K",
    logo: "https://images.unsplash.com/photo-1670272505340-d906d8d77d03?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64",
    datePosted: "3 days ago"
  },
  {
    id: 4,
    title: "AI/ML Technical Director",
    company: "AI Innovations",
    location: "Bangalore, India",
    type: "Full-time",
    description: "Direct the technical strategy and implementation of AI solutions. Lead a growing team of ML engineers and data scientists.",
    requirements: ["Technical Leadership", "ML Engineering", "Cloud", "10+ Years"],
    salary: "₹40-60 LPA",
    logo: "https://images.unsplash.com/photo-1569012871812-f38ee64cd54c?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64",
    datePosted: "1 day ago"
  }
];

// Personal info
export const personalInfo = {
  name: "Puneet Sinha",
  title: "AI/ML Leader",
  email: "puneetsinha@yahoo.com",
  phone: "+91 888 883 5462",
  location: "Mumbai, Maharashtra, India",
  linkedin: "https://www.linkedin.com/in/puneetsinhads/",
  github: "https://github.com/puneetsinha",
  kaggle: "https://www.kaggle.com/puneetsinha",
  stackoverflow: "https://stackoverflow.com/users/2572745/puneet-sinha",
  huggingface: "https://huggingface.co/puneetsin",
  profileImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
  about: "Seeking an opportunity to lead AI innovation as Head of AI/ML or SVP – Agentic AI Systems in a product-led enterprise. Dynamic and innovative Data Science Leader with over 15 years of experience specializing in GenAI, Deep Learning, and ML technologies. Proven expertise in developing advanced data-driven solutions that generate actionable insights and business value. Adept at leading cross-functional teams and driving organizational growth through data science excellence. Passionate about integrating emerging Agentic AI, GenAI, and LLM architectures to solve complex business challenges."
};

// Key highlights
export const highlights = [
  "Filed patent 'ADAPTIVE AI FOR PROACTIVE USER ENGAGEMENT AND RETENTION' (ref: 31727/P-3) for innovative engagement techniques.",
  "Conference paper accepted submitted to ICTACS-2024 will be published in SN journal in December.",
  "Pioneered a Transformer(attention) Model published on 'Truculent Post Analysis for Hindi Text' using BERT and LSTM in EAI.EU.",
  "Expert in building and deploying ML/Deep Learning algorithms for various applications including OCR and NLP.",
  "Successful track record in optimizing contact centre operations using Large Language Models (LLMs), Visual Models, and Audio Models.",
  "Demonstrated ability in Credit Risk analytics and market segment analysis, leading to significant business improvement.",
  "Technical reviewer of 2 Springer publication in field of ML/AI."
];
