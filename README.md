```markdown
<div align="center">
  <h1>Fibucks</h1>
  <p>A modern web application for managing personal finance effectively.</p>
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

Fibucks is a modern web application designed to simplify personal finance management. It allows users to track incomes, expenses, and transactions seamlessly. The application offers a user-friendly interface with robust features for analytics, helping users gain insights into their financial habits. Whether you're managing budgets or keeping track of spending, Fibucks provides the tools necessary for effective financial oversight.

## Technologies and Libraries

- **axios**: ^1.7.8  
  Axios is used for making HTTP requests to communicate with the backend services efficiently. It offers support for promises and is optimized for speed and performance.

- **next**: 14.2.12  
  Next.js provides the framework for building the application, offering server-side rendering and static site generation capabilities that enhance application performance and SEO.

- **react**: ^18.3.1  
  React is the core library for building user interfaces in Fibucks. It allows for the creation of reusable UI components, promoting a modular and organized codebase.

## Key Features

- User authentication with email verification
- Comprehensive dashboard for tracking income and expenses
- Visual analytics through transaction charts
- Responsive design optimized for both desktop and mobile devices
- Dynamic forms for inputting financial data
- Intuitive navigation and user experience
- Real-time updates of financial data

## File Structure

- `./src/models/financeSchema.ts`: Defines the schema for financial data, ensuring that data integrity is maintained across transactions.
- `./src/models/userModel.js`: Contains the user model, holding user-related data structures and methods for CRUD operations.
- `./src/models/transactionModel.js`: Manages the structure and methods associated with individual financial transactions.
- `./src/models/transactionSchema.ts`: Specifies the schema for transactions, enforcing validation rules and data types.
- `./src/components/global/TransactionList.tsx`: Displays a list of transactions, providing users with an overview of their financial activities.
- `./src/components/global/FormFields.tsx`: A modular component containing various form fields used throughout the application for data entry.
- `./src/components/global/Loader.tsx`: A loading spinner component that indicates data fetching or processing actions to improve user experience.
- `./src/components/global/TransactionChart.tsx`: Visualizes transaction data using charts to help users better understand their spending habits.
- `./src/components/global/footer.tsx`: Contains the footer of the application, including copyright and navigation links.
- `./src/components/global/FinanceTab.tsx`: A tabbed interface for navigating between different finance-related pages or features.
- `./src/components/global/navbar.tsx`: Implements the application's navigation bar, including links to key areas of the app.
- `./src/components/ui/toast.tsx`: Provides a notification system that informs users about important events or errors.
- `./src/components/ui/form.tsx`: Base component for building forms, encapsulating common form functionalities.
- `./src/components/ui/card.tsx`: A reusable card component for displaying summarized content throughout the application.
- `./src/components/ui/label.tsx`: A label component used for form inputs, improving accessibility and SEO.
- `./src/components/ui/input.tsx`: A standardized input field encapsulating input behavior and styles.
- `./src/components/ui/tabs.tsx`: Implements a tabbed view where different categories or subjects can be toggled.
- `./src/components/ui/toaster.tsx`: Enhances the user interface by displaying transient notifications in a toast format.
- `./src/components/ui/dropdown-menu.tsx`: A UI component for displaying dropdown menus, facilitating easier selections.
- `./src/components/ui/textarea.tsx`: A specialized text area component for multi-line input in forms.
- `./src/components/ui/theme-provider.tsx`: Manages theme styles across the application, enabling consistent design and easy theme switching.
- `./src/components/ui/button.tsx`: Standardized button component with customizable styles and actions.
- `./src/components/ui/progress.tsx`: A visual representation of progress, indicating data loading or task completion.
- `./src/components/ui/select.tsx`: A dropdown select component that allows users to choose from multiple options.
- `./src/lib/mailer.ts`: Handles functionalities related to sending verification and notification emails to users.
- `./src/lib/utils.ts`: Utility functions used across the application for