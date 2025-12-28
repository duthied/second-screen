# Second Screen - Development Documentation

This document contains development notes, architecture decisions, and implementation details for the Second Screen project.

## Project Overview

A React-based web application designed to run on an iPad as a second screen display, featuring:
- Large flip-style clock (HH:MM format)
- Real-time weather with 3-day forecast
- Cycling inspirational quotes

## Technology Stack

- **Framework:** React 18 with TypeScript
- **Build Tool:** Create React App
- **Weather API:** OpenWeatherMap (current + forecast endpoints)
- **Styling:** Plain CSS with custom animations
- **State Management:** React Hooks only (no external libraries)

## Architecture

### Component Structure

```
src/
├── components/
│   ├── FlipClock/           # Animated flip clock display
│   │   ├── FlipClock.tsx    # Main clock container (HH:MM)
│   │   ├── FlipClock.css
│   │   ├── FlipDigit.tsx    # Individual digit with flip animation
│   │   └── FlipDigit.css    # 3D transform animations
│   ├── Weather/             # Weather display with forecast
│   │   ├── Weather.tsx      # Current + 3-day forecast
│   │   ├── Weather.css      # Minimalist dark styling
│   │   └── types.ts         # TypeScript interfaces
│   ├── Quote/               # Cycling quote display
│   │   ├── Quote.tsx        # 10 quotes with fade transitions
│   │   └── Quote.css        # Card styling
│   └── Layout/
│       ├── Grid.tsx         # CSS Grid layout (60/40 split)
│       └── Grid.css
├── hooks/
│   ├── useInterval.ts       # Reusable interval hook
│   ├── useTime.ts           # Clock updates (1 second)
│   └── useWeather.ts        # Weather fetch + refresh (30 min)
├── services/
│   └── weatherApi.ts        # OpenWeatherMap API integration
└── utils/
    └── formatTime.ts        # Time formatting utilities
```

### Layout Design

**Screen Split:**
- Top 60%: Flip clock (full width)
- Bottom 40%: Split into two equal columns
  - Left: Weather with 3-day forecast
  - Right: Cycling quotes

**Grid Implementation:**
```css
.grid-container {
  grid-template-rows: 60% 40%;  /* Clock / Bottom sections */
}
.grid-bottom {
  grid-template-columns: 1fr 1fr;  /* Weather / Quotes */
}
```

## Key Features

### 1. Flip Clock Component

**Design:**
- Uses CSS 3D transforms for realistic flip animation
- Each digit is a separate component with front/back faces
- 600ms flip transition with easing
- Updates every second via `useTime` hook

