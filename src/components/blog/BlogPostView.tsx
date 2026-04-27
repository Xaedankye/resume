'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Clock, ChevronLeft, ChevronRight, Tag, ArrowLeft } from 'lucide-react';
import type { BlogPost } from '@/types';

interface BlogPostViewProps {
  post: BlogPost & { contentHtml?: string };
  adjacentPosts: { prev: BlogPost | null; next: BlogPost | null };
}

export function BlogPostView({ post, adjacentPosts }: BlogPostViewProps) {
  return (
    <div className="min-h-screen pt-16">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent)] mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          All Posts
        </Link>
        
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Post Header */}
          <header className="mb-8">
            <div className="flex items-center gap-4 text-sm text-[var(--text-muted)] mb-4">
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {post.publishedAt}
              </span>
              <span>{post.readingTime} min read</span>
            </div>
            
            <h1 className="text-4xl font-bold text-[var(--foreground)] mb-4">
              {post.title}
            </h1>
            
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    <Tag size={12} className="mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </header>

          {/* Post Content */}
          {post.contentHtml ? (
            <div 
              className="prose prose-invert max-w-none prose-headings:text-[var(--accent)] prose-h1:hidden prose-p:text-[var(--text-muted)] prose-strong:text-[var(--foreground)] prose-a:text-[var(--accent)] prose-li:text-[var(--text-muted)] prose-ul:text-[var(--text-muted)] prose-ol:text-[var(--text-muted)]"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          ) : (
            <div className="prose prose-invert max-w-none text-[var(--text-muted)] whitespace-pre-line">
              {post.content}
            </div>
          )}

          {/* Navigation */}
          <nav className="mt-12 pt-8 border-t border-[var(--border)] flex justify-between">
            {adjacentPosts.prev ? (
              <Link 
                href={`/blog/${adjacentPosts.prev.id}`}
                className="group flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
              >
                <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <div>
                  <div className="text-xs text-[var(--text-muted)]">Previous</div>
                  <div className="font-medium">{adjacentPosts.prev.title}</div>
                </div>
              </Link>
            ) : <div />}
            
            {adjacentPosts.next ? (
              <Link 
                href={`/blog/${adjacentPosts.next.id}`}
                className="group flex items-center gap-2 text-right text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
              >
                <div>
                  <div className="text-xs text-[var(--text-muted)]">Next</div>
                  <div className="font-medium">{adjacentPosts.next.title}</div>
                </div>
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : <div />}
          </nav>
        </motion.article>
      </main>
      <Footer />
    </div>
  );
}