"use strict";(()=>{var e={};e.id=780,e.ids=[780],e.modules={517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},4675:(e,t,i)=>{i.r(t),i.d(t,{headerHooks:()=>g,originalPathname:()=>f,patchFetch:()=>y,requestAsyncStorage:()=>d,routeModule:()=>u,serverHooks:()=>m,staticGenerationAsyncStorage:()=>h,staticGenerationBailout:()=>P});var r={};i.r(r),i.d(r,{POST:()=>p});var n=i(5419),o=i(9108),a=i(9678),s=i(8070),c=i(3231);let l=process.env.OPENAI_API_KEY?new c.ZP({apiKey:process.env.OPENAI_API_KEY}):null;async function p(e){let{text:t}=await e.json();if(l)try{let e=(await l.chat.completions.create({messages:[{role:"system",content:`You are an expert Technical Product Manager at a high-growth tech company. 
            Your goal is to take a rough issue description and transform it into a professional, engineering-ready ticket.
            
            Return a JSON object with the following structure:
            {
              "title": "Concise, action-oriented title (e.g., 'Fix login race condition')",
              "description": "Detailed description using Markdown. Include 'Context', 'Problem', and 'Proposed Solution' sections. Be professional and concise.",
              "acceptanceCriteria": ["List of verifyable checks"],
              "priority": "Low" | "Medium" | "High" | "Urgent",
              "labels": ["List", "of", "relevant", "labels"],
              "complexity": "1" | "2" | "3" | "5" | "8" (Fibonacci estimate)
            }`},{role:"user",content:`Enhance this issue: "${t}"`}],model:"gpt-3.5-turbo",response_format:{type:"json_object"},temperature:.7})).choices[0].message.content;try{let t=JSON.parse(e||"{}"),i=`
${t.description}

### Acceptance Criteria
${t.acceptanceCriteria?.map(e=>`- [ ] ${e}`).join("\n")||"- [ ] Verify the fix"}
        `.trim();return s.Z.json({...t,description:i})}catch(i){return console.error("JSON Parse Error",i),s.Z.json({title:t.slice(0,50),description:e||"Enhanced description",priority:"Medium",labels:["ai-error"]})}}catch(e){console.error("OpenAI Error:",e)}return s.Z.json({title:t.length>20?t.slice(0,20)+"...":t,description:"AI enhancement requires OPENAI_API_KEY. \n\nOriginal: "+t,priority:"Medium",labels:["mock","demo"]})}let u=new n.AppRouteRouteModule({definition:{kind:o.x.APP_ROUTE,page:"/api/ai/enhance-issue/route",pathname:"/api/ai/enhance-issue",filename:"route",bundlePath:"app/api/ai/enhance-issue/route"},resolvedPagePath:"C:\\Users\\abhic\\OneDrive\\Desktop\\linear-plus\\app\\api\\ai\\enhance-issue\\route.ts",nextConfigOutput:"",userland:r}),{requestAsyncStorage:d,staticGenerationAsyncStorage:h,serverHooks:m,headerHooks:g,staticGenerationBailout:P}=u,f="/api/ai/enhance-issue/route";function y(){return(0,a.patchFetch)({serverHooks:m,staticGenerationAsyncStorage:h})}}};var t=require("../../../../webpack-runtime.js");t.C(e);var i=e=>t(t.s=e),r=t.X(0,[638,289],()=>i(4675));module.exports=r})();