interface Testimonial {
  name: string;
  role: string;
  image?: string;
  content: string;
  tag: string;
  icon: any;
  stats: string;
  companyLogo?: string;
  journey?: string;
  linkedInProfile?: string;
  verifiedDate: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Alex Chen, 22",
    role: "Software Engineer @ Google",
    content: "I was working retail, dreaming of tech but thought I needed a CS degree. Jarvus showed me it's possible! Their step-by-step roadmap and supportive community helped me land my dream job. From $15/hr to $150k+ in 18 months! 🚀",
    tag: "Career Changer",
    icon: "WorkIcon",
    stats: "150k+ first job",
    companyLogo: "/company-logos/google.svg",
    journey: "Retail → Self-taught → Google",
    linkedInProfile: "https://linkedin.com/in/alexchen",
    verifiedDate: "Verified March 2024"
  },
  {
    name: "Sarah Martinez, 19",
    role: "CS Major @ Stanford",
    content: "Choosing a major was overwhelming! 😩 Jarvus's career assessment and mentorship helped me discover my passion for CS. Now I'm thriving at Stanford and interning at Tesla. Forever grateful for this community! ⚡",
    tag: "College Student",
    icon: "SchoolIcon",
    stats: "Dream internship secured",
    companyLogo: "/company-logos/tesla.svg",
    journey: "Undecided → CS Major → Tesla Intern",
    linkedInProfile: "https://linkedin.com/in/sarahm",
    verifiedDate: "Verified February 2024"
  },
  {
    name: "Mike Johnson, 20",
    role: "Tech Startup Founder",
    content: "Was lost about my future until I found Jarvus. Their entrepreneurship track opened my eyes to startup opportunities. Now running my own tech company with seed funding! The community here is incredible 💡",
    tag: "Entrepreneur",
    icon: "TrendingUpIcon",
    stats: "Raised $1M seed round",
    journey: "Student → Jarvus → Founder",
    linkedInProfile: "https://linkedin.com/in/mikej",
    verifiedDate: "Verified January 2024"
  },
  {
    name: "Priya Patel, 24",
    role: "UX Designer @ Microsoft",
    content: "As a psychology major, I thought tech was out of reach. Jarvus's design track + portfolio guidance changed everything! Found my perfect intersection of psychology and tech in UX. You CAN switch careers! 🎨",
    tag: "Career Switcher",
    icon: "BrushIcon",
    stats: "3x salary increase",
    companyLogo: "/company-logos/microsoft.svg",
    journey: "Psychology → UX Design → Microsoft",
    linkedInProfile: "https://linkedin.com/in/priyap",
    verifiedDate: "Verified March 2024"
  }
];

export default testimonials; 