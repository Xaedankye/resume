import { getLatestBlogPostWithHtml, getAdjacentPosts } from '@/lib/blog';
import { BlogPostView } from '@/components/blog/BlogPostView';

export default async function BlogPage() {
  const latestPost = await getLatestBlogPostWithHtml();
  
  if (!latestPost) {
    return (
      <div className="min-h-screen pt-16">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] gap-4">
          <p className="text-[var(--text-muted)]">No blog posts yet.</p>
        </div>
      </div>
    );
  }
  
  const adjacentPosts = await getAdjacentPosts(latestPost.id);
  
  return <BlogPostView post={latestPost} adjacentPosts={adjacentPosts} />;
}