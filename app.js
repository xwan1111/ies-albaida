let chats=[{messages:[]}];
let current=0;

function renderChats(){
 chatList.innerHTML="";
 chats.forEach((c,i)=>{
  const d=document.createElement("div");
  d.textContent="Chat "+(i+1);
  d.onclick=()=>{current=i;render()};
  chatList.appendChild(d);
 });
}
function newChat(){chats.push({messages:[]});current=chats.length-1;renderChats();render();}

function render(){
 messages.innerHTML="";
 chats[current].messages.forEach(m=>{
  const div=document.createElement("div");
  div.className="msg "+m.role;
  div.innerHTML=m.text;
  messages.appendChild(div);

  if(m.images){
    const g=document.createElement("div");
    g.className="images";
    m.images.forEach(src=>{
      const img=document.createElement("img");
      img.src=src;
      g.appendChild(img);
    });
    messages.appendChild(g);
  }
 });
 messages.scrollTop=999999;
}

async function send(){
 const text=prompt.value.trim();
 if(!text) return;

 chats[current].messages.push({role:"user",text});
 render();
 prompt.value="";

 if(text==="/play"){openGames();return;}

 const styleVal=style.value;
 const countVal=parseInt(count.value);

 const imgs=await generateImages(text,countVal,styleVal);

 chats[current].messages.push({
   role:"ai",
   text:"Imágenes generadas:",
   images:imgs
 });

 render();
}

prompt.addEventListener("keydown",e=>{
 if(e.key==="Enter")send();
});

/* Juegos interactivos */
function openGames(){
 chats[current].messages.push({role:"ai",text:`
<h3>🎮 Juegos</h3>
<button onclick="guess()">Adivina número</button>
<button onclick="reflex()">Reflejos</button>
<button onclick="snake()">Snake</button>
<canvas id="game" width="300" height="300"></canvas>
`});
 render();
}

function guess(){
 const n=Math.floor(Math.random()*10)+1;
 let g=prompt("Número 1-10");
 alert(g==n?"Ganaste":"Era "+n);
}

function reflex(){
 const t=Date.now();
 alert("Pulsa OK rápido");
 alert("Tiempo: "+(Date.now()-t)+" ms");
}

function snake(){
 const c=document.getElementById("game");
 const ctx=c.getContext("2d");
 let x=150,y=150,dx=10,dy=0,foodX=50,foodY=50;

 document.onkeydown=e=>{
  if(e.key==="ArrowUp"){dx=0;dy=-10}
  if(e.key==="ArrowDown"){dx=0;dy=10}
  if(e.key==="ArrowLeft"){dx=-10;dy=0}
  if(e.key==="ArrowRight"){dx=10;dy=0}
 };

 setInterval(()=>{
  ctx.fillStyle="black";
  ctx.fillRect(0,0,300,300);
  x+=dx;y+=dy;

  if(x==foodX && y==foodY){
    foodX=Math.random()*290|0;
    foodY=Math.random()*290|0;
  }

  ctx.fillStyle="red";
  ctx.fillRect(foodX,foodY,10,10);

  ctx.fillStyle="lime";
  ctx.fillRect(x,y,10,10);
 },120);
}

renderChats();
render();
