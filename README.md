# Website Builder with React and Dnd
This project is a simple, interactive website builder built with React, allowing users to drag and drop elements onto a canvas and rearrange them.

# Architecture
The application uses a component-based architecture with a clear state flow. The Builder component manages the state of all dropped elements, rendering the Sidebar (drag source) and the Canvas (drop zone). The Canvas then renders the Dropped components based on the current state.

# Tools and Technologies
React: The core library for building the user interface.
React Dnd: A powerful library for handling complex drag-and-drop interactions.
HTML5 Backend: The standard backend for react-dnd providing full drag-and-drop functionality.
CSS: Used for all styling, layout, and visual feedback.

# Reasoning
Component-Based Design: The use of small, reusable components simplifies maintenance and scalability.
State Management: By keeping state in a single parent component, we create a clear "source of truth" for the application.
Declarative UI: The UI is a direct reflection of the application state, which makes the code more predictable and easier to debug.
Separation of Concerns: We keep the logic for components separate from their presentation for a cleaner, more organized codebase.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
