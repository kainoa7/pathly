import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft, 
  faGraduationCap,
  faSearch,
  faLaptopCode,
  faHeartbeat,
  faCalculator,
  faGavel,
  faFlask,
  faPalette,
  faBuilding,
  faChartLine,
  faUserMd,
  faNewspaper,
  faLanguage,
  faAtom,
  faBrain,
  faHandshake,
  faBook,
  faGlobe,
  faMusic,
  faLeaf,
  faCog,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

const MajorSelectionPage = () => {
  const navigate = useNavigate();
  const { majorId } = useParams();
  const [searchTerm, setSearchTerm] = useState('');

  const majors = [
    {
      id: 'computer-science',
      name: 'Computer Science',
      icon: faLaptopCode,
      color: 'from-blue-500 to-cyan-500',
      description: 'Study algorithms, programming, and computational systems to solve complex problems.',
      bachelorFields: [
        'Software Developer',
        'Web Developer',
        'Data Analyst',
        'Systems Administrator',
        'Cybersecurity Specialist',
        'Mobile App Developer',
        'Game Developer',
        'QA Engineer'
      ],
      masterFields: [
        'Senior Software Engineer',
        'Data Scientist',
        'Machine Learning Engineer',
        'Software Architect',
        'Cybersecurity Manager',
        'Research Scientist',
        'Product Manager (Tech)',
        'AI/ML Researcher'
      ],
      averageSalary: { bachelor: '$75,000', master: '$95,000' },
      jobGrowth: '+22% (Much faster than average)',
      topEmployers: ['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta']
    },
    {
      id: 'business-administration',
      name: 'Business Administration',
      icon: faBuilding,
      color: 'from-green-500 to-emerald-500',
      description: 'Learn management, finance, marketing, and strategic planning for business success.',
      bachelorFields: [
        'Business Analyst',
        'Marketing Coordinator',
        'Sales Representative',
        'HR Generalist',
        'Operations Assistant',
        'Customer Success Manager',
        'Account Manager',
        'Project Coordinator'
      ],
      masterFields: [
        'Management Consultant',
        'Business Development Manager',
        'Investment Banker',
        'Marketing Director',
        'Operations Manager',
        'Strategic Planner',
        'Executive Leadership',
        'Venture Capitalist'
      ],
      averageSalary: { bachelor: '$65,000', master: '$85,000' },
      jobGrowth: '+8% (As fast as average)',
      topEmployers: ['McKinsey', 'Deloitte', 'Goldman Sachs', 'JP Morgan', 'Amazon']
    },
    {
      id: 'nursing',
      name: 'Nursing',
      icon: faHeartbeat,
      color: 'from-red-500 to-pink-500',
      description: 'Provide compassionate healthcare and medical support to patients in various settings.',
      bachelorFields: [
        'Registered Nurse (RN)',
        'Emergency Room Nurse',
        'ICU Nurse',
        'Pediatric Nurse',
        'Operating Room Nurse',
        'Home Health Nurse',
        'School Nurse',
        'Psychiatric Nurse'
      ],
      masterFields: [
        'Nurse Practitioner',
        'Clinical Nurse Specialist',
        'Nurse Manager',
        'Nurse Educator',
        'Nurse Researcher',
        'Nurse Anesthetist',
        'Nurse Midwife',
        'Chief Nursing Officer'
      ],
      averageSalary: { bachelor: '$75,000', master: '$95,000' },
      jobGrowth: '+7% (Faster than average)',
      topEmployers: ['Mayo Clinic', 'Johns Hopkins', 'Kaiser Permanente', 'Cleveland Clinic', 'Mass General']
    },
    {
      id: 'engineering',
      name: 'Engineering',
      icon: faCog,
      color: 'from-orange-500 to-yellow-500',
      description: 'Design, build, and maintain systems, structures, and technologies that improve our world.',
      bachelorFields: [
        'Mechanical Engineer',
        'Civil Engineer',
        'Electrical Engineer',
        'Chemical Engineer',
        'Software Engineer',
        'Environmental Engineer',
        'Biomedical Engineer',
        'Industrial Engineer'
      ],
      masterFields: [
        'Senior Design Engineer',
        'Engineering Manager',
        'Research Engineer',
        'Principal Engineer',
        'Engineering Consultant',
        'Project Director',
        'Chief Technology Officer',
        'Engineering Professor'
      ],
      averageSalary: { bachelor: '$80,000', master: '$100,000' },
      jobGrowth: '+6% (As fast as average)',
      topEmployers: ['Boeing', 'General Electric', 'Tesla', 'Lockheed Martin', 'Intel']
    },
    {
      id: 'psychology',
      name: 'Psychology',
      icon: faBrain,
      color: 'from-purple-500 to-indigo-500',
      description: 'Study human behavior, mental processes, and psychological well-being.',
      bachelorFields: [
        'Mental Health Technician',
        'Case Manager',
        'HR Assistant',
        'Market Research Analyst',
        'Social Services Assistant',
        'Rehabilitation Specialist',
        'Community Outreach Coordinator',
        'Research Assistant'
      ],
      masterFields: [
        'Licensed Therapist',
        'Clinical Psychologist',
        'School Psychologist',
        'Industrial Psychologist',
        'Neuropsychologist',
        'Forensic Psychologist',
        'Health Psychologist',
        'Research Psychologist'
      ],
      averageSalary: { bachelor: '$50,000', master: '$75,000' },
      jobGrowth: '+3% (As fast as average)',
      topEmployers: ['Private Practice', 'Hospitals', 'Schools', 'Government', 'Research Institutions']
    },
    {
      id: 'marketing',
      name: 'Marketing',
      icon: faChartLine,
      color: 'from-pink-500 to-rose-500',
      description: 'Create strategies to promote products, services, and brands to target audiences.',
      bachelorFields: [
        'Marketing Coordinator',
        'Social Media Specialist',
        'Content Creator',
        'Digital Marketing Assistant',
        'Brand Ambassador',
        'Market Research Analyst',
        'Advertising Assistant',
        'Email Marketing Specialist'
      ],
      masterFields: [
        'Marketing Manager',
        'Brand Manager',
        'Digital Marketing Director',
        'Marketing Analytics Manager',
        'Growth Marketing Lead',
        'Product Marketing Manager',
        'Marketing Consultant',
        'Chief Marketing Officer'
      ],
      averageSalary: { bachelor: '$55,000', master: '$75,000' },
      jobGrowth: '+10% (Faster than average)',
      topEmployers: ['P&G', 'Unilever', 'Google', 'Facebook', 'Nike']
    },
    {
      id: 'finance',
      name: 'Finance',
      icon: faCalculator,
      color: 'from-emerald-500 to-teal-500',
      description: 'Manage money, investments, and financial planning for individuals and organizations.',
      bachelorFields: [
        'Financial Analyst',
        'Bank Teller',
        'Credit Analyst',
        'Insurance Agent',
        'Investment Associate',
        'Financial Advisor Trainee',
        'Accounting Clerk',
        'Loan Officer'
      ],
      masterFields: [
        'Investment Banker',
        'Portfolio Manager',
        'Financial Manager',
        'Risk Manager',
        'Corporate Finance Director',
        'Private Wealth Manager',
        'Hedge Fund Manager',
        'Chief Financial Officer'
      ],
      averageSalary: { bachelor: '$70,000', master: '$95,000' },
      jobGrowth: '+5% (As fast as average)',
      topEmployers: ['Goldman Sachs', 'JP Morgan', 'Morgan Stanley', 'BlackRock', 'Vanguard']
    },
    {
      id: 'education',
      name: 'Education',
      icon: faBook,
      color: 'from-amber-500 to-orange-500',
      description: 'Teach, inspire, and guide students of all ages in their learning journey.',
      bachelorFields: [
        'Elementary Teacher',
        'High School Teacher',
        'Special Education Teacher',
        'Substitute Teacher',
        'Teaching Assistant',
        'Tutor',
        'Educational Assistant',
        'After-School Coordinator'
      ],
      masterFields: [
        'Curriculum Specialist',
        'School Principal',
        'Educational Administrator',
        'Instructional Designer',
        'Education Policy Analyst',
        'School Counselor',
        'Educational Researcher',
        'Superintendent'
      ],
      averageSalary: { bachelor: '$50,000', master: '$65,000' },
      jobGrowth: '+8% (As fast as average)',
      topEmployers: ['Public Schools', 'Private Schools', 'Universities', 'Online Education', 'Government']
    },
    {
      id: 'biology',
      name: 'Biology',
      icon: faFlask,
      color: 'from-green-600 to-lime-500',
      description: 'Study living organisms and their interactions with the environment.',
      bachelorFields: [
        'Research Technician',
        'Laboratory Assistant',
        'Wildlife Biologist',
        'Quality Control Analyst',
        'Environmental Scientist',
        'Pharmaceutical Sales Rep',
        'Science Teacher',
        'Conservation Specialist'
      ],
      masterFields: [
        'Research Scientist',
        'Biotechnology Researcher',
        'Environmental Consultant',
        'Medical Scientist',
        'Bioinformatics Specialist',
        'Laboratory Manager',
        'Scientific Writer',
        'University Professor'
      ],
      averageSalary: { bachelor: '$55,000', master: '$75,000' },
      jobGrowth: '+5% (As fast as average)',
      topEmployers: ['Pharmaceutical Companies', 'Research Institutions', 'Government', 'Biotech Firms', 'Universities']
    },
    {
      id: 'communications',
      name: 'Communications',
      icon: faNewspaper,
      color: 'from-violet-500 to-purple-500',
      description: 'Master written, verbal, and digital communication across various media platforms.',
      bachelorFields: [
        'Social Media Coordinator',
        'Communications Assistant',
        'Content Writer',
        'Public Relations Assistant',
        'Journalist',
        'Marketing Communications Specialist',
        'Corporate Communications',
        'Event Coordinator'
      ],
      masterFields: [
        'Communications Director',
        'Public Relations Manager',
        'Corporate Communications Manager',
        'Media Relations Manager',
        'Content Strategy Director',
        'Communications Consultant',
        'Executive Communications',
        'Chief Communications Officer'
      ],
      averageSalary: { bachelor: '$50,000', master: '$70,000' },
      jobGrowth: '+6% (As fast as average)',
      topEmployers: ['Media Companies', 'PR Agencies', 'Corporations', 'Non-profits', 'Government']
    },
    {
      id: 'criminal-justice',
      name: 'Criminal Justice',
      icon: faGavel,
      color: 'from-slate-600 to-gray-600',
      description: 'Study law enforcement, legal systems, and criminal behavior to promote justice.',
      bachelorFields: [
        'Police Officer',
        'Probation Officer',
        'Correctional Officer',
        'Security Guard',
        'Court Clerk',
        'Legal Assistant',
        'Crime Scene Technician',
        'Border Patrol Agent'
      ],
      masterFields: [
        'Detective',
        'FBI Agent',
        'Criminal Investigator',
        'Forensic Specialist',
        'Criminal Justice Professor',
        'Victim Advocate',
        'Policy Analyst',
        'Justice Administrator'
      ],
      averageSalary: { bachelor: '$55,000', master: '$70,000' },
      jobGrowth: '+7% (As fast as average)',
      topEmployers: ['Police Departments', 'FBI', 'Courts', 'Correctional Facilities', 'Private Security']
    },
    {
      id: 'art-design',
      name: 'Art & Design',
      icon: faPalette,
      color: 'from-fuchsia-500 to-pink-500',
      description: 'Express creativity through visual arts, design, and multimedia creation.',
      bachelorFields: [
        'Graphic Designer',
        'Web Designer',
        'Art Teacher',
        'Museum Assistant',
        'Freelance Artist',
        'Gallery Assistant',
        'Production Artist',
        'Design Assistant'
      ],
      masterFields: [
        'Art Director',
        'Creative Director',
        'UX/UI Designer',
        'Museum Curator',
        'Art Therapist',
        'Design Consultant',
        'Art Professor',
        'Studio Artist'
      ],
      averageSalary: { bachelor: '$45,000', master: '$65,000' },
      jobGrowth: '+3% (As fast as average)',
      topEmployers: ['Design Agencies', 'Museums', 'Publishing', 'Entertainment', 'Freelance']
    },
    {
      id: 'political-science',
      name: 'Political Science',
      icon: faHandshake,
      color: 'from-blue-600 to-indigo-600',
      description: 'Study government systems, political behavior, and public policy.',
      bachelorFields: [
        'Campaign Assistant',
        'Legislative Assistant',
        'Policy Analyst',
        'Government Clerk',
        'Non-profit Coordinator',
        'Paralegal',
        'Research Assistant',
        'Community Organizer'
      ],
      masterFields: [
        'Policy Advisor',
        'Government Administrator',
        'Political Consultant',
        'Diplomat',
        'Legislative Director',
        'Think Tank Researcher',
        'Political Science Professor',
        'Campaign Manager'
      ],
      averageSalary: { bachelor: '$55,000', master: '$75,000' },
      jobGrowth: '+6% (As fast as average)',
      topEmployers: ['Government', 'Non-profits', 'Think Tanks', 'Campaigns', 'International Organizations']
    },
    {
      id: 'sociology',
      name: 'Sociology',
      icon: faGlobe,
      color: 'from-teal-500 to-cyan-500',
      description: 'Examine society, social relationships, and human behavior in groups.',
      bachelorFields: [
        'Social Worker',
        'Case Manager',
        'Community Outreach Coordinator',
        'Research Assistant',
        'Non-profit Program Assistant',
        'Human Services Worker',
        'Survey Researcher',
        'Social Services Aide'
      ],
      masterFields: [
        'Clinical Social Worker',
        'Program Director',
        'Social Research Analyst',
        'Policy Researcher',
        'Community Development Specialist',
        'Sociology Professor',
        'Grant Writer',
        'Social Services Manager'
      ],
      averageSalary: { bachelor: '$45,000', master: '$65,000' },
      jobGrowth: '+4% (As fast as average)',
      topEmployers: ['Non-profits', 'Government', 'Healthcare', 'Research Organizations', 'Universities']
    },
    {
      id: 'english',
      name: 'English',
      icon: faLanguage,
      color: 'from-red-600 to-pink-600',
      description: 'Develop writing, critical thinking, and communication skills through literature study.',
      bachelorFields: [
        'Content Writer',
        'Copy Editor',
        'Technical Writer',
        'English Teacher',
        'Editorial Assistant',
        'Marketing Coordinator',
        'Communications Specialist',
        'Publishing Assistant'
      ],
      masterFields: [
        'Editor',
        'Creative Writing Professor',
        'Communications Director',
        'Literary Agent',
        'Grant Writer',
        'Content Strategy Manager',
        'Publishing Manager',
        'Freelance Writer'
      ],
      averageSalary: { bachelor: '$48,000', master: '$65,000' },
      jobGrowth: '+2% (Slower than average)',
      topEmployers: ['Publishing', 'Media', 'Education', 'Non-profits', 'Freelance']
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      icon: faAtom,
      color: 'from-lime-500 to-green-500',
      description: 'Study matter, chemical reactions, and molecular interactions.',
      bachelorFields: [
        'Laboratory Technician',
        'Quality Control Chemist',
        'Research Assistant',
        'Chemical Sales Representative',
        'Environmental Technician',
        'Food Scientist',
        'Forensic Technician',
        'Chemistry Teacher'
      ],
      masterFields: [
        'Research Chemist',
        'Analytical Chemist',
        'Product Development Scientist',
        'Laboratory Manager',
        'Environmental Consultant',
        'Patent Examiner',
        'Chemistry Professor',
        'Pharmaceutical Researcher'
      ],
      averageSalary: { bachelor: '$60,000', master: '$80,000' },
      jobGrowth: '+5% (As fast as average)',
      topEmployers: ['Pharmaceutical Companies', 'Chemical Companies', 'Research Labs', 'Government', 'Universities']
    },
    {
      id: 'economics',
      name: 'Economics',
      icon: faChartLine,
      color: 'from-emerald-600 to-green-600',
      description: 'Analyze markets, financial systems, and economic behavior and trends.',
      bachelorFields: [
        'Economic Research Assistant',
        'Financial Analyst',
        'Data Analyst',
        'Market Research Analyst',
        'Bank Analyst',
        'Government Economist',
        'Business Analyst',
        'Investment Analyst'
      ],
      masterFields: [
        'Senior Economist',
        'Economic Consultant',
        'Financial Manager',
        'Policy Analyst',
        'Investment Manager',
        'Economic Researcher',
        'Economics Professor',
        'Central Bank Economist'
      ],
      averageSalary: { bachelor: '$65,000', master: '$85,000' },
      jobGrowth: '+6% (As fast as average)',
      topEmployers: ['Government', 'Banks', 'Consulting Firms', 'Research Organizations', 'Universities']
    },
    {
      id: 'music',
      name: 'Music',
      icon: faMusic,
      color: 'from-purple-600 to-violet-600',
      description: 'Study musical theory, performance, composition, and music education.',
      bachelorFields: [
        'Music Teacher',
        'Private Music Instructor',
        'Performer',
        'Music Therapist',
        'Audio Technician',
        'Music Store Employee',
        'Church Musician',
        'Music Camp Counselor'
      ],
      masterFields: [
        'Music Director',
        'Composer',
        'Music Professor',
        'Professional Performer',
        'Music Producer',
        'Music Therapist (Licensed)',
        'Arts Administrator',
        'Conductor'
      ],
      averageSalary: { bachelor: '$42,000', master: '$60,000' },
      jobGrowth: '+1% (Little to no change)',
      topEmployers: ['Schools', 'Performance Venues', 'Recording Studios', 'Churches', 'Freelance']
    },
    {
      id: 'environmental-science',
      name: 'Environmental Science',
      icon: faLeaf,
      color: 'from-green-500 to-emerald-600',
      description: 'Study environmental problems and develop solutions for sustainability.',
      bachelorFields: [
        'Environmental Technician',
        'Conservation Specialist',
        'Environmental Educator',
        'Park Ranger',
        'Sustainability Coordinator',
        'Environmental Consultant',
        'Water Quality Technician',
        'Waste Management Specialist'
      ],
      masterFields: [
        'Environmental Scientist',
        'Environmental Manager',
        'Climate Change Analyst',
        'Environmental Policy Analyst',
        'Conservation Scientist',
        'Environmental Consultant',
        'Research Scientist',
        'Environmental Professor'
      ],
      averageSalary: { bachelor: '$55,000', master: '$75,000' },
      jobGrowth: '+8% (Faster than average)',
      topEmployers: ['Government', 'Consulting Firms', 'Non-profits', 'Private Industry', 'Research Organizations']
    },
    {
      id: 'medicine',
      name: 'Pre-Medicine',
      icon: faUserMd,
      color: 'from-red-500 to-rose-600',
      description: 'Prepare for medical school and a career in healthcare and medicine.',
      bachelorFields: [
        'Medical Assistant',
        'Research Technician',
        'EMT/Paramedic',
        'Medical Scribe',
        'Health Educator',
        'Laboratory Technician',
        'Pharmaceutical Sales',
        'Health Coach'
      ],
      masterFields: [
        'Physician (MD/DO)',
        'Physician Assistant',
        'Medical Researcher',
        'Public Health Official',
        'Medical Science Liaison',
        'Clinical Research Coordinator',
        'Medical Writer',
        'Healthcare Administrator'
      ],
      averageSalary: { bachelor: '$50,000', master: '$200,000+' },
      jobGrowth: '+3% (As fast as average)',
      topEmployers: ['Hospitals', 'Clinics', 'Private Practice', 'Research Institutions', 'Pharmaceutical Companies']
    }
  ];

  const filteredMajors = majors.filter(major =>
    major.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedMajor = majorId ? majors.find(m => m.id === majorId) : null;

  if (selectedMajor) {
    return (
      <div className="min-h-screen bg-black text-white">
        {/* Simple background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 relative z-10">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <button
              onClick={() => navigate('/major-selection')}
              className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-6"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Back to All Majors
            </button>
          </motion.div>

          {/* Major Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className={`w-20 h-20 bg-gradient-to-r ${selectedMajor.color} rounded-xl flex items-center justify-center`}>
                <FontAwesomeIcon icon={selectedMajor.icon} className="text-white text-3xl" />
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold">{selectedMajor.name}</h1>
                <p className="text-gray-400 text-lg">{selectedMajor.description}</p>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <div className="bg-slate-900/50 rounded-xl p-6 border border-gray-600/30 text-center">
              <h3 className="text-lg font-semibold text-white mb-2">Average Salary</h3>
              <p className="text-cyan-400 font-bold">Bachelor's: {selectedMajor.averageSalary.bachelor}</p>
              <p className="text-cyan-400 font-bold">Master's: {selectedMajor.averageSalary.master}</p>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-6 border border-gray-600/30 text-center">
              <h3 className="text-lg font-semibold text-white mb-2">Job Growth</h3>
              <p className="text-green-400 font-bold">{selectedMajor.jobGrowth}</p>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-6 border border-gray-600/30 text-center">
              <h3 className="text-lg font-semibold text-white mb-2">Top Employers</h3>
              <p className="text-gray-300 text-sm">{selectedMajor.topEmployers.join(', ')}</p>
            </div>
          </motion.div>

          {/* Career Fields */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Bachelor's Fields */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-slate-900/50 rounded-xl p-8 border border-gray-600/30"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FontAwesomeIcon icon={faGraduationCap} className="text-cyan-400" />
                Bachelor's Degree Careers
              </h2>
              <div className="space-y-3">
                {selectedMajor.bachelorFields.map((field, index) => (
                  <motion.div
                    key={field}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg"
                  >
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-gray-300">{field}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Master's Fields */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-slate-900/50 rounded-xl p-8 border border-gray-600/30"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FontAwesomeIcon icon={faGraduationCap} className="text-green-400" />
                Master's Degree Careers
              </h2>
              <div className="space-y-3">
                {selectedMajor.masterFields.map((field, index) => (
                  <motion.div
                    key={field}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg"
                  >
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">{field}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center bg-slate-900/50 rounded-xl p-8 border border-cyan-500/20"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Explore {selectedMajor.name}?</h3>
            <p className="text-gray-300 mb-6">
              Take our career quiz to see if this major aligns with your interests and goals.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/onboarding')}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-white text-lg font-semibold"
            >
              <FontAwesomeIcon icon={faArrowRight} className="mr-2" />
              Take Career Quiz
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Simple background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-6"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Back
          </button>

          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
              <FontAwesomeIcon icon={faGraduationCap} className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold">Major Selection</h1>
              <p className="text-gray-400">Explore career paths for popular majors</p>
            </div>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <FontAwesomeIcon icon={faSearch} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search majors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 transition-all"
            />
          </div>
        </motion.div>

        {/* Majors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMajors.map((major, index) => (
            <motion.div
              key={major.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate(`/major-selection/${major.id}`)}
              className="bg-slate-900/50 rounded-xl p-6 border border-gray-600/30 hover:border-cyan-500/50 transition-all cursor-pointer group"
              whileHover={{ y: -5 }}
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${major.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <FontAwesomeIcon icon={major.icon} className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{major.name}</h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{major.description}</p>
              <div className="flex items-center text-cyan-400 text-sm font-medium">
                <span>Learn more</span>
                <FontAwesomeIcon icon={faArrowRight} className="ml-2 text-xs" />
              </div>
            </motion.div>
          ))}
        </div>

        {filteredMajors.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-400 text-lg">No majors found matching "{searchTerm}"</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MajorSelectionPage; 