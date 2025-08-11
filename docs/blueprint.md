# **App Name**: AuthFlow

## Core Features:

- User Authentication: User authentication via POST request to http://localhost:8000/api/auth/ using username and password.
- Result Messaging: Display of a success message or an error in case of login failure, based on backend response.
- Details Submission: Submission of user details (username, Gmail, favorite subject) to http://localhost:8000/api/details/ upon successful authentication.
- Conditional Navigation: Redirection to the Details Page only upon successful login.

## Style Guidelines:

- Primary color: A vibrant blue (#29ABE2) evoking trust and security, commonly associated with authentication processes.
- Background color: Light blue (#E0F7FA), offering a clean and unobtrusive backdrop to ensure legibility of screen elements.
- Accent color: A coral color (#FF8A65) used sparingly, contrasting nicely with the primary for calls to action, button highlights, and progress indicators.
- Font: 'Inter', a sans-serif with a clean, modern feel. Use it for both headings and body text.
- Subtle animations on hover, input focus, and page transitions.
- Responsive design that adapts to mobile and desktop screens.
- Use Tailwind CSS's gradient utilities for visually appealing backgrounds and buttons.