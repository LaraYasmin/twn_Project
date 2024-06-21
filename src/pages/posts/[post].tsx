import { GetStaticPaths, GetStaticProps } from "next";

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
