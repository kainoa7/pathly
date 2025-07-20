export interface MockEmail {
  id: string;
  subject: string;
  from: string;
  date: string;
  snippet: string;
  body: string;
  labels: string[];
  isRead: boolean;
  priority: number; // 1-10 scale
  category: 'job' | 'networking' | 'interview' | 'rejection' | 'offer' | 'general';
}

export const mockEmails: MockEmail[] = [
  {
    id: "email_001",
    subject: "Software Engineer Position - Netflix",
    from: "recruiter@netflix.com",
    date: "2025-07-19T14:30:00Z",
    snippet: "Thank you for your interest in the Software Engineer position at Netflix...",
    body: `Hi Kainoa,

Thank you for your interest in the Software Engineer position at Netflix. We were impressed by your background in full-stack development and your experience with React and Node.js.

We'd like to schedule a technical interview for next week. Are you available for a 90-minute session on Tuesday or Wednesday?

The interview will cover:
- System design fundamentals
- JavaScript/TypeScript proficiency
- React best practices
- API design

Please let me know your availability.

Best regards,
Sarah Johnson
Senior Technical Recruiter
Netflix`,
    labels: ["INBOX", "IMPORTANT"],
    isRead: false,
    priority: 9,
    category: "interview"
  },
  {
    id: "email_002", 
    subject: "RE: Coffee Chat - AI Startup Discussion",
    from: "john.doe@openai.com",
    date: "2025-07-18T10:15:00Z",
    snippet: "Thanks for reaching out! I'd love to chat about opportunities in AI...",
    body: `Hey Kainoa,

Thanks for reaching out! I'd love to chat about opportunities in AI and machine learning. Your work on JARVUS sounds fascinating.

I'm free for coffee this Friday around 2 PM at Blue Bottle in SOMA. We can discuss:
- Current AI trends
- Career paths in ML
- Potential collaboration opportunities
- Tips for breaking into top AI companies

Looking forward to meeting you!

Best,
John Doe
AI Research Engineer
OpenAI`,
    labels: ["INBOX"],
    isRead: true,
    priority: 8,
    category: "networking"
  },
  {
    id: "email_003",
    subject: "Application Status Update - Google",
    from: "noreply@google.com",
    date: "2025-07-17T16:45:00Z",
    snippet: "Thank you for your application to Google. After careful consideration...",
    body: `Dear Kainoa,

Thank you for your application to Google for the Software Engineer, Full Stack position. After careful consideration of your background and qualifications, we have decided to move forward with other candidates at this time.

This decision was not easy, as we received many strong applications. We encourage you to apply for future positions that match your interests and qualifications.

We wish you the best of luck in your job search.

Sincerely,
Google Recruiting Team`,
    labels: ["INBOX"],
    isRead: true,
    priority: 6,
    category: "rejection"
  },
  {
    id: "email_004",
    subject: "Invitation to Join Our Team - Meta",
    from: "careers@meta.com", 
    date: "2025-07-16T11:20:00Z",
    snippet: "Congratulations! We're excited to extend an offer for the Software Engineer position...",
    body: `Dear Kainoa,

Congratulations! We're excited to extend an offer for the Software Engineer position at Meta.

Offer Details:
- Position: Software Engineer, Level E4
- Base Salary: $165,000
- Signing Bonus: $50,000
- Annual Bonus Target: 15%
- RSU Grant: $120,000 (vesting over 4 years)
- Start Date: August 15, 2025

This offer is contingent upon successful completion of background checks and reference verification.

Please review the attached offer letter and let us know your decision by July 25, 2025.

Welcome to the Meta family!

Best regards,
Lisa Chen
Senior Recruiter
Meta`,
    labels: ["INBOX", "IMPORTANT", "STARRED"],
    isRead: false,
    priority: 10,
    category: "offer"
  },
  {
    id: "email_005",
    subject: "Tech Talk: Building Scalable Web Applications",
    from: "events@techcrunch.com",
    date: "2025-07-15T09:30:00Z",
    snippet: "Join us for an exclusive tech talk on building scalable web applications...",
    body: `Hi there,

Join us for an exclusive tech talk on building scalable web applications with React and Node.js.

Event Details:
- Date: July 28, 2025
- Time: 6:00 PM - 8:00 PM PST
- Location: TechCrunch HQ, San Francisco
- Speaker: Sarah Kim, Principal Engineer at Airbnb

Topics covered:
- Microservices architecture
- React performance optimization
- Database scaling strategies
- DevOps best practices

Free pizza and networking afterwards!

RSVP: techcrunch.com/events/scalable-web-apps

See you there!
TechCrunch Events Team`,
    labels: ["INBOX"],
    isRead: true,
    priority: 5,
    category: "general"
  },
  {
    id: "email_006",
    subject: "Follow-up: Tesla Interview",
    from: "recruiting@tesla.com",
    date: "2025-07-14T15:00:00Z",
    snippet: "Thank you for taking the time to interview with our team yesterday...",
    body: `Hi Kainoa,

Thank you for taking the time to interview with our team yesterday. We were impressed by your technical skills and passion for sustainable technology.

We're currently reviewing all candidates and will make a decision by the end of this week. We'll reach out with next steps soon.

In the meantime, feel free to reach out if you have any questions about the role or Tesla's mission.

Best regards,
Michael Rodriguez
Engineering Manager
Tesla`,
    labels: ["INBOX"],
    isRead: false,
    priority: 7,
    category: "interview"
  }
];

export const getMockEmailStats = () => ({
  total: mockEmails.length,
  unread: mockEmails.filter(email => !email.isRead).length,
  highPriority: mockEmails.filter(email => email.priority >= 8).length,
  categories: {
    job: mockEmails.filter(email => email.category === 'job').length,
    networking: mockEmails.filter(email => email.category === 'networking').length,
    interview: mockEmails.filter(email => email.category === 'interview').length,
    rejection: mockEmails.filter(email => email.category === 'rejection').length,
    offer: mockEmails.filter(email => email.category === 'offer').length,
    general: mockEmails.filter(email => email.category === 'general').length,
  }
}); 