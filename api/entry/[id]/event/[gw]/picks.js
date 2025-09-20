const { robustJsonFetch, okJson, errJson } = require("../../../_utils");
module.exports = async (req, res) => {
  const parts = req.url.split("/");
  const id = (req.query && req.query.id) || parts[3];
  const gw = (req.query && req.query.gw) || parts[5];
  if (!id || !gw) return errJson(res, 400, "Missing id or gw");
  try {
    const data = await robustJsonFetch(`https://fantasy.premierleague.com/api/entry/${id}/event/${gw}/picks/`);
    okJson(res, data, "s-maxage=30, stale-while-revalidate=60");
  } catch (e) { errJson(res, 502, e); }
};