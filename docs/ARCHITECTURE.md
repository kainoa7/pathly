# Kaiyl Architecture

## Core Features
- Career guidance quiz system
- Major matching algorithm
- Career roadmaps
- University recommendations

## Component Structure
- `QuizPage`: Main quiz interface with 20 questions
- `ResultsPage`: Displays major matches and recommendations
- `CareerRoadmapPage`: Shows career progression paths
- `MajorSelectionPage`: Information about different majors

## Data Flow
1. Quiz answers → Quiz logic → Major matching
2. Major matches → Career recommendations
3. User selections → Analytics tracking

## Key Files
- `quizQuestions.ts`: Question bank and structure
- `majorsData.ts`: Major definitions and metadata
- `quizLogic.ts`: Quiz progression and scoring
- `quizMatching.ts`: Algorithm for matching majors

## State Management
Currently using React's built-in state management with:
- Component state for UI
- URL state for navigation
- Local storage for persistence

## Future Considerations
- [ ] Implement user accounts
- [ ] Add more interactive roadmaps
- [ ] Enhance major matching algorithm
- [ ] Add university recommendations 