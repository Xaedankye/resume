import { getBlogPostBySlug, getAdjacentPosts, getAllBlogPosts } from '@/lib/blog';
import { BlogPostView } from '@/components/blog/BlogPostView';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.id,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  
  if (!post) {
    notFound();
  }
  
  const adjacentPosts = await getAdjacentPosts(slug);
  
  return <BlogPostView post={post} adjacentPosts={adjacentPosts} />;
}