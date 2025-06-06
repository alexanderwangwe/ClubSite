# Strath Club Site

A modern web application built with Next.js 14 for managing and showcasing club information, events, and blog posts.

## 🚀 Features

- **Modern UI**: Built with Next.js 14 and styled using Tailwind CSS
- **Authentication**: Secure user authentication using Supabase
- **Blog System**: Content management for blog posts
- **Events Management**: Calendar and event management system
- **Admin Dashboard**: Administrative interface for content management
- **Responsive Design**: Mobile-first approach with modern UI components

## 🛠️ Tech Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Authentication**: Supabase Auth
- **Database**: Supabase
- **Icons**: Lucide React
- **Notifications**: Sonner

## 📦 Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd strathclubsite
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🏗️ Project Structure

```
├── app/                # Next.js app directory
│   ├── admin/         # Admin dashboard
│   ├── blog/          # Blog section
│   ├── events/        # Events management
│   ├── about/         # About page
│   └── get-involved/  # Get involved section
├── components/        # Reusable UI components
├── lib/              # Utility functions and configurations
├── public/           # Static assets
└── styles/           # Global styles
```

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

## 🔧 Configuration

The project uses several configuration files:

- `next.config.mjs` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `postcss.config.mjs` - PostCSS configuration

## 📝 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
