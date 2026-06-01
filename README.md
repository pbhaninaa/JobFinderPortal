# JobFinder - Modern Job Search Application

A visually stunning, production-grade job search application built with Vue 3 and Vite, powered by the JSearch API.

## Features

- 🎨 **Premium UI/UX**: Clean, modern design with glassmorphism and smooth animations
- 🔍 **Advanced Search**: Search by job title, keywords, and location
- 🎯 **Smart Filters**: Filter by date posted, employment type, and remote work
- 📱 **Fully Responsive**: Mobile-first design with adaptive layouts
- ⚡ **Fast Performance**: Optimized with Vite and lazy loading
- 💾 **Persistent Search**: Remembers your last search using localStorage
- 🎭 **Loading States**: Beautiful skeleton loaders and empty states

## Tech Stack

- **Frontend**: Vue 3 (Composition API), Vite, Tailwind CSS
- **Backend**: Vercel Serverless Functions
- **API**: JSearch API (RapidAPI)

## Setup

### Prerequisites

- Node.js 16+
- npm or yarn
- RapidAPI account with JSearch API access

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Jsearch
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Add your RapidAPI key to `.env`:
```
RAPIDAPI_KEY=your_rapidapi_key_here
```

### Development

Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Deployment

See **[DEPLOYMENT.md](DEPLOYMENT.md)** for Vercel setup, env vars, and rollback.

## Deployment to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variable in Vercel dashboard:
   - Go to your project settings
   - Add `RAPIDAPI_KEY` with your RapidAPI key value

## Environment Variables

- `RAPIDAPI_KEY`: Your RapidAPI key for JSearch API access

## API Configuration

The app uses the following default settings:
- **Country**: South Africa (ZA)
- **Language**: English (en)
- **Default Search**: "software developer jobs in South Africa"

You can modify these in `src/App.vue` if needed.

## Project Structure

```
Jsearch/
├── api/
│   └── jobs.js              # Vercel serverless function
├── src/
│   ├── components/
│   │   ├── SearchBar.vue    # Search input component
│   │   ├── Filters.vue      # Filter sidebar/drawer
│   │   ├── JobCard.vue      # Individual job card
│   │   ├── SkeletonLoader.vue # Loading state
│   │   └── EmptyState.vue   # Empty results state
│   ├── App.vue              # Main application
│   └── style.css            # Global styles
├── tailwind.config.js       # Tailwind configuration
├── vercel.json              # Vercel configuration
└── README.md
```

## Features Breakdown

### Search
- Debounced search input (300ms)
- Job title/keywords search
- Location-based search
- Preserved last search state

### Filters
- Date posted (any time, 24h, 3 days, week, month)
- Employment type (full-time, part-time, contract, internship)
- Remote work toggle
- Collapsible sections
- Mobile drawer for filters

### Job Cards
- Company logo with fallback
- Job title and company name
- Location and employment type tags
- Remote badge
- Job description preview
- Posted date (relative)
- Salary range (when available)
- Direct apply link

### UI/UX
- Glassmorphism hero section
- Smooth transitions and animations
- Hover effects and visual feedback
- Skeleton loaders during fetch
- Empty state with suggestions
- Error handling with retry
- Load more pagination
- Responsive design (mobile-first)

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
