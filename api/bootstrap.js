import { robustJsonFetch, okJson, errJson } from './_utils.js';
export default async function handler(req,res){
  try{ const data=await robustJsonFetch('https://fantasy.premierleague.com/api/bootstrap-static/');
    okJson(res,data,'s-maxage=60, stale-while-revalidate=120');
  }catch(e){ errJson(res,502,e); }
}