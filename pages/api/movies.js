import { request } from "../../utils/common";

export default async function handler(req, res) {
  try {
    const { data } = await request({ url: `title/get-most-popular-movies` });
    res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    res.status(500).json(`Error during fetching movies`);
  }
}
