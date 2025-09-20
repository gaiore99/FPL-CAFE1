const { robustJsonFetch, okJson, errJson } = require("../_utils");
module.exports = async (req, res) => {
  const gw = (req.query && req.query.gw) || req.url.split("/").pop();
  if (!gw) return errJson(res, 400, "Missing gw");
  try {
    const data = await robustJsonFetch(`https://fantasy.premierleague.com/api/event/${gw}/live/`);
    okJson(res, data, "s-maxage=5, stale-while-revalidate=15");
  } catch (e) { errJson(res, 502, e); }
};