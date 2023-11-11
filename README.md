[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/8ndPp79U)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=12281634&assignment_repo_type=AssignmentRepo)
# React + Vite

[REPORT]

# Update nov 23. Intergrated testing for SoMe Client

## Update Overview
We have integrated Cypress for end-to-end (E2E) testing and Vitest for unit testing into our SoMe Client project. This addition aims to enhance the reliability and robustness of our web application. Here are the key updates:

### Testing Integration
E2E Testing with Cypress: We implemented tests focusing on user authentication, including:

Logging in with valid credentials and accessing the profile page.
Preventing login with invalid credentials and displaying error messages.
Logging out functionality, including the clearing of storage tokens.
Unit Testing with Vitest (if applicable): Describe what aspects of the application are covered by unit tests.

### Functionality Tweaks
We adjusted the navigation order within the application for a more intuitive user experience.
Enhanced the logout button to include a clearing functionality, improving security and user experience.

## Running the Tests
E2E Tests with Cypress
To run the end-to-end tests using Cypress, follow these steps:

-Open your terminal or command prompt.
-Navigate to the root directory of the SoMe Client project.
-Run the following command to open the Cypress Test Runner:
-npx cypress open

Alternatively, if you prefer to run the tests in headless mode (without opening the Cypress GUI), use:

npx cypress run

The Cypress Test Runner window should open, displaying a list of test files.
Click on the specific test file you wish to run, or run all tests to execute the entire suite.


## Unit Tests with Vitest
To run unit tests using Vitest, follow these instructions:

-Open your terminal or command prompt.
-Go to the root directory of the SoMe Client project.
Execute the following command to run the Vitest tests:

-npx vitest run

This will execute all unit tests and display the results in the terminal.


## Challenges and Solutions

### Direct URL Navigation Issue
During the development of our E2E tests, we encountered a challenge with direct URL navigation not working as expected in Cypress. This issue was particularly evident in tests that required navigating to specific pages after certain actions (like logging in).

Solution: To overcome this, we modified our tests to simulate user interactions for navigation instead of directly accessing URLs. By using Cypress commands to click on navigation links and buttons, we were able to replicate the actual user flow more accurately. This approach not only resolved the navigation issue but also made our tests more robust and reflective of real user behavior.


# Social Media Platform Front-End Client

![GitHub Classroom Workflow](https://github.com/AliNough/fed2-js2-course-assignement-oslo-mimir-testing/actions/workflows/classroom.yml/badge.svg)

## Overview
This project involves the development of a React.js front-end client for an existing social media platform. The primary objectives were to create an attractive and responsive user interface, implement secure user authentication, and seamlessly integrate with the provided API.

## Team Members
- Petter
- Khadar
- Christian

## Approach
The project utilized React.js, emphasizing a modular and component-based architecture. JSON Web Tokens (JWT) were employed for secure user authentication, with LocalStorage ensuring persistent token storage for an enhanced user experience.

## Key Features
- **User Authentication:**
  - Registration and authentication restricted to specific email domains (@noroff.no or @stud.noroff.no).
- **Content Feed:**
  - Dynamic content feed with options for post filtering and search functionality.
- **Post Management:**
  - Create, edit, delete, and view posts in detail.

## Challenges & Achievements
- Successful API integration, including authentication and various HTTP methods.
- Collaborative Development: Effective version control and collaboration ensured consistency and quality.
- User Experience Focus: Prioritization of user experience resulted in an intuitive and engaging interface.

## Future Plans
- Implement additional profile customization features.
- Explore real-time updates for posts and comments.

## Conclusion
The project was successfully completed, enhancing our technical skills and emphasizing collaboration and user-centered design. This experience has equipped us for future web development challenges.

---

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
