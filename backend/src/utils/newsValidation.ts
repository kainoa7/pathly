import { z } from 'zod';
import { NewsCategory } from '@prisma/client';

/**
 * Valid news categories mapping
 */
const NEWS_CATEGORIES = Object.values(NewsCategory);

/**
 * Validation schema for news article import
 */
export const NewsImportSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(500, 'Title must be less than 500 characters')
    .trim(),
  
  url: z.string()
    .url('Must be a valid URL')
    .max(1000, 'URL must be less than 1000 characters')
    .trim(),
  
  summary: z.string()
    .min(1, 'Summary is required')
    .max(2000, 'Summary must be less than 2000 characters')
    .trim(),
  
  category: z.string()
    .min(1, 'Category is required')
    .trim(),
  
  source: z.string()
    .min(1, 'Source is required')
    .max(200, 'Source must be less than 200 characters')
    .trim(),
  
  publishedAt: z.string()
    .refine((val) => {
      const date = new Date(val);
      return !isNaN(date.getTime());
    }, 'publishedAt must be a valid ISO date string')
});

/**
 * Type for validated news import data
 */
export type NewsImportData = z.infer<typeof NewsImportSchema>;

/**
 * Type for processed news import data with normalized fields
 */
export interface ProcessedNewsImportData {
  title: string;
  url: string;
  summary: string;
  category: NewsCategory;
  source: string;
  publishedAt: Date;
  content: string; // Will be set to summary for now
}

/**
 * Validate and process news import data
 */
export const validateAndProcessNewsImport = (data: unknown): { 
  success: boolean; 
  data?: ProcessedNewsImportData; 
  errors?: string[]; 
} => {
  try {
    // Validate with zod schema
    const validatedData = NewsImportSchema.parse(data);
    
    // Process category - map to enum or default to TECH
    let category: NewsCategory;
    const upperCategory = validatedData.category.toUpperCase();
    
    if (NEWS_CATEGORIES.includes(upperCategory as NewsCategory)) {
      category = upperCategory as NewsCategory;
    } else {
      // Default to TECH for unknown categories, or you could reject
      category = NewsCategory.TECH;
      console.warn(`Unknown category '${validatedData.category}', defaulting to TECH`);
    }
    
    // Process published date
    const publishedAt = new Date(validatedData.publishedAt);
    
    // Create processed data
    const processedData: ProcessedNewsImportData = {
      title: validatedData.title,
      url: validatedData.url,
      summary: validatedData.summary,
      category,
      source: validatedData.source,
      publishedAt,
      content: validatedData.summary, // Use summary as content for now
    };
    
    return {
      success: true,
      data: processedData
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
 * Helper to check if category is valid NewsCategory enum
 */
export const isValidNewsCategory = (category: string): category is NewsCategory => {
  return NEWS_CATEGORIES.includes(category.toUpperCase() as NewsCategory);
};