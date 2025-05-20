import { BlogPosts } from '../types/blog';

const authors = {
  sarah: {
    name: 'Sarah Chen',
    expertise: 'React & Frontend Development'
  },
  michael: {
    name: 'Michael Rodriguez',
    expertise: 'Security & DevOps'
  },
  emily: {
    name: 'Emily Thompson',
    expertise: 'TypeScript & JavaScript'
  },
  david: {
    name: 'David Kim',
    expertise: 'UI/UX & CSS'
  },
  rachel: {
    name: 'Rachel Singh',
    expertise: 'Backend & Database'
  }
};

export const blogPosts: BlogPosts = [
  {
    slug: 'first-blog-post',
    title: 'First Blog Post',
    description: 'Lorem ipsum dolor sit amet, consectetur adip.',
    author: authors.sarah,
    category: 'Frontend Development',
    comment: ''
  },
  {
    slug: 'second-blog-post',
    title: 'Second Blog Post',
    description: 'Hello React Router v6',
    author: authors.sarah,
    category: 'Frontend Development',
    comment: ''
  },
  {
    slug: 'getting-started-with-typescript',
    title: 'Getting Started with TypeScript',
    description: 'A comprehensive guide to TypeScript fundamentals and best practices',
    author: authors.emily,
    category: 'TypeScript/JavaScript',
    comment: ''
  },
  {
    slug: 'react-hooks-explained',
    title: 'React Hooks Explained',
    description: 'Deep dive into React hooks: useState, useEffect, useContext and more',
    author: authors.sarah,
    category: 'Frontend Development',
    comment: ''
  },
  {
    slug: 'web-security-basics',
    title: 'Web Security Basics Every Developer Should Know',
    description: 'Essential security concepts and practices for modern web applications',
    author: authors.michael,
    category: 'Security',
    comment: ''
  },
  {
    slug: 'state-management',
    title: 'State Management in React Applications',
    description: 'Comparing different state management solutions: Context, Redux, and Zustand',
    author: authors.sarah,
    category: 'Frontend Development',
    comment: ''
  },
  {
    slug: 'responsive-design-patterns',
    title: 'Modern Responsive Design Patterns',
    description: 'Learn effective patterns for creating responsive and mobile-first websites',
    author: authors.david,
    category: 'Design/CSS',
    comment: ''
  },
  {
    slug: 'api-design-best-practices',
    title: 'RESTful API Design Best Practices',
    description: 'Guidelines and principles for designing clean and efficient APIs',
    author: authors.rachel,
    category: 'Backend Development',
    comment: ''
  },
  {
    slug: 'css-grid-flexbox',
    title: 'Mastering CSS Grid and Flexbox',
    description: 'Modern layout techniques for building complex web interfaces',
    author: authors.david,
    category: 'Design/CSS',
    comment: ''
  },
  {
    slug: 'testing-react-apps',
    title: 'Testing React Applications',
    description: 'Comprehensive guide to testing React apps with Jest and React Testing Library',
    author: authors.sarah,
    category: 'Frontend Development',
    comment: ''
  },
  {
    slug: 'web-performance',
    title: 'Web Performance Optimization',
    description: 'Techniques for improving website speed and user experience',
    author: authors.david,
    category: 'Frontend Development',
    comment: ''
  },
  {
    slug: 'git-workflow',
    title: 'Git Workflow for Teams',
    description: 'Best practices for version control and collaboration using Git',
    author: authors.michael,
    category: 'DevOps',
    comment: ''
  },
];