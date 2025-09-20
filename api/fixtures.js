import { robustJsonFetch, okJson, errJson } from './_utils.js';
export default async function handler(req,res){
  try{
    const qs=req.url.includes('?')?req.url.slice(req.url.indexOf('?')):'';
    const url=`https://fantasy.premierleague.com/api/fixtures/${qs}`;
    const data=await robustJsonFetch(url);
    okJson(res,data,'s-maxage=20, stale-while-revalidate=40');
  }catch(e){ errJson(res,502,e); }
}