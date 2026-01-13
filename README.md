# Linear+

A high-fidelity clone of the Linear issue tracker, enhanced with **Artificial Intelligence**.

Linear+ replicates the premium "Linear" aesthetic (Dark Mode, Fluid Animations, Minimalist UI) while adding powerful AI capabilities powered by **Google Gemini** and real-time persistence with **Supabase**.

![Demo](https://via.placeholder.com/1200x600?text=Linear+Demo+Screenshot)

## ✨ Features

### 🧠 AI-Powered Workflow
- **Issue Enhancer**: Turn rough notes into engineering-ready tickets.
  - Generates professional Titles.
  - Writes detailed Descriptions with Context, Problem, and Solution.
  - Estimates Complexity (Fibonacci) and suggests Labels.
  - Auto-generates Acceptance Criteria.
- **AI Assistant**: A "Product Manager" persona available in the sidebar to help you prioritize work and break down tasks.
- **Powered by Google Gemini Pro**.

### 🎨 True Linear Polish
- **Premium UI**: Custom "Zinc" color palette, glassmorphism, and pixel-perfect spacing.
- **Dark Mode**: Built-in global dark (OLED-friendly) theme.
- **Fluid Interactions**: Slide-over panels and hover effects.

### 🛠️ Full Stack & Real-Time
- **Supabase Persistence**:
  - **Projects**: Real-time fetching of projects.
  - **Issues**: Create, Read, and Update issues backed by a Postgres database.
- **Authentication**: Secure email-based login via Supabase Auth.
- **Security**: Row Level Security (RLS) enabled on all tables.

## 🚀 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **AI**: [Google Gemini](https://ai.google.dev/) (`@google/generative-ai`)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🛠️ Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/Abhiboss07/Linear-plus.git
cd Linear-plus
npm install
```

### 2. Environment Variables
Create a `.env.local` file in the root directory:

```env
# Google Gemini (Required for AI features)
GEMINI_API_KEY=your_gemini_key_here

# Supabase (Required for Persistence)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

### 3. Database Setup (Supabase)
Run the SQL queries in `supabase/schema.sql` in your Supabase SQL Editor to create the necessary tables (`projects`, `issues`).

### 4. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the app.

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
MIT
