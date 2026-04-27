import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import type { BlogPost } from '@/types';

const blogDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPostWithHtml extends BlogPost {
  contentHtml: string;
}

function getAllBlogFiles(): string[] {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }
  
  return fs.readdirSync(blogDirectory)
    .filter(file => file.endsWith('.md'))
    .map(file => path.join(blogDirectory, file));
}

function extractTitleFromFile(filePath: string, fileName: string): string {
  // Remove .md extension and convert kebab-case to Title Case
  const nameWithoutExt = fileName.replace(/\.md$/, '');
  return nameWithoutExt
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

function parseMarkdown(markdown: string): string {
  const remarker = remark();
  return remarker.use(html).processSync(markdown).toString();
}

export function getAllBlogPosts(): BlogPost[] {
  const files = getAllBlogFiles();
  
  const posts = files.map(filePath => {
    const fileName = path.basename(filePath);
    const slug = fileName.replace(/\.md$/, '');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    // Ensure date is always a string
    const postDate = data.date instanceof Date 
      ? data.date.toISOString().split('T')[0]
      : String(data.date || new Date().toISOString().split('T')[0]);
    
    return {
      id: slug,
      title: data.title || extractTitleFromFile(filePath, fileName),
      excerpt: content.slice(0, 200).replace(/[#*`\n]/g, '').trim() + '...',
      content: content,
      publishedAt: postDate,
      category: data.category || 'technical',
      readingTime: calculateReadingTime(content),
      tags: data.tags || [],
    } as BlogPost;
  });
  
  // Sort by date, newest first
  return posts.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getLatestBlogPost(): BlogPost | null {
  const posts = getAllBlogPosts();
  return posts[0] || null;
}

export function getLatestBlogPostWithHtml(): BlogPostWithHtml | null {
  const latestPost = getLatestBlogPost();
  if (!latestPost) return null;
  
  return {
    ...latestPost,
    contentHtml: parseMarkdown(latestPost.content),
  };
}

export function getBlogPostBySlug(slug: string): BlogPostWithHtml | null {
  const filePath = path.join(blogDirectory, `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const fileName = path.basename(filePath);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  
  // Ensure date is always a string
  const postDate = data.date instanceof Date 
    ? data.date.toISOString().split('T')[0]
    : String(data.date || new Date().toISOString().split('T')[0]);
  
  return {
    id: slug,
    title: data.title || extractTitleFromFile(filePath, fileName),
    excerpt: content.slice(0, 200).replace(/[#*`\n]/g, '').trim() + '...',
    content: content,
    contentHtml: parseMarkdown(content),
    publishedAt: postDate,
    category: data.category || 'technical',
    readingTime: calculateReadingTime(content),
    tags: data.tags || [],
  };
}

export function getAdjacentPosts(currentSlug: string): { prev: BlogPost | null; next: BlogPost | null } {
  const posts = getAllBlogPosts();
  const currentIndex = posts.findIndex(p => p.id === currentSlug);
  
  if (currentIndex === -1) {
    return { prev: null, next: null };
  }
  
  return {
    prev: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
    next: currentIndex > 0 ? posts[currentIndex - 1] : null,
  };
}