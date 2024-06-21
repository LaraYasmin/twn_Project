import { GetStaticProps } from "next";

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

//connection to the api with the return of the data saved
export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  );
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};
