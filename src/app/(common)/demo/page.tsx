import { fetchData } from "@/src/lib/helpers/fetchData";
import { siteMetadata } from "@/src/lib/SEO/generateMetadata";
import Link from "next/link";

export async function generateMetadata() {
  return siteMetadata({
    title: "Demo",
    description:
      "Learn about This page’s mission — promoting peace, spirituality, and mindfulness.",
    url: "https://example.com/demo",
  });
}

export default async function DemoPage() {
  // Server component fetch for the post content
  const { data } = await fetchData(`/posts`);
  const json2 = data as
    | {
        id?: number;
        title?: string;
        body?: string;
        userId?: number;
      }[]
    | undefined;

  if (!data) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4 text-center">
        <h2 className="text-2xl font-semibold">Data not found</h2>
        <p className="mt-2 text-sm text-gray-500">No post found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-20">
      <h1 className="text-4xl font-semibold text-black dark:text-foreground">
        All Demo Post Data
      </h1>
      <div className="my-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {json2?.map((post) => (
            <div
              key={post.id}
              className="mb-8 border border-black/50 dark:border-white/80 group cursor-pointer rounded-2xl p-4"
            >
              <Link href={`/demo/${post.id}`}>
                <div>
                  <h2 className="text-2xl text-black dark:text-foreground hover:text-yellow-500 font-bold">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">
                    {post.body}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
