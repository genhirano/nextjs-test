# Next.js Test Project

This is a Next.js 15.5.2 application with TypeScript, Tailwind CSS, and Turbopack, configured for static export and GitHub Pages deployment.

**ALWAYS reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Bootstrap and Setup
Run these commands in order to set up the development environment:

```bash
cd /home/runner/work/nextjs-test/nextjs-test
npm install  # Takes ~20 seconds. Set timeout to 60+ seconds.
```

**NEVER CANCEL**: npm install typically completes in under 20 seconds but may take up to 2 minutes in slow environments.

### Build Process
```bash
npm run build  # Takes ~15 seconds normally. NEVER CANCEL - Set timeout to 10+ minutes.
```

**CRITICAL NETWORK ISSUE**: The build will fail if Google Fonts (fonts.googleapis.com) is blocked with the error:
```
Failed to fetch `Geist` from Google Fonts
Failed to fetch `Geist Mono` from Google Fonts
```

**WORKAROUND for restricted environments**:
1. Backup the original layout: `cp src/app/layout.tsx src/app/layout.tsx.backup`
2. Remove Google Fonts imports from `src/app/layout.tsx`:
   - Remove: `import { Geist, Geist_Mono } from "next/font/google";`
   - Remove font variable declarations
   - Change body className from `${geistSans.variable} ${geistMono.variable} antialiased` to just `antialiased`
3. Run build: `npm run build`
4. Restore original: `cp src/app/layout.tsx.backup src/app/layout.tsx`

### Development Server
```bash
npm run dev  # Starts in ~1 second on http://localhost:3000
```

**NEVER CANCEL**: Development server starts very quickly (under 2 seconds) but allow 30+ seconds timeout for safety.

### Linting
```bash
npm run lint  # Takes ~2 seconds. Set timeout to 60+ seconds.
```

ESLint is configured with Next.js TypeScript rules and runs very fast.

### Static Export Testing
The project is configured for static export (`output: 'export'` in next.config.ts). After building, test the static files:

```bash
cd out
python3 -m http.server 8000  # Serves on http://localhost:8000
```

## Validation Scenarios

**ALWAYS perform these validation steps after making changes:**

### 1. Development Server Validation
```bash
npm run dev
```
1. Navigate to http://localhost:3000
2. Verify the Next.js logo appears
3. Verify the text "Get started by editing src/app/page.tsx" is visible
4. Click "Read our docs" link - should open nextjs.org in new tab
5. Click "Deploy now" link - should open vercel.com in new tab

### 2. Build and Static Export Validation
```bash
npm run build
cd out && python3 -m http.server 8000
```
1. Navigate to http://localhost:8000
2. Verify same content as development server
3. Verify all links work correctly

### 3. Code Quality Validation
```bash
npm run lint  # Must pass before committing
```

**CRITICAL**: Always run `npm run lint` before committing changes or the GitHub Actions CI (.github/workflows/nextjs.yml) will fail.

## Common Tasks and File Locations

### Key Project Structure
```
├── src/app/           # Main application code (App Router)
│   ├── page.tsx       # Home page component
│   ├── layout.tsx     # Root layout with fonts and metadata
│   └── globals.css    # Global Tailwind CSS styles
├── public/            # Static assets (SVG icons)
├── .github/workflows/ # GitHub Actions for Pages deployment
├── package.json       # npm scripts: dev, build, start, lint
├── next.config.ts     # Next.js config with export setting
├── tsconfig.json      # TypeScript configuration
└── eslint.config.mjs  # ESLint configuration
```

### Making Changes
- **UI Components**: Edit files in `src/app/`
- **Styles**: Modify `src/app/globals.css` or use Tailwind classes
- **Static Assets**: Add files to `public/` directory
- **Configuration**: Edit `next.config.ts`, `tsconfig.json`, etc.

### Dependencies and Versions
- Node.js: 20.19.5 (required for GitHub Actions compatibility)
- npm: 10.8.2
- Next.js: 15.5.2 with Turbopack enabled
- React: 19.1.0
- TypeScript: ^5
- Tailwind CSS: ^4

## GitHub Actions CI/CD

The repository has a GitHub Pages deployment workflow (`.github/workflows/nextjs.yml`) that:
1. Detects package manager (npm/yarn)
2. Sets up Node.js 20
3. Installs dependencies with `npm ci`
4. Builds with `next build`
5. Uploads artifact from `./out` directory
6. Deploys to GitHub Pages

**IMPORTANT**: The CI will fail if:
- ESLint errors exist (run `npm run lint` first)
- Build fails due to network issues (Google Fonts)
- TypeScript errors exist

## Troubleshooting

### Build Failures
- **Google Fonts Error**: Use the font workaround above
- **TypeScript Errors**: Check `npm run lint` and fix type issues
- **Out of Memory**: Turbopack helps but large builds may need `NODE_OPTIONS=--max-old-space-size=4096`

### Development Issues
- **Port 3000 in use**: Kill existing processes or use `npm run dev -- -p 3001`
- **Hot reload not working**: Restart dev server
- **Cache issues**: Delete `.next` directory and rebuild

### Performance Notes
- Turbopack is enabled by default (`--turbopack` flag) for faster builds
- Development server has very fast startup and hot reload
- Static export is optimized for GitHub Pages hosting

## Testing Notes

**NO AUTOMATED TESTS**: This project does not have a test suite configured. All validation must be done manually using the validation scenarios above.

When making changes:
1. Always test in development mode first
2. Always test the production build
3. Always run lint before committing
4. Always verify the application functions correctly through browser testing

## Common Command Reference

```bash
# Quick setup and validation workflow
npm install && npm run lint && npm run dev

# Build and test static export
npm run build && cd out && python3 -m http.server 8000

# Clean and rebuild
rm -rf .next out node_modules && npm install && npm run build
```