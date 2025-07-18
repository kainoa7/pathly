import { Router } from 'express';

const router = Router();

// Get salary projections for major comparison
router.get('/', async (req, res) => {
  try {
    const { major1, major2 } = req.query;

    if (!major1 || !major2) {
      return res.status(400).json({
        success: false,
        message: 'Both major1 and major2 parameters are required'
      });
    }

    // Mock salary data - in real implementation, this would come from database/external API
    const salaryMap: { [key: string]: { name: string; baseSalary: number; growthRate: number } } = {
      '1': { name: 'Computer Science', baseSalary: 75000, growthRate: 0.08 },
      '2': { name: 'Business Administration', baseSalary: 55000, growthRate: 0.05 },
      '3': { name: 'Engineering', baseSalary: 70000, growthRate: 0.06 },
      '4': { name: 'Psychology', baseSalary: 45000, growthRate: 0.04 },
      '5': { name: 'Economics', baseSalary: 65000, growthRate: 0.06 },
      '6': { name: 'Marketing', baseSalary: 50000, growthRate: 0.05 },
      '7': { name: 'Data Science', baseSalary: 80000, growthRate: 0.09 },
      '8': { name: 'Finance', baseSalary: 60000, growthRate: 0.07 },
      '9': { name: 'Mechanical Engineering', baseSalary: 68000, growthRate: 0.06 },
      '10': { name: 'Communications', baseSalary: 42000, growthRate: 0.04 },
      '11': { name: 'Nursing', baseSalary: 55000, growthRate: 0.05 },
      '12': { name: 'Education', baseSalary: 40000, growthRate: 0.03 },
      '13': { name: 'Political Science', baseSalary: 48000, growthRate: 0.04 },
      '14': { name: 'Graphic Design', baseSalary: 45000, growthRate: 0.04 },
      '15': { name: 'Chemistry', baseSalary: 58000, growthRate: 0.05 }
    };

    const major1Data = salaryMap[major1 as string];
    const major2Data = salaryMap[major2 as string];

    if (!major1Data || !major2Data) {
      return res.status(400).json({
        success: false,
        message: 'Invalid major IDs provided'
      });
    }

    // Generate 10-year salary projections
    const comparison = [];
    for (let year = 1; year <= 10; year++) {
      const major1Salary = Math.round(major1Data.baseSalary * Math.pow(1 + major1Data.growthRate, year - 1));
      const major2Salary = Math.round(major2Data.baseSalary * Math.pow(1 + major2Data.growthRate, year - 1));

      comparison.push({
        year,
        major1Salary,
        major2Salary,
        major1Name: major1Data.name,
        major2Name: major2Data.name
      });
    }

    res.json({
      success: true,
      comparison,
      metadata: {
        major1: {
          id: major1,
          name: major1Data.name,
          baseSalary: major1Data.baseSalary,
          growthRate: major1Data.growthRate
        },
        major2: {
          id: major2,
          name: major2Data.name,
          baseSalary: major2Data.baseSalary,
          growthRate: major2Data.growthRate
        }
      }
    });

  } catch (error) {
    console.error('Error fetching salary projections:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

export default router; 