"use strict";(()=>{var e={};e.id=780,e.ids=[780],e.modules={517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},4675:(e,t,r)=>{r.r(t),r.d(t,{headerHooks:()=>g,originalPathname:()=>v,patchFetch:()=>w,requestAsyncStorage:()=>d,routeModule:()=>p,serverHooks:()=>m,staticGenerationAsyncStorage:()=>h,staticGenerationBailout:()=>f});var i={};r.r(i),r.d(i,{POST:()=>u});var n=r(5419),a=r(9108),o=r(9678),s=r(8070),c=r(973);let l=process.env.GEMINI_API_KEY?new c.$D(process.env.GEMINI_API_KEY):null;async function u(e){let{text:t}=await e.json();if(l)try{let e=l.getGenerativeModel({model:"gemini-pro"}),r=`
        You are an expert Technical Product Manager at a high-growth tech company. 
        Your goal is to take a rough issue description and transform it into a professional, engineering-ready ticket.
        
        Input Issue: "${t}"

        Return a valid JSON object (no markdown formatting, just raw JSON) with the following structure:
        {
          "title": "Concise, action-oriented title",
          "description": "Detailed description using Markdown. Include 'Context', 'Problem', and 'Proposed Solution' sections.",
          "acceptanceCriteria": ["List of verifyable checks"],
          "priority": "Low" | "Medium" | "High" | "Urgent",
          "labels": ["List", "of", "relevant", "labels"],
          "complexity": "1" | "2" | "3" | "5" | "8"
        }
      `,i=await e.generateContent(r),n=(await i.response).text();n=n.replace(/^```json\s*/,"").replace(/\s*```$/,"");try{let e=JSON.parse(n||"{}"),t=`
${e.description}

### Acceptance Criteria
${e.acceptanceCriteria?.map(e=>`- [ ] ${e}`).join("\n")||"- [ ] Verify the fix"}
        `.trim();return s.Z.json({...e,description:t})}catch(e){return console.error("JSON Parse Error",e),console.log("Raw Response:",n),s.Z.json({title:t.slice(0,50),description:n||"Enhanced description",priority:"Medium",labels:["ai-error"]})}}catch(e){console.error("Gemini Error:",e)}return s.Z.json({title:t.length>20?t.slice(0,20)+"...":t,description:"AI enhancement requires GEMINI_API_KEY. \n\nOriginal: "+t,priority:"Medium",labels:["mock","demo"]})}let p=new n.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/ai/enhance-issue/route",pathname:"/api/ai/enhance-issue",filename:"route",bundlePath:"app/api/ai/enhance-issue/route"},resolvedPagePath:"C:\\Users\\abhic\\OneDrive\\Desktop\\linear-plus\\app\\api\\ai\\enhance-issue\\route.ts",nextConfigOutput:"",userland:i}),{requestAsyncStorage:d,staticGenerationAsyncStorage:h,serverHooks:m,headerHooks:g,staticGenerationBailout:f}=p,v="/api/ai/enhance-issue/route";function w(){return(0,o.patchFetch)({serverHooks:m,staticGenerationAsyncStorage:h})}}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),i=t.X(0,[638,269],()=>r(4675));module.exports=i})();