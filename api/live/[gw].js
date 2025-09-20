import { robustJsonFetch, okJson, errJson } from '../../_utils.js';
export default async function handler(req,res){
  const { gw } = req.query;
  if(!gw) return errJson(res,400,'Missing gw');
  try{
    const data=await robustJsonFetch(`https://fantasy.premierleague.com/api/event/${gw}/live/`);
    okJson(res,data,'s-maxage=5, stale-while-revalidate=15');
  }catch(e){ errJson(res,502,e); }
}