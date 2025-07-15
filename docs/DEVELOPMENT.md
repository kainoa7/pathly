# Development Guide

## Getting Started
1. Clone the repository
2. Run `npm install`
3. Run `npm run dev` for development server

## Project Structure
```
src/
  ├── components/   # React components
  ├── data/        # Static data and configurations
  ├── types/       # TypeScript type definitions
  ├── utils/       # Shared utilities and helpers
  └── assets/      # Static assets
```

## Code Style
- Use TypeScript for all new files
- Follow React functional component patterns
- Use CSS modules or Tailwind for styling
- Keep components focused and small
- Document complex logic with comments

## Component Guidelines
1. Break down components when they exceed 200 lines
2. Use TypeScript props interface for all components
3. Implement error boundaries for top-level components
4. Add loading states and error states
5. Document component props and usage

## State Management
- Use React hooks for component state
- Consider context for shared state
- Document state updates and side effects
- Use TypeScript for state definitions

## Testing
- Write tests for utility functions
- Add component tests for complex UI
- Test error cases and edge cases
- Document test coverage goals

## Performance
- Lazy load routes and large components
- Optimize images and assets
- Monitor bundle size
- Use React.memo for expensive renders

## Git Workflow
1. Create feature branches from main
2. Write descriptive commit messages
3. Update documentation with changes
4. Add tests for new features

## Asking for Help
When asking for assistance, please:
1. Describe the current behavior
2. Describe the expected behavior
3. Share any error messages
4. List steps to reproduce issues
5. Mention related components/files 