import { fetchData } from "@/src/lib/helpers/fetchData";
import { siteMetadata } from "@/src/lib/SEO/generateMetadata";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  // params may be a Promise in <t></t>he App Router; await it before accessing properties.
  const { slug } = (await params) as { slug: string };
  // Fetch the post data. Use /posts because the example response looks like a post.
  // Convert to the small shape we expect for metadata.
  const { data } = await fetchData(`/posts/${slug}`);
  const json = data as
    | {
        id?: number;
        title?: string;
        body?: string;
        userId?: number;
      }
    | undefined;
  if (!data) {
    return siteMetadata({
      title: `Post ${slug}`,
      description: undefined,
      image: undefined,
      url: `https://example.com/blog/${slug}`,
      type: "article",
      author: "Jibon",
      publishedTime: undefined,
      modifiedTime: undefined,
      keywords: [],
    });
  }

  const post: {
    title: string;
    excerpt: string | undefined;
    image?: string;
    author?: string;
    publishedAt?: string;
    updatedAt?: string;
    tags: string[];
  } = {
    title: json?.title ?? `Post ${slug}`,
    excerpt: (json?.body && String(json.body).split("\n")[0]) ?? undefined,
    image: undefined,
    author: json?.userId ? `User ${json.userId}` : undefined,
    publishedAt: undefined,
    updatedAt: undefined,
    tags: [],
  };

  return siteMetadata({
    title: post?.title,
    description: post?.excerpt,
    image: post?.image,
    url: `https://mindrelaxatiiion.com/blog/${slug}`,
    type: "article",
    author: post?.author ?? "Jibon",
    publishedTime: post?.publishedAt,
    modifiedTime: post?.updatedAt,
    keywords: post?.tags ?? [],
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  // params may be a Promise in the App Router; await it before accessing properties.
  const { slug } = (await params) as { slug: string };

  // Server component fetch for the post content
  const { data } = await fetchData(`/posts/${slug}`);
  const json2 = data as
    | {
        id?: number;
        title?: string;
        body?: string;
        userId?: number;
      }
    | undefined;

  if (!data) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4 text-center">
        <h2 className="text-2xl font-semibold">Post not found</h2>
        <p className="mt-2 text-sm text-gray-500">
          No post found for ID {slug}.
        </p>
      </div>
    );
  }

  const post = {
    id: json2?.id,
    title: json2?.title ?? `Post ${slug}`,
    body: json2?.body ?? "",
    author: json2?.userId ? `User ${json2.userId}` : "Unknown",
  };

  return (
    <article className="max-w-3xl mx-auto py-12 px-4">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl  text-black dark:text-gray-500 font-extrabold leading-tight">
          {post.title}
        </h1>
        <div className="mt-3 flex items-center  text-sm text-black dark:text-gray-500">
          <span>
            By{" "}
            <span className="font-medium  text-black dark:text-gray-700">
              {post.author}
            </span>
          </span>
          <span className="mx-2">·</span>
          <span>Post ID {post.id}</span>
        </div>
      </header>

      <section className="prose prose-lg  text-black dark:text-gray-500 dark:prose-invert">
        {post.body.split("\n").map((para: string, i: number) => (
          <p key={i}>{para}</p>
        ))}
      </section>
    </article>
  );
}
