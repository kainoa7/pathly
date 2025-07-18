import { Router } from 'express';

const router = Router();

// Get all available majors
router.get('/', async (req, res) => {
  try {
    // In a real implementation, this would fetch from database
    const majors = [
      { id: '1', name: 'Computer Science', category: 'STEM' },
      { id: '2', name: 'Business Administration', category: 'Business' },
      { id: '3', name: 'Engineering', category: 'STEM' },
      { id: '4', name: 'Psychology', category: 'Social Sciences' },
      { id: '5', name: 'Economics', category: 'Business' },
      { id: '6', name: 'Marketing', category: 'Business' },
      { id: '7', name: 'Data Science', category: 'STEM' },
      { id: '8', name: 'Finance', category: 'Business' },
      { id: '9', name: 'Mechanical Engineering', category: 'STEM' },
      { id: '10', name: 'Communications', category: 'Liberal Arts' },
      { id: '11', name: 'Nursing', category: 'Healthcare' },
      { id: '12', name: 'Education', category: 'Education' },
      { id: '13', name: 'Political Science', category: 'Social Sciences' },
      { id: '14', name: 'Graphic Design', category: 'Arts' },
      { id: '15', name: 'Chemistry', category: 'STEM' }
    ];

    res.json({
      success: true,
      majors
    });

  } catch (error) {
    console.error('Error fetching majors:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

export default router; 