# TrevoTech Academy - Certificate Verification Portal

A modern, fully functional certificate verification portal built with **React JSX** (no TypeScript).

## Features

### ✓ Converted to Plain React JSX
- Removed all TypeScript dependencies
- Pure JavaScript/JSX components
- Clean, simple syntax throughout

### ✓ Realistic Student Database Simulation
The portal now includes a database of **21 students** with realistic verification scenarios:

**How the Matching Works:**
- When you enter a credential ID, the system checks against the database
- **Exact matches** return that student's data (e.g., `GTA-2026-7782-DIST`)
- **Non-exact matches have a 30% chance** of returning a random student's data (making it feel realistic, as if someone could accidentally match another student)
- **70% chance** the ID is not found in the system

This creates a realistic experience where:
- If you guess a random ID in the correct format, there's a chance you'll match someone else's credentials
- Not every invalid ID returns the same "not found" message
- The system feels like a real database with multiple students

### ✓ Student Data Includes:
- Full name
- Program (Cybersecurity Foundations - Phase 1)
- Grade percentage (71-92%)
- Grade label (Pass, Credit, Merit, Distinction)
- Clearance level (Level 1-3)
- Eligibility information
- Phase 2 enrollment status
- Verification method & industry standards

## Test IDs

Try these credential IDs to see different results:

| ID | Name | Grade |
|---|---|---|
| `GTA-2026-7782-DIST` | Shehu Teslim Mayowa | 88% (Distinction) |
| `GTA-2026-3347-DIST` | Zainab Hassan | 91% (Distinction) |
| `GTA-2026-1289-DIST` | Oluwaseun Adeyemi | 92% (Distinction) |
| `GTA-2026-5421-PASS` | Amara Okoro | 75% (Credit) |
| Any random ID format | Random student (30% chance) | Varies |

## File Structure

```
/app
  ├── page.jsx           # Main component (converted to JSX)
  └── layout.jsx         # App layout (converted to JSX)
/src
  └── /data
      └── students.jsx   # Student database & matching logic
```

## How It Works

The `findStudentById()` function in `/src/data/students.jsx`:

```javascript
export const findStudentById = (id) => {
  // 1. Try exact match first
  const exactMatch = STUDENTS_DATABASE.find((s) => s.id === id.toUpperCase())
  if (exactMatch) return exactMatch

  // 2. Simulate realistic behavior (30% random student, 70% not found)
  const randomChance = Math.random()
  if (randomChance < 0.3) {
    const randomIndex = Math.floor(Math.random() * STUDENTS_DATABASE.length)
    return STUDENTS_DATABASE[randomIndex]
  }

  // 3. Not found
  return null
}
```

## Loading Behavior

- 1.5 second loading animation with spinner
- Simulates real database query
- Professional "Searching Database..." message

## Design

- **Colors**: Deep Navy (#0b132b), Gold (#c5a059), Slate Gray
- **Responsive**: Mobile-first design, works on all devices
- **Professional**: Clean, minimalist UI with proper spacing
- **Accessible**: Semantic HTML with proper contrast ratios

## Getting Started

1. This is a Next.js project with React JSX
2. Run `npm run dev` to start the development server
3. Open http://localhost:3000 in your browser
4. Try entering credential IDs to test the verification

## Enjoy!

The portal now feels like a real system with multiple students, making it much more realistic and engaging. Try entering random IDs in the same format to see the simulation in action!
