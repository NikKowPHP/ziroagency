import path from 'path';

// Function to get the database file path from environment variable or default
export const getDatabaseFilePath = () => {
  return path.join(process.cwd(), 'data', 'sqlite.db');
};