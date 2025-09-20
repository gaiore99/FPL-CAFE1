export const config = { runtime: 'edge' };
export default async function handler(req){
  const url=new URL(req.url); const id=url.pathname.split('/').pop();
  const target=`https://footballapi.pulselive.com/football/stats/match/${id}`;
  try{
    const r=await fetch(target,{
      headers:{
        "Origin":"https://www.premierleague.com",
        "Referer":"https://www.premierleague.com/",
        "Accept":"application/json",
        "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) FPLCafe/3.0"
      },
      cache:"no-store", redirect:"follow"
    });
    const text=await r.text();
    if(!r.ok){
      return new Response(JSON.stringify({error:"pl_upstream",status:r.status,body:text.slice(0,200)}),{status:r.status,headers:{"content-type":"application/json"}});
    }
    return new Response(text,{status:200,headers:{"content-type":"application/json"}});
  }catch(e){
    return new Response(JSON.stringify({error:"pl_fetch_failed",detail:String(e)}),{status:502,headers:{"content-type":"application/json"}});
  }
}