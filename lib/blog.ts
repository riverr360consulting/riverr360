import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  category: string;
  author: string;
  publishedDate: string;
  updatedDate?: string;
  coverImage?: string;
  coverImageAlt?: string;
  featured: boolean;
  tags: string[];
  schemaType?: string;
  content: string;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames
    .filter(f => f.endsWith('.md') && !f.startsWith('TEMPLATE'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const { data, content } = matter(fs.readFileSync(fullPath, 'utf8'));

      return {
        slug,
        title: data.title || 'Untitled',
        // metaTitle/metaDescription fall back to title/excerpt if not set in frontmatter
        metaTitle: data.metaTitle || data.title || 'Untitled',
        metaDescription: data.metaDescription || data.excerpt || '',
        excerpt: data.excerpt || '',
        category: data.category || 'General',
        author: data.author || 'Riverr360 Team',
        publishedDate: data.publishedDate || new Date().toISOString().split('T')[0],
        updatedDate: data.updatedDate || undefined,
        coverImage: data.coverImage || '',
        coverImageAlt: data.coverImageAlt || data.title || '',
        featured: data.featured || false,
        tags: data.tags || [],
        schemaType: data.schemaType || 'BlogPosting',
        content,
      };
    });

  return allPostsData.sort((a, b) => (a.publishedDate < b.publishedDate ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const { data, content } = matter(fs.readFileSync(fullPath, 'utf8'));

    return {
      slug,
      title: data.title || 'Untitled',
      metaTitle: data.metaTitle || data.title || 'Untitled',
      metaDescription: data.metaDescription || data.excerpt || '',
      excerpt: data.excerpt || '',
      category: data.category || 'General',
      author: data.author || 'Riverr360 Team',
      publishedDate: data.publishedDate || new Date().toISOString().split('T')[0],
      updatedDate: data.updatedDate || undefined,
      coverImage: data.coverImage || '',
      coverImageAlt: data.coverImageAlt || data.title || '',
      featured: data.featured || false,
      tags: data.tags || [],
      schemaType: data.schemaType || 'BlogPosting',
      content,
    };
  } catch {
    return null;
  }
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs.readdirSync(postsDirectory)
    .filter(f => f.endsWith('.md') && !f.startsWith('TEMPLATE'))
    .map(f => f.replace(/\.md$/, ''));
}

export function getFeaturedPosts(): BlogPost[] {
  return getAllPosts().filter(p => p.featured);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter(p => p.category === category);
}

export function getAdjacentPosts(currentSlug: string) {
  const allPosts = getAllPosts();
  const i = allPosts.findIndex(p => p.slug === currentSlug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: i > 0 ? allPosts[i - 1] : null,
    next: i < allPosts.length - 1 ? allPosts[i + 1] : null,
  };
}
