import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedDate: string;
  coverImage?: string;
  featured: boolean;
  tags: string[];
  content: string;
}

// Get all blog posts
export function getAllPosts(): BlogPost[] {
  // Check if directory exists
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md') && !fileName.startsWith('TEMPLATE'))
    .map(fileName => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const { data, content } = matter(fileContents);

      // Combine the data with the slug
      return {
        slug,
        title: data.title || 'Untitled',
        excerpt: data.excerpt || '',
        category: data.category || 'General',
        author: data.author || 'Riverr360 Team',
        publishedDate: data.publishedDate || new Date().toISOString().split('T')[0],
        coverImage: data.coverImage || '',
        featured: data.featured || false,
        tags: data.tags || [],
        content,
      };
    });

  // Sort posts by date (newest first)
  return allPostsData.sort((a, b) => {
    if (a.publishedDate < b.publishedDate) {
      return 1;
    } else {
      return -1;
    }
  });
}

// Get a single post by slug
export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || 'Untitled',
      excerpt: data.excerpt || '',
      category: data.category || 'General',
      author: data.author || 'Riverr360 Team',
      publishedDate: data.publishedDate || new Date().toISOString().split('T')[0],
      coverImage: data.coverImage || '',
      featured: data.featured || false,
      tags: data.tags || [],
      content,
    };
  } catch (error) {
    return null;
  }
}

// Get all post slugs for generating static pages
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.md') && !fileName.startsWith('TEMPLATE'))
    .map(fileName => fileName.replace(/\.md$/, ''));
}

// Get featured posts
export function getFeaturedPosts(): BlogPost[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post => post.featured);
}

// Get posts by category
export function getPostsByCategory(category: string): BlogPost[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post => post.category === category);
}
