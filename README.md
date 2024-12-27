
<div align="center">
  <h1>Fibucks</h1>
  <p></p>
</div>

---

# About the Project

## Project Description for "Fibucks"

### Purpose
**Fibucks** is an innovative financial management application designed to empower users in understanding, organizing, and optimizing their personal finances. The platform focuses on providing a seamless user experience by incorporating advanced data visualization tools and efficient tracking features, enabling users to make informed financial decisions. Whether it's tracking income, expenses, or investments, Fibucks serves as a comprehensive tool for financial literacy and management.

### Unique Features
1. **Interactive Dashboard**: A user-friendly dashboard that provides a snapshot of the user's financial health, including charts and graphs to visually represent income, expenses, and spending trends over time, powered by `chart.js` and `recharts`.

2. **Transaction Management**: Users can easily add, edit, and delete transactions. The **Transaction List** component displays a comprehensive view of all transactions, while the **Transaction Chart** visualizes this data for better understanding.

3. **Robust Form Handling**: Utilizing `react-hook-form` and `@hookform/resolvers`, Fibucks implements sophisticated form management that allows for error handling and validation, improving user experience during input processes.

4. **Email Notifications**: Integration with `nodemailer` enables Fibucks to send timely notifications regarding account activities, updates, and reminders for budgeting or financial goals.

5. **Real-time Data Visualization**: With the use of `Chart.js` and `Recharts`, the platform provides interactive charts that allow users to visualize their financial data instantly, aiding in better decision-making.

6. **Responsive Design**: Built using Tailwind CSS for responsive design, combined with `headless UI` components from Radix UI, Fibucks ensures a visually appealing and accessible interface across devices.

7. **User Authentication and Security**: Leveraging `bcrypt` for hashing passwords and `jose` for JSON Web Token authentication, Fibucks ensures secure user login and session management to uphold user privacy and data integrity.

8. **Email Verification**: A built-in email verification system allows users to authenticate their accounts securely. Notifications regarding verification status are handled gracefully, improving overall user experience.

9. **Themes Support**: Using `next-themes`, users can switch between light and dark themes for a personalized experience, which is a critical feature for modern applications catering to diverse user preferences.

### Structure
The application is structured using a modular file approach that enhances maintainability and scalability. Below is an overview of the file structure and its components:

- **Models**:
  - `src/models/financeSchema.ts`: Defines the schema for finance-related data.
  - `src/models/userModel.js`: Manages user data and authentication.
  - `src/models/transactionModel.js`: Contains the logic for handling transactions.
  - `src/models/transactionSchema.ts`: Defines the transaction data schema.

- **Components**:
  - **Global Components**: Such as `TransactionList`, `Loader`, and `FinanceTab` for reusable UI elements

---

# Technologies and Libraries

Analyzing the dependencies for the project "Fibucks" reveals a diverse set of libraries that cater to various aspects of modern web development. These dependencies can be categorized based on their functionality, ranging from state management and form validation to UI components and data handling. Here's an overview of the roles and contributions of each dependency:

### UI Components & Design
1. **@radix-ui/react-dropdown-menu**: Provides a customizable dropdown menu component, which enhances usability in navigation and selection interfaces.
2. **@radix-ui/react-icons**: A set of customizable icons that can be used throughout the application, ensuring a consistent and visually appealing design.
3. **@radix-ui/react-label**: Helps with accessible labeling of form elements, contributing to better usability and SEO.
4. **@radix-ui/react-progress**: Implements progress indicators for operations like uploads or downloads, enhancing user feedback.
5. **@radix-ui/react-select**: Offers a customizable select input, improving on the native select element for better user experience.
6. **@radix-ui/react-slot**: A utility component that allows flexibility and composability within the UI structure.
7. **@radix-ui/react-tabs**: Creates tabs for organizing content, ensuring users can navigate easily within sections of the app.
8. **@radix-ui/react-toast**: Provides a toast notification component for unobtrusive user alerts, enhancing communication within the app.
9. **lucide-react**: A collection of icons that can be used in various parts of the app, contributing to a modern interface.

