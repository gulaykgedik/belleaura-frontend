import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/features/blog/posts";
import { demoImages } from "@/lib/demo-images";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = { title: "Blog", description: "Belle Aura Beauty bakım ve wellness yazıları" };

export default function BlogPage() {
  return <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
    <header className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[.24em] text-primary">Belle Aura Blog</p><h1 className="mt-4 text-5xl sm:text-6xl">Bakım dünyasından notlar</h1><p className="mt-5 max-w-2xl text-sm leading-7 text-muted">Kendinize ayırdığınız zamanı güzelleştirecek bakım önerileri, uzman notları ve sakin yaşam ritüelleri.</p></header>
    <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">{blogPosts.map((post, index) => <Reveal key={post.slug} delay={index*80}><article className="group transition-transform duration-300 hover:-translate-y-1"><Link href={`/blog/${post.slug}`} className="relative block aspect-[16/11] overflow-hidden rounded-[2rem]" aria-label={`${post.title} yazısını oku`}><Image src={[demoImages.skincare,demoImages.spa,demoImages.hair][index]} alt={`${post.title} için editorial bakım fotoğrafı`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.04] motion-reduce:transition-none"/><div className="absolute inset-0 bg-[#6f493c]/0 transition-colors duration-300 group-hover:bg-[#6f493c]/15"/></Link><p className="mt-6 text-xs font-bold uppercase tracking-[.17em] text-primary">{post.category} · {post.readingTime}</p><h2 className="mt-3 text-3xl leading-tight"><Link href={`/blog/${post.slug}`} className="hover:text-primary">{post.title}</Link></h2><p className="mt-4 text-sm leading-7 text-muted">{post.excerpt}</p><Link href={`/blog/${post.slug}`} className="mt-5 inline-flex border-b border-primary pb-1 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">Yazıyı Oku →</Link></article></Reveal>)}</div>
  </div>;
}
