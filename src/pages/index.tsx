import { GetStaticProps } from "next";
import Head from "next/head";
import router from "next/router";
import "tailwindcss/tailwind.css";

// defining interfaces
export interface Props {
  userId: number;
  id: number;
  title: string;
  body: string;
}
export interface DataProps {
  //acessing the json data
  data: Props[];
}

export default function Home({ data }: DataProps) {
  return (
    <>
      <Head>
        <title>TWN Project</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="py-8 text-2xl font-semibold text-center text-white bg-black bg-cover">
        Posts from the website
      </div>
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="overflow-x-auto m-16">
          <table className="min-w-full bg-white shadow-md rounded-xl">
            <thead className="text-black">
              <tr>
                <th className="py-3 px-4 text-left">Id</th>
                <th className="py-3 px-4 text-center">Title</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-blue-gray-900">
              {data?.map((post) => (
                <tr key={post.id} className="border-b border-blue-gray-200">
                  <td className="py-3 px-4">{post.id}</td>
                  <td className="py-3 px-4">{post.title}</td>
                  <td className="py-3 px-4">
                    <button
                      className="font-medium text-blue-600 hover:text-black"
                      onClick={() => {
                        router.push(`/posts/${post.id}`);
                      }}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

//connection to the api with the return of the data saved
export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};
