# React Project Documentation

Welcome to the React project! This document serves as a guide to help new developers quickly adapt to the codebase and start contributing.

## Table of Contents

- [Folder and File Naming Conventions](#folder-and-file-naming-conventions)
- [State Management](#state-management)
- [Making XHR Requests](#making-xhr-requests)
- [Static Assets](#static-assets)
- [BEM Methodology in SCSS](#bem-methodology-in-scss)
- [Environment Config for React](#environment-config-for-react)
- [Git Workflow](#git-workflow)
- [ESLint and Prettier Configuration](#eslint-and-prettier-configuration)

---

## Folder and File Naming Conventions

To maintain consistency and organization, adhere to the following naming conventions:

1. **Folder Structure**:

   - All folders should be named using `kebab-case` (lowercase letters with hyphens).

     **`public/`** Static files like images, fonts, icons, etc.

     **`src/`** Has all the application code.
     Inside src we have below mentioned folders :

     ```
     components/ -> Contains all reusable React components and their scss files.

     services/ -> Functions to interact with APIs or external services (e.g., fetching data).

     utils/ -> Utility functions and helpers.

     hooks/ -> Custom React hooks.
     ```

2. **File Naming**:

   - Use `PascalCase` for React components (e.g., `Card.js`).
   - Use `camelCase` for utility functions and hooks (e.g., `useFetchData.js`).
   - Use `kebab-case` for service and API-related files (e.g., `user-service.js`).

3. **Service Names**:
   - Use meaningful names for services and APIs, prefixed with the resource (e.g., `auth-service.js`, `post-service.js`).

---

## State Management

We will **not** use any external state management libraries like Redux. Instead, we will rely on **React's built-in state** using `useState`, `useEffect`, and **Store** for global state if needed.

---

## Making XHR Requests

We will use the native `fetch` API to make all XHR requests. Below is an example of how to make a simple GET request.

```javascript
// src/services/api.js
const BASE_URL = process.env.REACT_APP_API_URL;

const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
};
```

---

## Static Assets

All static assets (images, fonts, etc.) should be placed in the `public/` folder. This folder is for static files that are served directly to the client without any processing or bundling. Files in this folder can be accessed via URLs.

For example:

- Images should be in `public/images/`.
- Fonts should be in `public/fonts/`.
- Other assets (e.g., videos, PDF files) can go in `public/assets/`.

These assets can be accessed directly using a relative path, e.g., `/images/logo.png`.

---

## BEM Methodology in SCSS

We follow the **BEM (Block Element Modifier)** methodology for writing CSS.

### Example: Card Component

**1. Card Component JSX (`Card.js`)**:

```jsx
import React from 'react';
import './Card.scss';

const Card = ({ title, description }) => (
  <div className="card">
    <h2 className="card__title">{title}</h2>
    <p className="card__description">{description}</p>
  </div>
);

export default Card;
```

**2. SCSS (`Card.scss`)**:

```scss
.card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &__title {
    font-size: 1.5rem;
    margin-bottom: 8px;
  }

  &__description {
    font-size: 1rem;
    color: #555;
  }
}
```

---

## Environment Config for React

1. Create an `.env` file in the environments directory in root.

   **`REACT_APP_` prefix** is required for React to expose the variable to the app.
   **Example `.env` file**:

   ```
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_ENV=development
   ```

2. Access environment variables in your code using `process.env.REACT_APP_*`.

   **Example Usage**:

   ```javascript
   const apiUrl = process.env.REACT_APP_API_URL;
   ```

For different environments (development, production), create separate `.env.development`, `.env.production` files with respective configurations.

---

## Git Workflow

We follow a standard Git workflow:

1. **Branch Naming**:

   - **`main`**: This is the production branch. Only stable, production-ready code should be merged into this branch.
   - **`dev`**: This is the development branch where feature branches are merged before going to `main`.

   - Feature branches: `feature/feature-name`
   - Bugfix branches: `bugfix/bug-name`
   - Hotfix branches: `hotfix/hotfix-name`

2. **Commit Message Convention**:

   Use **conventional commit messages** to describe changes:

   - **`feature`**: A new feature.
   - **`fix`**: A bug fix.
   - **`docs`**: Documentation changes.
   - **`chore`**: Routine tasks like refactoring or setup.
   - **`style`**: Code style changes (e.g., formatting).

   Example:

   ```
   git commit -m "feature : Add user authentication"
   ```

3. **Pull Requests (PRs)**:

   - PR titles should be descriptive: `Fix issue with login button on mobile`.
   - Assign at least one reviewer for code review.

---

## ESLint and Prettier Configuration

# 1. **ESLint Configuration** (`.eslintrc.json`):

```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": ["eslint:recommended", "react-app", "plugin:react/recommended"],
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": ["react"],
  "rules": {
    "react/prop-types": "off",
    "no-unused-vars": "warn"
  }
}
```

# ESLint Rules Explained

This document explains each ESLint rule and provides an example for each.

---

### 1. `react/prop-types: "off"`

**Description**: This rule turns off the requirement to use `propTypes` in React components. It's often disabled when using TypeScript, which provides type checking.

**Example**:

```jsx
// No propTypes required since the rule is off.
const MyComponent = ({ name }) => <div>{name}</div>;
```

---

### 2. `no-unused-vars: "error"`

**Description**: This rule flags variables that are declared but never used anywhere in the code. This helps keep the codebase clean and avoids clutter.

**Example**:

```jsx
// Incorrect (flagged as an error)
const unusedVar = 'This is unused';

// Correct (the variable is used)
const usedVar = 'This is used';
console.log(usedVar);
```

---

### 3. `react/jsx-uses-vars: "error"`

**Description**: This rule ensures that JSX components are not mistakenly flagged as unused variables by React. React components that are rendered in JSX should not be flagged as unused.

**Example**:

```jsx
// Incorrect (flagged as an unused variable)
const MyComponent = () => <div>Hello</div>;

// Correct (MyComponent is used)
const MyComponent = () => <div>Hello</div>;
<MyComponent />;
```

---

### 4. `react/no-direct-mutation-state: "error"`

**Description**: This rule prevents directly mutating the `state` object in React class components. It ensures that you use the `setState()` method to update the component state, which triggers re-renders and is more predictable.

**Example**:

```jsx
// Incorrect (direct mutation of state)
this.state.name = 'John';

// Correct (use setState to update state)
this.setState({ name: 'John' });
```

---

### 5. `react/jsx-key: "error"`

**Description**: This rule ensures that each element in a list or iterator has a unique `key` prop. This helps React efficiently update and render components when their order changes.

**Example**:

```jsx
// Incorrect (missing key prop in JSX)
const items = [1, 2, 3].map((item) => <li>{item}</li>);

// Correct (each item has a unique key prop)
const items = [1, 2, 3].map((item) => <li key={item}>{item}</li>);
```

---

### 6. `react/self-closing-comp: "error"`

**Description**: This rule enforces the use of self-closing tags for components or HTML elements that don’t have children. This improves code readability and consistency.

**Example**:

```jsx
// Incorrect (explicit closing tag)
const Component = () => <div></div>;

// Correct (self-closing tag)
const Component = () => <div />;
```

---

### 7. `react/jsx-no-duplicate-props: "error"`

**Description**: This rule disallows passing the same prop multiple times to a JSX element. This can lead to confusion and bugs as only the last value will be used.

**Example**:

```jsx
// Incorrect (duplicate props)
<MyComponent title="Hello" title="World" />;

// Correct (single prop)
<MyComponent title="Hello" />;
```

---

### 8. `react/jsx-no-undef: "error"`

**Description**: This rule flags undefined variables used in JSX. It ensures that all JSX elements and variables are defined before use.

**Example**:

```jsx
// Incorrect (undefined variable)
<MyUndefinedComponent />;

// Correct (import or define the component)
import MyComponent from './MyComponent';
<MyComponent />;
```

---

### 9. `react/jsx-pascal-case: "error"`

**Description**: This rule enforces that component names are written in PascalCase (uppercase first letter) rather than camelCase or lowercase. This is the convention for React component names.

**Example**:

```jsx
// Incorrect (component name not in PascalCase)
const myComponent = () => <div>Hello</div>;

// Correct (component name in PascalCase)
const MyComponent = () => <div>Hello</div>;
```

---

### 10. `react-hooks/exhaustive-deps: "warn"`

**Description**: This rule ensures that the dependency array for `useEffect` hooks is correctly populated. This helps avoid issues where the effect doesn't run when it should.

**Example**:

```jsx
// Incorrect (missing dependency in the array)
useEffect(() => {
  console.log('Component mounted');
}, []); // This causes a warning if dependencies are missed

// Correct (dependencies are properly listed)
useEffect(() => {
  console.log('Component mounted');
}, [myDependency]);
```

---

### 11. `react/jsx-no-bind: "error"`

**Description**: This rule disallows binding functions in JSX expressions. Binding functions in JSX leads to new instances of functions being created on every render, which can negatively impact performance.

**Example**:

```jsx
// Incorrect (binding function in JSX)
<MyComponent onClick={this.handleClick.bind(this)} />;

// Correct (use an arrow function or pre-bound handler)
<MyComponent onClick={() => this.handleClick()} />;
```

---

### 12. `react/no-access-state-in-setstate: "error"`

**Description**: This rule prevents accessing the current state when calling `this.setState()`, which can cause issues with asynchronous updates.

**Example**:

```jsx
// Incorrect (accessing state in setState)
this.setState({ name: this.state.name + ' Doe' });

// Correct (use the previous state argument in setState)
this.setState((prevState) => ({ name: prevState.name + ' Doe' }));
```

---

### 13. `react-hooks/rules-of-hooks: "error"`

**Description**: This rule enforces the Rules of Hooks, such as calling hooks only at the top level of a component and never inside loops, conditions, or nested functions.

**Example**:

```jsx
// Incorrect (hook call inside a condition)
if (someCondition) {
  useEffect(() => {
    /* logic */
  }, []);
}

// Correct (hook call at the top level)
useEffect(() => {
  /* logic */
}, []);
```

---

### 14. `react/jsx-fragments: "error"`

**Description**: This rule enforces the use of `React.Fragment` or shorthand syntax (`<> </>`) instead of using a `div` or other unnecessary wrapper elements.

**Example**:

```jsx
// Incorrect (using div unnecessarily)
const MyComponent = () => (
  <div>
    <p>Hello</p>
  </div>
);

// Correct (using React.Fragment or shorthand)
const MyComponent = () => (
  <>
    <p>Hello</p>
  </>
);
```

---

### 15. `react/require-default-props: "off"`

**Description**: This rule turns off the requirement to specify default props for components. It's often disabled if you're using TypeScript or if default props are not needed.

**Example**:

```jsx
// No default props required since the rule is off.
const MyComponent = ({ name }) => <div>{name}</div>;
```

---

### 16. `react/no-unescaped-entities: "error"`

**Description**: This rule prevents using unescaped characters in JSX, such as `"` or `'`. This ensures the markup is valid and properly escaped.

**Example**:

```jsx
// Incorrect (unescaped entities)
const MyComponent = () => <div>It's a nice day</div>;

// Correct (escaped entities)
const MyComponent = () => <div>It&apos;s a nice day</div>;
```

---

### 17. `react/no-array-index-key: "error"`

**Description**: This rule disallows using array indices as keys in JSX. It’s recommended to use unique and stable values instead of array indices, as they can cause issues with reordering and rendering.

**Example**:

```jsx
// Incorrect (using array index as key)
const items = [1, 2, 3].map((item, index) => <li key={index}>{item}</li>");

// Correct (using a unique key)
const items = [1, 2, 3].map((item) => <li key={item}>{item}</li>);
```

---

### 18. `react/jsx-no-comment-textnodes: "error"`

**Description**: This rule disallows adding text nodes inside comments in JSX, as it can cause unexpected rendering issues.

**Example**:

```jsx
// Incorrect (commenting with text inside JSX)
const MyComponent = () => <div>{/* This is a comment */}</div>;

// Correct (comments outside JSX)
const MyComponent = () => <div>{/* Comment outside JSX */}</div>;
```

---

# 2. **Prettier Configuration** (`.prettierrc`):

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "tabWidth": 2,
  "printWidth": 80
}
```

# Prettier Configuration Rules for React Project

This document explains the Prettier rules for a React project, with examples for each rule.

---

### 1. `semi: true`

**Description**: Enforces the use of semicolons at the end of statements.

**Example**:

```js
const name = 'John'; // Semicolon required
const age = 30; // Semicolon required
```

---

### 2. `singleQuote: true`

**Description**: Enforces the use of single quotes for string literals instead of double quotes.

**Example**:

```js
const greeting = 'Hello, World!'; // Single quote is preferred
const name = 'John'; // Single quote is preferred
```

---

### 3. `trailingComma: "es5"`

**Description**: Adds trailing commas where valid in ES5 (e.g., in objects and arrays).

**Example**:

```js
const person = {
  name: 'John',
  age: 30, // Trailing comma in the last item
};
const numbers = [1, 2, 3]; // Trailing comma in the last item
```

---

### 4. `tabWidth: 2`

**Description**: Sets the number of spaces per indentation level.

**Example**:

```js
function greet() {
  console.log('Hello, World!');
}
```

- **Result**: The indentation is 2 spaces per level.

---

### 5. `useTabs: false`

**Description**: Specifies that spaces, not tabs, should be used for indentation.

**Example**:

```js
function greet() {
  console.log('Hello, World!'); // Indentation is done with spaces
}
```

---

### 6. `bracketSpacing: true`

**Description**: Adds spaces between brackets in object literals.

**Example**:

```js
const obj = { name: 'John', age: 30 }; // Space between the brackets
const noSpaceObj = { name: 'John', age: 30 }; // No spaces (if false)
```

---

### 7. `jsxBracketSameLine: false`

**Description**: Puts the closing `>` of a multi-line JSX element on its own line.

**Example**:

```jsx
const element = (
  <div>
    <h1>Hello, World!</h1>
  </div> // '>' is placed on a new line
);
```

If set to `true`, the closing `>` will be placed at the end of the last line of the element.

---

### 8. `arrowParens: "always"`

**Description**: Always include parentheses around the arguments of arrow functions.

**Example**:

```js
const sum = (a, b) => a + b; // Parentheses are required
const greet = () => 'Hello!'; // Parentheses are required, even for no arguments
```

---

### 9. `printWidth: 80`

**Description**: Specifies the maximum line length that Prettier will wrap lines to. This will help keep lines to a readable length.

**Example**:

```js
// The line will break automatically if it's longer than 80 characters
const longString =
  'This is a very long string that will be wrapped by Prettier if it exceeds 80 characters in length.';
```

---

### 10. `endOfLine: "lf"`

**Description**: Enforces line feed (`
`) for line endings, which is common on Unix-based systems (including Linux and macOS).

**Example**:

```js
// All lines end with line feed (
) instead of carriage return (
) or both (
)
const name = 'John'; // Line ending with LF
```

---

### 11. `htmlWhitespaceSensitivity: "ignore"`

**Description**: Controls how Prettier handles white spaces in HTML files. Setting it to `"ignore"` means Prettier will not consider white space sensitivity in HTML files.

**Example**:

```html
<div>
  <p>Hello World</p>
  <!-- Extra spaces are ignored -->
</div>
```

---

### 12. `quoteProps: "as-needed"`

**Description**: Only adds quotes around object properties when necessary. If the property name is a simple identifier (like `name`), no quotes will be added.

**Example**:

```js
const obj = {
  name: 'John', // No quotes around 'name' because it's a simple identifier
  'full name': 'John Doe', // Quotes added for 'full name' because it's not a valid identifier
};
```

---

### 13. `embeddedLanguageFormatting: "auto"`

**Description**: Automatically formats embedded code within files (such as inside HTML, Markdown, etc.).

**Example**:

```html
<div>
  <pre><code class="javascript">
    const x = 10; // This JavaScript will be formatted automatically
  </code></pre>
</div>
```

---

### 14. `react/jsx-filename-extension: [1, { "extensions": [".js", ".jsx"] }]`

**Description**: Specifies which file extensions should be used for JSX syntax. By default, `.jsx` is used for JSX files, but this rule can allow you to use `.js` files with JSX syntax as well.

**Example**:

```jsx
// This allows JSX syntax inside .js files as well as .jsx files.
const MyComponent = () => <div>Hello, React!</div>;
```

If you set this to `[".tsx", ".jsx"]`, it would enforce JSX in `.tsx` and `.jsx` files only.

---

By customizing your Prettier configuration as shown above, you ensure consistent code style and formatting across your React project.

# 3. **Setting Up Linting and Formatting**:

- Install necessary dependencies:

```bash
npm install eslint prettier eslint-plugin-react eslint-config-prettier eslint-plugin-prettier --save-dev
```

- Add linting and formatting scripts in `package.json`:

```json
"scripts": {
  "lint": "eslint 'src/**/*.{js,jsx}'",
  "format": "prettier --write 'src/**/*.{js,jsx,scss}'"
}
```

---

## Addtional Best Practices

- **Avoid Inline Styles**: Use CSS/SCSS classes instead of inline styles to ensure maintainability.

## Conclusion

Following these guidelines will ensure consistency and maintainability across the codebase. Feel free to reach out if you have any questions while working on the project. Happy coding!
