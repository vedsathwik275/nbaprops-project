# Lovable Prompt: NBA Prop Bet Analyzer Front-End

## Project Overview
Create a clean, modern web interface for an existing NBA Prop Bet Analyzer CLI tool. The tool currently scrapes basketball-reference.com to retrieve player performance data and provides statistical analysis to help users make informed decisions on NBA player prop bets.

## Existing Backend Functionality
- Retrieves NBA player game logs for current and previous seasons
- Analyzes recent performances (points, assists, rebounds)
- Filters games by specific opponents
- Calculates statistical measures (average, median, min, max)
- Command-line output displays tabular data and statistical summaries

## Design Requirements

### Visual Design
- **Theme**: Dark theme with subtle gradient backgrounds
- **Primary Colors**: Deep navy (#121826), rich purple (#3d2e78), teal accents (#37bfbe)
- **Typography**: Merriweather for headings, Inter for body text
- **Aesthetic**: Clean, minimal, professional sports analytics dashboard
- **Spacing**: Generous white space, clear visual hierarchy

### UI Components Needed
1. **Search/Input Section**
   - Player name input with autocomplete
   - Opponent team dropdown with team logos
   - Game location toggle (Home/Away/Any)
   - Number of games slider/input (default: 10)
   - Season selector (current only or include previous)
   - Prop bet lines inputs (points, rebounds, assists)

2. **Results Dashboard**
   - Game logs table with sortable columns
   - Statistical summary cards for each metric (PTS, AST, REB)
   - Visual indicators for over/under recommendations
   - Confidence meter for recommendations
   - Mini trend charts/sparklines

3. **Data Visualization**
   - Performance trend line chart
   - Bar chart comparing performance vs. betting lines
   - Radar chart showing player stats distribution

4. **Additional Features**
   - Loading states and animations
   - Error handling with friendly messages
   - Responsive design for mobile/tablet/desktop
   - Dark/light mode toggle (with dark as default)

## User Flow
1. User enters player name and optional filters
2. UI shows loading state while fetching data
3. Results display in dashboard format:
   - Summary cards at top with key metrics and betting recommendations
   - Detailed game log table below
   - Charts and visualizations on the right or below
4. User can adjust filters to update the analysis in real-time

## Technical Requirements
- **Frontend**: React.js with TypeScript
- **State Management**: React Context or Redux
- **Styling**: Tailwind CSS or styled-components
- **Charts**: Recharts or Chart.js
- **API Integration**: Connect to existing Python backend via REST API
- **Responsive Design**: Mobile-first approach
- **Animations**: Subtle, performance-optimized animations for state changes

## API Integration
The front-end will need to call the existing Python backend. Assume the backend will be modified to provide a REST API with endpoints for:
- `/api/players/search` - For player name autocomplete
- `/api/analysis/{player_name}` - For full analysis with optional query parameters for filters

## Accessibility Requirements
- Keyboard navigable interface
- Appropriate color contrast ratios
- Screen reader friendly components
- ARIA labels for interactive elements

## Additional Notes
- Include a simple landing page explaining the tool's purpose
- Add a "How it works" section explaining the statistical methodology
- Include tooltips for explaining statistical terms
- Consider a "save/favorite" feature for regular checks on specific players

## Example UI Layout

```
┌─────────────────────────────────────────────────────────────┐
│ NBA PROP BET ANALYZER                                 🔍 ⚙️  │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────┐ ┌───────────┐ ┌───────────┐ ┌─────────┐ │
│ │ Player Name     │ │ Opponent  │ │ Location  │ │ Games   │ │
│ │ [LeBron James]  │ │ [ANY]   ▼ │ │ [ANY]   ▼ │ │ [10]  ▼ │ │
│ └─────────────────┘ └───────────┘ └───────────┘ └─────────┘ │
│                                                             │
│ ┌─────────────────┐ ┌───────────┐ ┌───────────────────────┐ │
│ │ Seasons         │ │ ANALYZE   │ │ Prop Bet Lines:       │ │
│ │ [Current+Last]▼ │ │           │ │ PTS: [26.5] REB: [7.5]│ │
│ └─────────────────┘ └───────────┘ │ AST: [7.5]            │ │
│                                   └───────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐            │
│ │ POINTS      │ │ REBOUNDS    │ │ ASSISTS     │            │
│ │ 28.3 AVG    │ │ 10.5 AVG    │ │ 6.4 AVG     │            │
│ │ 27.5 MEDIAN │ │ 10.5 MEDIAN │ │ 6.0 MEDIAN  │            │
│ │ OVER 67%    │ │ OVER 83%    │ │ UNDER 60%   │            │
│ │ [====>  ]   │ │ [======>]   │ │ [===>   ]   │            │
│ └─────────────┘ └─────────────┘ └─────────────┘            │
│                                                             │
│ ┌─────────────────────┐ ┌─────────────────────────────────┐ │
│ │                     │ │                                 │ │
│ │                     │ │                                 │ │
│ │  PERFORMANCE CHART  │ │  PERFORMANCE VS. BETTING LINES  │ │
│ │                     │ │                                 │ │
│ │                     │ │                                 │ │
│ └─────────────────────┘ └─────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ GAME LOG                                                │ │
│ │ ┌────┬──────────┬─────┬─────┬─────┬─────┬─────┬───────┐ │ │
│ │ │Date│ Opponent │ Loc │ PTS │ REB │ AST │ Min │ Result│ │ │
│ │ ├────┼──────────┼─────┼─────┼─────┼─────┼─────┼───────┤ │ │
│ │ │3/8 │ BOS      │ H   │ 22  │ 14  │ 9   │ 36  │ W     │ │ │
│ │ │3/6 │ NYK      │ A   │ 31  │ 12  │ 8   │ 38  │ L     │ │ │
│ │ │... │ ...      │ ... │ ... │ ... │ ... │ ... │ ...   │ │ │
│ │ └────┴──────────┴─────┴─────┴─────┴─────┴─────┴───────┘ │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

Please generate a React-based frontend for this NBA Prop Bet Analyzer with the specifications detailed above.
