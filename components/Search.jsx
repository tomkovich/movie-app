import Image from "next/image";
import React, { useState } from "react";

import search from "../images/search.png";
import refresh from "../images/refresh.png";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useAppStore } from "../store/store";
import { useRouter } from "next/router";
import { getIdFromKey } from "../utils/common";

const Search = () => {
  const router = useRouter();
  const [timer, setTimer] = useState(null);
  const [isEmpty, setEmpty] = useState(false);
  const [value, setValue] = useState("");
  const [isLoading, setLoading] = useState(false);

  const { setItems } = useAppStore();

  const handleSearch = async (title) => {
    setLoading(true);

    const {
      data: { results },
    } = await axios.get(`${BASE_URL}/api/search`, {
      params: {
        title,
        limit: 100,
        titleType: "movie",
      },
    });

    if (results?.length) {
      const ids = results.map(({ id }) => id);

      setItems(ids);
      router.push(`${BASE_URL}/${getIdFromKey(ids[0])}`);
    }

    setEmpty(!results?.length);
    setLoading(false);
  };

  const handleChange = ({ target: { value } }) => {
    if (isLoading) return;

    setValue(value);
    clearInterval(timer);

    if (value) {
      setTimer(
        setTimeout(() => {
          handleSearch(value);
        }, 700)
      );
    }
  };

  return (
    <form>
      <div className="search">
        <input
          type="text"
          name="title"
          placeholder="Search a movie..."
          value={value}
          onChange={handleChange}
        />

        <Image
          className={`icon ${isLoading ? "loading" : ""}`}
          src={!isLoading ? search : refresh}
          alt=""
          width={14}
          height={14}
        />

        {isEmpty && <div className="tooltip">No results.</div>}
      </div>
    </form>
  );
};

export default Search;
