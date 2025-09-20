const { robustJsonFetch, okJson, errJson } = require("../_utils");
module.exports = async (req, res) => {
  const id = (req.query && req.query.id) || req.url.split("/").pop();
  if (!id) return errJson(res, 400, "Missing id");
  try {
    const data = await robustJsonFetch(`https://fantasy.premierleague.com/api/entry/${id}/`);
    okJson(res, data, "s-maxage=120, stale-while-revalidate=600");
  } catch (e) { errJson(res, 502, e); }
};