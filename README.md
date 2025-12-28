# Second Screen

A minimalist React-based web application designed to run on an iPad as a second screen display. Features a large flip-style clock, real-time weather with 3-day forecast, and cycling inspirational quotes.

![Layout: 60% clock at top, 40% bottom split between weather (left) and quotes (right)]

## Features

- **Flip Clock** - Large animated clock (HH:MM format) with realistic flip card effect
- **Weather Display** - Current conditions and 3-day forecast for Guelph, ON
- **Inspirational Quotes** - 10 rotating quotes from stoics and modern thinkers
- **iPad Optimized** - Full-screen, no scrolling, touch-optimized interface
- **Auto-Refresh** - Weather and quotes update every 30 minutes

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create a `.env.local` file with your OpenWeatherMap API key:
```env
REACT_APP_WEATHER_API_KEY=your_api_key_here
REACT_APP_LATITUDE=43.5448
REACT_APP_LONGITUDE=-80.2482
```

To get an API key:
1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Get a free API key (1000 calls/day)

### 3. Run Development Server
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view in browser.

### 4. Build for Production
```bash
npm run build
```
Deploy the `build` folder to your hosting service.

## iPad Setup

1. Deploy the app to a web hosting service (Netlify, Vercel, GitHub Pages, etc.)
2. Open the URL in Safari on your iPad
3. Tap the Share button (box with arrow)
4. Select "Add to Home Screen"
5. Open from home screen for full-screen experience

The app will run like a native application with no browser chrome.

## Project Structure

```
src/
├── components/
│   ├── FlipClock/      # Animated flip clock (HH:MM)
│   ├── Weather/        # Current weather + 3-day forecast
│   ├── Quote/          # Cycling quote display
│   └── Layout/         # Grid layout (60/40 split)
├── hooks/
│   ├── useInterval.ts  # Reusable interval hook
│   ├── useTime.ts      # Clock updates (1 second)
│   └── useWeather.ts   # Weather fetch (30 min refresh)
├── services/
│   └── weatherApi.ts   # OpenWeatherMap integration
└── utils/
    └── formatTime.ts   # Time formatting
```

## Configuration

### Changing Location
Update the coordinates in `.env.local`:
```env
REACT_APP_LATITUDE=your_latitude
REACT_APP_LONGITUDE=your_longitude
```

### Adding Quotes
Edit `src/components/Quote/Quote.tsx` and add to the `quotes` array:
```typescript
{
  text: "Your quote here",
  author: "Author Name"
}
```

### Adjusting Layout
Edit `src/components/Layout/Grid.css`:
```css
.grid-container {
  grid-template-rows: 60% 40%;  /* Top/Bottom split */
}
```

### Update Intervals
- Clock: 1 second (in `useTime.ts`)
- Weather: 30 minutes (in `useWeather.ts`)
- Quotes: 30 minutes (in `Quote.tsx`)

## Tech Stack

- **React 18** with TypeScript
- **Create React App** for build tooling
- **OpenWeatherMap API** for weather data
- **CSS Grid** for layout
- **CSS 3D Transforms** for flip animations
- **React Hooks** for state management (no external libraries)

## Design Features

### Flip Clock
- Large 240px × 320px digits
- Realistic 3D flip animation (600ms)
- Soft gray text on dark gradient background
- Updates smoothly every second

### Weather
- Current temperature and conditions
- 3-day forecast with emoji icons
- Auto-refresh every 30 minutes
- Minimalist card design

### Quotes
- 10 inspirational and stoic quotes
- Smooth fade transitions (500ms)
- Rounded card styling
- Cycles every 30 minutes

## Browser Compatibility

- **Primary:** Safari on iPad
- **Supported:** Modern browsers with CSS Grid and 3D Transform support
- **Optimized for:** Touch interfaces, full-screen displays

## Development

See [claude.md](./claude.md) for detailed development documentation, architecture decisions, and implementation notes.

### Available Scripts

- `npm start` - Run development server
- `npm run build` - Build for production
- `npm test` - Run test suite
- `npm run eject` - Eject from Create React App (one-way operation)

## Deployment

### Recommended Hosts
- **Netlify** - Free, automatic deployments from Git
- **Vercel** - Free, optimized for React
- **GitHub Pages** - Free, simple setup

All support automatic deployments and free SSL certificates.

## License

Personal project - feel free to use and modify for your own second screen setup.

## Acknowledgments

Built with assistance from Claude Code.
Weather data provided by OpenWeatherMap.
Quotes from stoic philosophers and modern thinkers.
