import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Stepper,
  Step,
  StepLabel,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useUserStore } from '../../state/user';
import { track } from '../../lib/analytics';

interface OnboardingModalProps {
  open: boolean;
  onClose: () => void;
}

const INTEREST_OPTIONS = [
  'AI & Machine Learning',
  'Software Engineering',
  'Product Management',
  'Cybersecurity',
  'Data Science',
  'UI/UX Design',
  'DevOps',
  'Mobile Development',
];

const GRADUATION_YEARS = Array.from(
  { length: 10 }, 
  (_, i) => new Date().getFullYear() + i - 2
);

const steps = ['Basics', 'Interests', 'Goals'];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ open, onClose }) => {
  const theme = useTheme();
  const { updateProfile, isLoading, error } = useUserStore();
  
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    major: '',
    graduationYear: new Date().getFullYear(),
    interests: [] as string[],
    goals: '',
  });
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateCurrentStep = (): boolean => {
    const errors: string[] = [];
    
    switch (activeStep) {
      case 0: // Basics
        if (!formData.major.trim()) {
          errors.push('Major is required');
        } else if (formData.major.length > 200) {
          errors.push('Major must be less than 200 characters');
        }
        
        if (formData.graduationYear < 1900 || formData.graduationYear > 2050) {
          errors.push('Please select a valid graduation year');
        }
        break;
        
      case 1: // Interests
        if (formData.interests.length === 0) {
          errors.push('Please select at least one interest');
        } else if (formData.interests.length > 8) {
          errors.push('Please select at most 8 interests');
        }
        break;
        
      case 2: // Goals
        if (!formData.goals.trim()) {
          errors.push('Goals are required');
        } else if (formData.goals.length > 1000) {
          errors.push('Goals must be less than 1000 characters');
        }
        break;
    }
    
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (activeStep === steps.length - 1) {
        handleSubmit();
      } else {
        setActiveStep((prev) => prev + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
    setValidationErrors([]);
  };

  const handleSubmit = async () => {
    try {
      setSubmitError(null);
      
      await updateProfile({
        major: formData.major.trim(),
        graduationYear: formData.graduationYear,
        interests: formData.interests,
        goals: formData.goals.trim(),
        onboardingComplete: true,
      });

      // Track onboarding completion
      track('Onboarding Complete', {
        major: formData.major.trim(),
        graduationYear: formData.graduationYear,
        interestsCount: formData.interests.length,
      });

      // Show success and close modal
      onClose();
      
      // You might want to show a toast here
      console.log('Onboarding completed successfully!');
      
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to save profile');
    }
  };

  const handleInterestChange = (event: any) => {
    const value = event.target.value;
    setFormData(prev => ({
      ...prev,
      interests: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0: // Basics
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
            <TextField
              fullWidth
              label="Major / Field of Study"
              value={formData.major}
              onChange={(e) => setFormData(prev => ({ ...prev, major: e.target.value }))}
              placeholder="e.g., Computer Science, Business Administration"
              variant="outlined"
            />
            
            <FormControl fullWidth>
              <InputLabel>Expected Graduation Year</InputLabel>
              <Select
                value={formData.graduationYear}
                onChange={(e) => setFormData(prev => ({ ...prev, graduationYear: Number(e.target.value) }))}
                label="Expected Graduation Year"
              >
                {GRADUATION_YEARS.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        );

      case 1: // Interests
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
              Select the areas you're most interested in (up to 8):
            </Typography>
            
            <FormControl fullWidth>
              <InputLabel>Interests</InputLabel>
              <Select
                multiple
                value={formData.interests}
                onChange={handleInterestChange}
                input={<OutlinedInput label="Interests" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} size="small" />
                    ))}
                  </Box>
                )}
              >
                {INTEREST_OPTIONS.map((interest) => (
                  <MenuItem key={interest} value={interest}>
                    {interest}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        );

      case 2: // Goals
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
              Tell us about your career goals and what you hope to achieve:
            </Typography>
            
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Your Goals"
              value={formData.goals}
              onChange={(e) => setFormData(prev => ({ ...prev, goals: e.target.value }))}
              placeholder="e.g., I want to become a software engineer at a tech company and work on AI projects..."
              variant="outlined"
            />
            
            <Typography variant="caption" sx={{ mt: 1, color: 'text.secondary' }}>
              {formData.goals.length}/1000 characters
            </Typography>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={() => {}} // Prevent closing until completed
      maxWidth="sm" 
      fullWidth
      disableEscapeKeyDown
    >
      <DialogTitle>
        <Typography variant="h5" component="h2" align="center">
          Welcome to JARVUS! 🚀
        </Typography>
        <Typography variant="body2" align="center" sx={{ mt: 1, color: 'text.secondary' }}>
          Let's personalize your experience
        </Typography>
      </DialogTitle>
      
      <DialogContent sx={{ pb: 3 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {renderStepContent()}

        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <Alert severity="error" sx={{ mt: 2 }}>
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </Alert>
        )}

        {/* Submit Error */}
        {submitError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {submitError}
          </Alert>
        )}

        {/* Error from store */}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            onClick={handleBack}
            disabled={activeStep === 0 || isLoading}
            variant="outlined"
          >
            Back
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={isLoading}
            variant="contained"
            startIcon={isLoading ? <CircularProgress size={16} /> : null}
          >
            {activeStep === steps.length - 1 ? 'Complete Setup' : 'Next'}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};