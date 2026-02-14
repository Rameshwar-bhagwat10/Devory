import { PrismaClient, PostType, ProjectDomain, ProjectDifficulty } from '@prisma/client';

const prisma = new PrismaClient();

// Sample community posts data
const IDEAS_DATA = [
  {
    title: 'AI-Powered Code Review Assistant',
    shortDescription: 'An intelligent tool that analyzes code quality, suggests improvements, and detects potential bugs using machine learning algorithms.',
    fullDescription: 'This project aims to create an AI-powered code review assistant that integrates with popular version control systems like GitHub and GitLab. The tool will use advanced machine learning models to analyze code patterns, identify potential bugs, suggest performance optimizations, and ensure adherence to coding standards. It will provide real-time feedback during pull requests and offer detailed explanations for each suggestion. The system will learn from accepted and rejected suggestions to improve its accuracy over time.',
    domain: 'AI_ML' as ProjectDomain,
    difficulty: 'ADVANCED' as ProjectDifficulty,
    tags: ['AI', 'Machine Learning', 'Code Quality', 'DevOps', 'Automation'],
    techStack: ['Python', 'TensorFlow', 'FastAPI', 'Docker', 'PostgreSQL'],
    estimatedDuration: '4-6 months',
  },
  {
    title: 'Decentralized Social Media Platform',
    shortDescription: 'A blockchain-based social network where users own their data and content, with built-in monetization through cryptocurrency.',
    fullDescription: 'Build a revolutionary social media platform on blockchain technology that gives users complete control over their data and content. The platform will use smart contracts for content ownership, implement a token-based economy for content monetization, and provide decentralized storage using IPFS. Users can earn tokens through engagement, and creators can monetize their content directly without intermediaries. The platform will feature end-to-end encryption, censorship resistance, and transparent content moderation through community governance.',
    domain: 'BLOCKCHAIN' as ProjectDomain,
    difficulty: 'EXPERT' as ProjectDifficulty,
    tags: ['Blockchain', 'Web3', 'Cryptocurrency', 'Decentralization', 'Smart Contracts'],
    techStack: ['Solidity', 'Ethereum', 'React', 'IPFS', 'Web3.js', 'Node.js'],
    estimatedDuration: '8-12 months',
  }
]
