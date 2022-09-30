import React, { useState } from "react";
import Image from "next/image";

import update from "../images/refresh.png";
import { useAppStore } from "../store/store";
import { useRouter } from "next/router";
import { BASE_URL } from "../utils/constants";
import { getIdFromKey, getRandom } from "../utils/common";
import Search from "./Search";

const GetButton = ({ text = "Get a movie", cn = "" }) => {
  const router = useRouter();
  const { items } = useAppStore();
  const { id } = router.query;
  const [isLoading, setLoading] = useState(false);

  const getMovie = () => {
    if (!items?.length || isLoading) return;

    const filtered = items.filter((item) => getIdFromKey(item) !== id);

    if (filtered.length) {
      setLoading(true);

      const random = getRandom(filtered.length);
      const newId = getIdFromKey(filtered[random]);

      router.push(`${BASE_URL}/${newId}`).then(() => setLoading(false));
    }
  };

  return (
    <div className="actions">
      <div
        className={`update ${cn} ${isLoading ? "disabled" : ""}`}
        onClick={getMovie}
      >
        <Image className="icon" src={update} alt="" width={14} height={14} />
        <span>{text}</span>
      </div>

      {router.pathname !== "/" && <Search />}
    </div>
  );
};

export default GetButton;
