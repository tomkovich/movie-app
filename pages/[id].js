import axios from "axios";
import Head from "next/head";
import GetButton from "../components/GetButton";
import MovieItem from "../components/MovieItem";
import { BASE_URL } from "../utils/constants";

export default function Movie({ movie }) {
  return (
    <>
      <Head>
        <title>{movie.title.title}</title>
      </Head>

      <GetButton />
      <MovieItem {...movie} />
    </>
  );
}

export async function getServerSideProps({ query }) {
  console.log("rul", `${BASE_URL}/api/movie?id=${query.id}`);
  const { data } = await axios.get(`${BASE_URL}/api/movie?id=${query.id}`);

  return {
    props: {
      movie: data,
    },
  };
}
