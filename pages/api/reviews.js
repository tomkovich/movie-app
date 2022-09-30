import { request } from "../../utils/common";

export default async function handler(req, res) {
  try {
    const { id } = req.query;
    const { data } = await request({
      url: `title/get-user-reviews`,
      params: {
        tconst: id,
      },
    });

    if (data) res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(`Error during fetching movie reviews`);
  }
}
