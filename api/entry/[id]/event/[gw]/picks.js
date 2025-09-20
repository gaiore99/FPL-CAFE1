import { robustJsonFetch, okJson, errJson } from '../../../_utils.js';
export default async function handler(req,res){
  const {id,gw}=req.query; if(!id||!gw) return errJson(res,400,'Missing id or gw');
  try{ const data=await robustJsonFetch(`https://fantasy.premierleague.com/api/entry/${id}/event/${gw}/picks/`);
    okJson(res,data,'s-maxage=30, stale-while-revalidate=60');
  }catch(e){ errJson(res,502,e); }
}