### Form Management and Validation
10. **react-hook-form**: A performant, flexible library for managing forms in React applications, enabling easy handling of form state and validation.
11. **@hookform/resolvers**: Allows integration of external validation libraries like Zod, providing a way to handle complex validation scenarios.

### Data Handling and API Interaction
12. **axios**: A promise-based HTTP client for making requests to external APIs, enabling communication between the frontend and backend services.
13. **mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js, simplifying the interaction with MongoDB.
14. **jose**: Provides utilities for handling JSON Web Tokens (JWT), which are essential for secure authentication and authorization.
15. **bcrypt**: A library for hashing passwords, ensuring user password security during registration and authentication processes.
16. **uuid**: A library to generate unique identifiers, which can be useful for referencing data entities.

### State Management & Styling
17. **tailwind-merge**: A utility for merging Tailwind CSS classes, which can simplify styling and responsive design implementation.
18. **tailwindcss-animate**: A library for animating elements styled with Tailwind CSS, enhancing the user experience through smooth transitions and animations.
19. **shadcn**: Likely used for styling or providing UI utility functions (more

---

# Key Features

Based on the provided file structure for "Fibucks," we can derive several key, project-specific features that highlight its functionality and intended purpose. The project appears to be a finance management application, possibly serving the needs of users to manage their financial transactions. Here's a breakdown of its features:

### Key Features of "Fibucks"

1. **User Management**:
   - **User Authentication**: Features related to user login, signup, logout, and session management (`src/app/api/users/signup/route.ts`, `src/app/api/users/login/route.ts`, `src/app/api/users/logout/route.ts`, `src/app/api/authcheck/route.ts`).
   - **Email Verification**: A dedicated verification system to validate user email addresses (`src/app/verify/page.tsx`, `src/app/verify/email-verification-status.tsx`).

2. **Transaction Management**:
   - **Transaction Recording**: Users can log various transactions, which are likely categorized to provide better insight into personal finance (`src/models/transactionModel.js`, `src/app/api/users/transactions/route.ts`).
   - **Finance Input Management**: The app allows users to input and manage financial data and records (`src/app/api/users/financeinput/route.ts`, `src/app/financeinputs/page.tsx`).
   - **Transaction Listings**: A component exists for displaying lists of transactions (`src/components/global/TransactionList.tsx`).

3. **Data Visualization**:
   - **Transaction Chart**: Visual representation of transaction data, aiding users in understanding trends and changes in their finances (`src/components/global/TransactionChart.tsx`).
   - **Dynamic Updates**: Features like loaders and progress indicators suggest a responsive UI that reacts to user input and data fetching events (`src/components/global/Loader.tsx`, `src/components/ui/progress.tsx`).

4. **User Interface Components**:
   - **Custom UI Elements**: Multiple UI components like forms, buttons, inputs, and dropdowns are provided to enhance user interaction (`src/components/ui/form.tsx`, `src/components/ui/button.tsx`, `src/components/ui/input.tsx`, etc.).
   - **Theming**: The presence of a theme provider indicates support for customizable theming options within the application (`src/components/ui/theme-provider.tsx`).

5. **Utility and Middleware**:
   - **Utilities**: Functions for general purposes, such as financial calculations or data formatting, are indicated (`src/lib/utils.ts`, `src/utils/financeUtils.tsx`).
   - **Email Notifications**: A mailer service is included, which implies email notifications for various events (like alerts and confirmations) (`src/lib/mailer.ts`).
   - **Middleware Handling**: The presence of a middleware file indicates that there is logic for request handling or validation before reaching the API routes (`src/middleware.ts`).

6. **Responsive Design and Layout**:
   - **Layout Components

---

# File Structure

The file structure of "Fibucks" is organized to facilitate the development of a dynamic finance management application. Each folder and its corresponding files are strategically placed to enhance maintainability, scalability, and collaboration among developers. Below is an explanation of the file structure based on the provided paths, along with the significance of each component.

### File Structure Breakdown

#### 1. **Models (`src/models/`)**
   - **`financeSchema.ts`**: This TypeScript file defines the schema for financial data, ensuring data integrity and type safety. It can include validation rules which help in managing the shape and types of financial records.
   - **`userModel.js`**: This JavaScript file contains the user model, likely defining the structure of user-related data in the application, such as profiles and authentication details.
   - **`transactionModel.js`**: This model handles transaction-related data, potentially defining operations for CRUD (Create, Read, Update, Delete) operations on transactions.
   - **`transactionSchema.ts`**: Similar to `financeSchema.ts`, this TypeScript file outlines the structure and constraints for transaction data.

#### 2. **Components (`src/components/`)**
   - **Global Components**: Files like `TransactionList.tsx`, `FormFields.tsx`, `Loader.tsx`, `TransactionChart.tsx`, `footer.tsx`, and `navbar.tsx` are reusable components that compose the user interface. They can manage layout elements and display financial data, acting as the building blocks of the application.
   - **UI Components**: Files like `button.tsx`, `input.tsx`, `select.tsx`, and `toast.tsx` represent smaller, reusable UI elements that streamline the UI development process and ensure consistency across different parts of the application.
   - **Theme Provider (`theme-provider.tsx`)**: This component manages theming for the application, enabling developers to create a consistent look and feel.
   - **Toaster (`toaster.tsx`)**: This could be responsible for displaying notifications to the user, enhancing the user experience.

#### 3. **Libraries (`src/lib/`)**
   - **`mailer.ts`**: This file likely handles email notifications (e.g., for verification or transactions).
   - **`utils.ts`**: Contains utility functions that are commonly used throughout the application, enhancing DRY (Don't Repeat Yourself) principles.

#### 4. **Middleware (`src/middleware.ts`)**
   - This file may handle request processing, such as authentication checks or logging. Middleware plays a crucial role in managing how requests are processed before reaching the main logic.

#### 5. **App Pages (`src/app/`)**
   - Various page components (e.g., `page.tsx`, `signup/page.tsx`, `login/page.tsx`) represent different routes of the application. Each page can contain specific logic and layout for a distinct part of the application, such

---

# Getting Started

# Getting Started with Fibucks

Welcome to the Fibucks project! This guide provides detailed steps to set up and run the project environment. Follow along to get your development environment up and running smoothly.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js**: Recommended version is 16.x or later. You can check your version by running `node -v`.
- **npm**: This is bundled with Node.js. Check your version with `npm -v`.
- **Git**: Ensure you have Git installed for version control.

## Step 1: Clone the Repository

Start by cloning the Fibucks repository to your local machine:

```bash
git clone https://github.com/yourusername/fibucks.git
cd fibucks
```

## Step 2: Install Dependencies

Once you have the project cloned, navigate to the project directory and install the required dependencies listed in the `package.json` file. Run the following command:

```bash
npm install
```

This will install all the dependencies, including:

- **@hookform/resolvers**
- **@radix-ui/react-dropdown-menu**
- **@radix-ui/react-icons**
- **@radix-ui/react-label**
- **@radix-ui/react-progress**
- **@radix-ui/react-select**
- **@radix-ui/react-slot**
- **@radix-ui/react-tabs**
- **@radix-ui/react-toast**
- **axios**
- **bcrypt**
- **chai**
- **chai-http**
- **chart.js**
...
and many others.

## Step 3: Configure Environment Variables

Fibucks may require some environment-specific configurations. Create a file named `.env.local` in the root directory of your project. Here is an example of the typical environment variables you might need:

```bash
DATABASE_URI=mongodb://localhost:27017/fibucks