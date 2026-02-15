const API_KEY="PON_AQUI_TU_API_KEY"; // opcional, si no hay API usa imágenes fake

async function generateImages(prompt,count,style){
 if(API_KEY==="PON_AQUI_TU_API_KEY"){
   return fakeImages(prompt,count,style);
 }

 try{
   const res=await fetch("https://api.openai.com/v1/images/generations",{
     method:"POST",
     headers:{
       "Content-Type":"application/json",
       "Authorization":"Bearer "+API_KEY
     },
     body:JSON.stringify({
       model:"gpt-image-1",
       prompt:`${prompt}, estilo ${style}`,
       size:"1024x1024",
       n:count
     })
   });

   const data=await res.json();
   return data.data.map(x=>x.url);
 }catch(e){
   return fakeImages(prompt,count,style);
 }
}

function fakeImages(prompt,count,style){
 const arr=[];
 for(let i=0;i<count;i++){
   arr.push(`https://picsum.photos/seed/${encodeURIComponent(prompt+style+i)}/600`);
 }
 return arr;
}
