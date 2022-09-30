import axios from "axios";
import Head from "next/head";

import ActorItem from "../../components/ActorItem";
import { BASE_URL } from "../../utils/constants";

export default function Actor({ actor }) {
  return (
    <>
      <Head>
        <title>{actor.name}</title>
      </Head>

      <ActorItem {...actor} />
    </>
  );
}

export async function getServerSideProps({ query }) {
  const { data } = await axios.get(`${BASE_URL}/api/actor?id=${query.id}`);

  return {
    props: {
      actor: data,
    },
  };
}