**Animation Details:**
- Container: `perspective: 2000px` for 3D effect
- Digits: 240px × 320px (doubled from original size)
- Font: 200px bold with shadow for depth
- Colors: Soft gray (#cbcaca) on dark gradient background

**Implementation Notes:**
- Removed seconds display (HH:MM only per user request)
- Each digit compares prev/next value to trigger flip
- GPU-accelerated via `transform` property

### 2. Weather Component

**Data Sources:**
- Current weather: `api.openweathermap.org/data/2.5/weather`
- 3-day forecast: `api.openweathermap.org/data/2.5/forecast`
- Location: Hardcoded coordinates (Guelph, ON: 43.5448, -80.2482)

**Display:**
- Large temperature (70px)
- Weather description + location
- Horizontal divider
- 3-day forecast with icons and temps

**Update Cycle:**
- Auto-refresh every 30 minutes
- Parallel API calls for current + forecast
- Error handling with fallback UI
- Loading states during fetch

**Size Optimizations:**
- Reduced 25% from initial design to fit 40% bottom section
- Further reduced to prevent clipping in final layout
- Uses `max-height: 100%` to fit vs fill

### 3. Quote Component

**Content:**
- 10 quotes total (5 general inspirational + 5 stoic philosophy)
- Authors: Steve Jobs, Marcus Aurelius, Seneca, Epictetus, Buddha, Lao Tzu

**Cycling Behavior:**
- Changes every 30 minutes (same interval as weather)
- Fade out (500ms) → change quote → fade in (500ms)
- CSS opacity transitions for smooth effect

**Styling:**
- Rounded card (20px border-radius)
- Semi-transparent background
- Italic text (32px) with author attribution (20px)

## Configuration

### Environment Variables

Required in `.env.local`:
```env
REACT_APP_WEATHER_API_KEY=your_openweathermap_api_key
REACT_APP_LATITUDE=43.5448
REACT_APP_LONGITUDE=-80.2482
```

### API Setup

1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Get free API key (1000 calls/day)
3. Add to `.env.local`

## iPad Optimization

### CSS Optimizations
- Full viewport: `100vh` and `100vw`
- Disable text selection: `user-select: none`
- Prevent zoom: `touch-action: manipulation`
- Fixed positioning to prevent scrolling

### Meta Tags
```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
```

### Installation on iPad
1. Open in Safari
2. Tap Share → Add to Home Screen
3. Runs in full-screen mode like native app

## Design Decisions

### Why No Seconds in Clock?
- User preference for cleaner display
- Reduces visual noise
- Easier to read from distance

### Why 60/40 Split?
- Started as 66/33 (2fr/1fr)
- Increased to 75/25 (3fr/1fr)
- Settled on 60/40 for better balance
- Gives weather/quotes adequate space

### Why Plain CSS?
- No dependencies needed for simple animations
- Better performance (no JS animation libraries)
- Full control over styling
- Smaller bundle size

### Why 30-Minute Intervals?
- Balances freshness with API rate limits
- Weather doesn't change frequently enough to justify more
- Quote rotation feels natural at this pace
- Matches weather update cycle for consistency

## Performance Considerations

### Optimizations
- `React.memo` not needed (simple component tree)
- CSS animations use `transform` (GPU accelerated)
- No unnecessary re-renders (useInterval pattern)
- Minimal state updates (time, weather, quote index)

### Bundle Size
- No heavy dependencies
- Total added dependencies: 0 (uses built-in APIs)
- Only production dependencies: react, react-dom

## Development Workflow

### Running Locally
```bash
npm start                 # Development server on :3000
npm run build            # Production build
npm test                 # Run tests (if any)
```

### Making Changes

**Adding Quotes:**
Edit `src/components/Quote/Quote.tsx` and modify the `quotes` array.

**Changing Update Intervals:**
- Clock: Modify `useTime.ts` (currently 1000ms)
- Weather: Modify `useWeather.ts` (currently 30min)
- Quotes: Modify `Quote.tsx` (currently 30min)

**Adjusting Layout Split:**
Edit `src/components/Layout/Grid.css`:
```css
grid-template-rows: 60% 40%;  /* Change percentages */
```

**Changing Location:**
Update coordinates in `.env.local`

## Known Issues & Limitations

### Layout "Pop" Issue (Resolved)
- **Problem:** Grid would flash correct layout then revert to 50/50
- **Solution:** Changed from `fr` units to explicit percentages
- **Root Cause:** Unknown grid calculation issue with fractional units

### Weather Clipping (Resolved)
- **Problem:** Forecast section cut off in 40% bottom area
- **Solution:** Reduced all font sizes and spacing by ~35%
- **Approach:** Changed from `height: 100%` to `max-height: 100%`

### Browser Compatibility
- **Primary Target:** Safari on iPad
- **Tested:** Chrome (development), Safari (production)
- **Note:** CSS Grid and 3D transforms require modern browser

## Future Enhancements

Potential additions (not currently implemented):
- [ ] Manual quote advance (tap/click to cycle)
- [ ] Customizable quote categories
- [ ] Multiple location support
- [ ] Hourly weather graph
- [ ] Custom background colors/themes
- [ ] Configurable update intervals
- [ ] Weather alerts/warnings
- [ ] Feels-like temperature
- [ ] Wind speed/direction

## Deployment

### Build
```bash
npm run build
```

### Hosting Options
- **Netlify:** Drag & drop `build` folder
- **Vercel:** Connect GitHub repo
- **GitHub Pages:** Enable in repo settings
- **Self-hosted:** Serve `build` folder with any web server

### Domain Setup
Point iPad to deployed URL and add to home screen.

## Maintenance

### Updating Weather API
If OpenWeatherMap API changes:
1. Update `src/components/Weather/types.ts` interfaces
2. Update `src/services/weatherApi.ts` parsing logic
3. Test with new API response format

### Updating Dependencies
```bash
npm outdated              # Check for updates
npm update               # Update minor/patch versions
npm install react@latest # Update major versions manually
```

## Credits

Built with Claude Code assistance.
Design inspired by minimalist weather apps and mechanical flip clocks.

## License

Personal project - modify as needed for your use case.
