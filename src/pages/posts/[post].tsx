import { GetStaticPaths, GetStaticProps } from "next";
import "tailwindcss/tailwind.css";

//defining the interface based on the json of the api
export interface Props {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface DataProps {
  data: Props;
}

const PostDetails = ({ data }: DataProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen to-stone-900 bg-gradient-to-br bg-gray-100">
      <div className="w-full max-w-lg px-10 py-8 mx-auto bg-white rounded-lg shadow-xl">
        <div className="max-w-md mx-auto space-y-6">
          <h2 className="text-2xl font-bold"> Post {data.id}</h2>
          <div className="text-base leading-3">
            <p className="leading-tight font-normal text-gray-700 m-4">
              <span className="font-bold">Title: </span>
              {data.title}
            </p>
            <p className="leading-tight font-normal text-gray-700 m-4">
              <span className="font-bold">Description:</span> {data.body}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");

  const data = await res.json();

  //creating an array of objects to access the id as a parameter
  const paths = data.map((element: Props) => {
    return {
      params: {
        post: element.id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: false, //if false, any paths not returned the result will be an error page
  };
};

// Function to fetch data for each individual post
export const getStaticProps: GetStaticProps = async (context) => {
  // Extracting the post ID from the context parameters
  const id = context.params?.post;
  const result = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );

  const data = await result.json();

  // Returning the post data as props
  return {
    props: {
      data,
    },
  };
};
