import { z } from 'zod';

/**
 * Validation schema for weekly update creation
 */
export const WeeklyUpdateCreateSchema = z.object({
  userId: z.string()
    .min(1, 'User ID is required')
    .trim(),
  
  summary: z.string()
    .min(1, 'Summary is required')
    .max(2000, 'Summary must be less than 2000 characters')
    .trim(),
  
  html: z.string()
    .min(1, 'HTML content is required')
    .max(100000, 'HTML content must be less than 100,000 characters')
    .trim()
});

/**
 * Type for validated weekly update creation data
 */
export type WeeklyUpdateCreateData = z.infer<typeof WeeklyUpdateCreateSchema>;

/**
 * Validate weekly update creation data
 */
export const validateWeeklyUpdateCreate = (data: unknown): { 
  success: boolean; 
  data?: WeeklyUpdateCreateData; 
  errors?: string[]; 
} => {
  try {
    const validatedData = WeeklyUpdateCreateSchema.parse(data);
    
    return {
      success: true,
      data: validatedData
    };
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map(err => 
        `${err.path.join('.')}: ${err.message}`
      );
      
      return {
        success: false,
        errors
      };
    }
    
    return {
      success: false,
      errors: ['Invalid data format']
    };
  }
};

/**
 * Validation schema for user activity response
 */
export const UserActivitySchema = z.object({
  savesCount: z.number().int().min(0),
  votesCount: z.number().int().min(0),
  commentsCount: z.number().int().min(0),
  last7d: z.object({
    saves: z.number().int().min(0),
    votes: z.number().int().min(0),
    comments: z.number().int().min(0),
  }),
  profile: z.object({
    major: z.string().nullable(),
    interests: z.array(z.string()),
    goals: z.array(z.string()),
    graduationYear: z.string().nullable(),
  }).nullable()
});

/**
 * Type for user activity data
 */
export type UserActivityData = z.infer<typeof UserActivitySchema>;