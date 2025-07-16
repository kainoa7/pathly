// EmailJS configuration
export const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY',
  SERVICE_ID: 'YOUR_SERVICE_ID',
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID'
};

// Email template structure for reference
export interface EmailTemplate {
  to_email: string;
  from_email: string;
  subject: string;
  message: string;
} 