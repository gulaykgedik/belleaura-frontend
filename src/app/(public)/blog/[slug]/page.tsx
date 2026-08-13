import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, findBlogPost } from "@/features/blog/posts";

export function generateStaticParams() { return blogPosts.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = findBlogPost(slug);
  return post ? { title: post.title, description: post.excerpt } : { title: "Yazı bulunamadı" };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = findBlogPost(slug);
  if (!post) notFound();

  return <article className="pb-16 sm:pb-24"><header className="bg-[#f4ede7] px-4 py-16 sm:px-6 sm:py-20 lg:px-8"><div className="mx-auto max-w-4xl"><Link href="/blog" className="text-sm font-semibold text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">← Blog’a Dön</Link><p className="mt-10 text-xs font-bold uppercase tracking-[.2em] text-primary">{post.category}</p><h1 className="mt-4 text-4xl leading-tight sm:text-6xl">{post.title}</h1><p className="mt-6 text-sm text-muted">{post.publishedAt} · {post.readingTime}</p></div></header><div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"><div className={`relative -mt-1 aspect-[16/8] overflow-hidden rounded-b-[2.5rem] ${post.tone}`} role="img" aria-label={`${post.title} için pastel editorial görsel`}><div className="absolute left-[14%] top-[14%] h-[68%] w-[30%] rounded-[7rem_7rem_1rem_1rem] bg-white/35"/><div className="absolute bottom-[12%] right-[15%] size-44 rounded-full border border-white/60 bg-white/15"/></div><div className="mx-auto mt-12 max-w-2xl space-y-7 text-base leading-8 text-muted">{post.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><div className="mx-auto mt-12 max-w-2xl border-t pt-8"><Link href="/appointments/new" className="inline-flex rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">Randevu Al</Link></div></div></article>;
}
