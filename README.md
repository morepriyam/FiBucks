<div align="center">
  <h1>Fibucks</h1>
  <p>A modern web application.</p>
</div>

---

# Table of Contents
- [About the Project](#about-the-project)
- [Technologies and Libraries](#technologies-and-libraries)
- [Key Features](#key-features)
- [File Structure](#file-structure)
- [Getting Started](#getting-started)
- [Acknowledgements](#acknowledgements)

---

## About the Project

Fibucks is a powerful web application designed to help users manage their finances with ease. It allows users to track their income, expenses, and transactions through an intuitive user interface. The core functionalities include user authentication, financial input management, transaction tracking, and comprehensive data visualization, enabling users to make informed financial decisions. Fibucks stands out for its modern design and responsive features that adapt to user needs, making personal finance management accessible to everyone.

## Technologies and Libraries

- **axios**: ^1.7.8  
  Axios is used for making HTTP requests to the backend. It simplifies the process of handling requests and responses, ensuring that data is fetched and submitted reliably.

- **next**: 14.2.12  
  Next.js is a React framework that enables server-side rendering and static site generation. It enhances performance and SEO capabilities of Fibucks by pre-rendering pages based on the application’s requirements.

- **react**: ^18.3.1  
  React is the foundational library for building user interfaces in Fibucks. It allows for the creation of reusable UI components, ensuring a clean and efficient development process.

## Key Features

- User authentication and authorization for secure access
- Comprehensive transaction management including income, expenses, and savings tracking
- Interactive charts and graphs to visualize financial trends
- Responsive design for seamless experience across devices
- Customizable forms for inputting financial data
- Real-time notifications for transaction updates

## File Structure

### Key Files Overview

- `./src/models/financeSchema.ts`  
  Defines the structure of financial data used throughout the application.

- `./src/models/userModel.js`  
  Manages user-related functionalities, including data management and user entity logic.

- `./src/models/transactionModel.js`  
  Contains logic and data handling for transactions, ensuring integrity and easier access.

- `./src/models/transactionSchema.ts`  
  Specifies the schema for validating transaction data inputs.

- `./src/components/global/TransactionList.tsx`  
  Displays a list of transactions, allowing users to view and manage their finance data.

- `./src/components/global/FormFields.tsx`  
  Contains reusable form field components for data input across various forms.

- `./src/components/global/Loader.tsx`  
  A loading indicator used to enhance user experience during data fetching.

- `./src/components/global/TransactionChart.tsx`  
  Renders charts that visualize transaction data, providing insights into financial trends.

- `./src/components/global/footer.tsx`  
  Handles the application's footer layout, providing relevant links and information.

- `./src/components/global/FinanceTab.tsx`  
  Implements a tabbed interface for navigating different finance-related sections.

- `./src/components/global/navbar.tsx`  
  Provides the navigation controls, allowing users to seamlessly navigate through the application.

- `./src/components/ui/toast.tsx`  
  Displays temporary notifications to users, often used for alerts or confirmations.

- `./src/components/ui/form.tsx`  
  General layout for forms used throughout the application.

- `./src/components/ui/card.tsx`  
  A reusable card component for displaying content in a structured format.

- `./src/components/ui/label.tsx`  
  A component used for labels in forms to ensure better accessibility.

- `./src/components/ui/input.tsx`  
  Standard input field component that can be reused for different forms.

- `./src/components/ui/tabs.tsx`  
  Implements tab functionality for better content organization.

- `./src/components/ui/toaster.tsx`  
  Contains logic for displaying toast notifications.

- `./src/components/ui/dropdown-menu.tsx`  
  A reusable dropdown component for making selections in forms.

- `./src/components/ui/textarea.tsx`  
  A component for multi-line text input.

- `./src/components/ui/theme-provider.tsx`  
  Manages theming options and application-wide styling.

- `./src/components/ui/button.tsx`  
  Standard button component to maintain consistency across the app.

- `./src/components/ui/progress.tsx`  
  Visual representation of progress, useful for loading states.

- `./src/components/ui/select.tsx`  
  A customizable component for dropdown selection inputs.

- `./src/lib/mailer.ts`  
  Contains functionalities for sending email