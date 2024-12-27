<div align="center">
  <h1>Fibucks</h1>
</div>

# About the Project
A financial management platform.

## Technologies and Libraries
- **@hookform/resolvers**: ^3.9.1
- **@radix-ui/react-dropdown-menu**: ^2.1.2
- **@radix-ui/react-icons**: ^1.3.0
- **@radix-ui/react-label**: ^2.1.0
- **@radix-ui/react-progress**: ^1.1.0
- **@radix-ui/react-select**: ^2.1.2
- **@radix-ui/react-slot**: ^1.1.0
- **@radix-ui/react-tabs**: ^1.1.1
- **@radix-ui/react-toast**: ^1.2.2
- **axios**: ^1.7.8
- **bcrypt**: ^5.1.1
- **chai**: 4.3
- **chai-http**: 4.4
- **chart.js**: ^4.4.7
- **class-variance-authority**: ^0.7.0
- **clsx**: ^2.1.1
- **jose**: ^5.9.6
- **lucide-react**: ^0.441.0
- **mongoose**: ^8.7.3
- **next**: 14.2.12
- **next-themes**: ^0.4.4
- **nodemailer**: ^6.9.15
- **react**: ^18.3.1
- **react-chartjs-2**: ^5.2.0
- **react-dom**: ^18.3.1
- **react-hook-form**: ^7.53.2
- **recharts**: ^2.14.1
- **shadcn**: ^1.0.0
- **tailwind-merge**: ^2.5.2
- **tailwindcss-animate**: ^1.0.7
- **uuid**: ^10.0.0
- **zod**: ^3.23.8

## File Structure
- `src/models/financeSchema.ts`
- `src/models/userModel.js`
- `src/models/transactionModel.js`
- `src/models/transactionSchema.ts`
- `src/components/global/TransactionList.tsx`
- `src/components/global/FormFields.tsx`
- `src/components/global/Loader.tsx`
- `src/components/global/TransactionChart.tsx`
- `src/components/global/footer.tsx`
- `src/components/global/FinanceTab.tsx`
- `src/components/global/navbar.tsx`
- `src/components/ui/toast.tsx`
- `src/components/ui/form.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/label.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/tabs.tsx`
- `src/components/ui/toaster.tsx`
- `src/components/ui/dropdown-menu.tsx`
- `src/components/ui/textarea.tsx`
- `src/components/ui/theme-provider.tsx`
- `src/components/ui/button.tsx`
- `src/components/ui/progress.tsx`
- `src/components/ui/select.tsx`
- `src/lib/mailer.ts`
- `src/lib/utils.ts`
- `src/middleware.ts`
- `src/app/verify/page.tsx`
- `src/app/verify/email-verification-status.tsx`
- `src/app/transactions/page.tsx`
- `src/app/page.tsx`
- `src/app/layout.tsx`
- `src/app/dashboard/page.tsx`
- `src/app/api/verify/route.ts`
- `src/app/api/users/transactions/route.ts`
- `src/app/api/users/financeinput/route.ts`
- `src/app/api/users/signup/route.ts`
- `src/app/api/users/login/route.ts`
- `src/app/api/users/logout/route.ts`
- `src/app/api/authcheck/route.ts`
- `src/app/signup/page.tsx`
- `src/app/financeinputs/page.tsx`
- `src/app/login/page.tsx`
- `src/dbConfig/dbConfig.ts`
- `src/hooks/use-toast.ts`
- `src/utils/financeUtils.tsx`

## Getting Started
### Scripts
- **dev**: `next dev`
- **build**: `next build`
- **start**: `next start`
- **test**: `mocha 'test/*.js'`