const colores=["#000","#f00","#0f0","#00f","#f3f","#3ff","#ff3","#fff"]
var tablero=[[0,1],[2,3],[4,5],[6,7]];
var movimientos=0;
var canv;
var ctx;

function llenador(){
    tablero=[];
    movimientos=0;
    for(let y=-1;y<canv.getAttribute("height")/15;y++){
        tablero[y]=[];
        for(let x=0;x<canv.getAttribute("width")/15;x++)tablero[y].push(Math.floor(Math.random()*8));
    }
    pintador();
}
function pintador(){
    for(let y=0;y<tablero.length;y++)for(let x=0;x<tablero[0].length;x++){
            ctx.fillStyle=colores[tablero[y][x]];
            ctx.fillRect(15*x,15*y,15,15);
        }
}
function recur(colorn,x,y){
    if((x>=parseInt(document.getElementById("x").value))||(y>=parseInt(document.getElementById("y").value)||(tablero[0][0]!=tablero[y][x])))return;
    recur(colorn,x+1,y);
    recur(colorn,x,y+1);
    tablero[y][x]=colorn;
}
function change(colorn){
    movimientos++;
    document.getElementById("movs").innerHTML=movimientos;
    if(tablero[0][0]==colorn)return;
    recur(colorn,0,1);
    recur(colorn,1,0);
    tablero[0][0]=colorn;
    pintador();
}

window.onload=()=>{
    let p=document.getElementById("pis");
    canv=document.getElementById("caca");
    ctx=canv.getContext("2d");
    llenador();

    document.getElementById("x").onchange=()=>{
        canv.setAttribute("width",parseInt(document.getElementById("x").value)*15);
        llenador();
    }
    document.getElementById("y").onchange=()=>{
        canv.setAttribute("height",parseInt(document.getElementById("y").value)*15);
        llenador();
    }
    document.onclick=()=>{
        p.innerHTML=window.event.clientX+","+window.event.clientY;
    }
    document.getElementById("negro").onclick=   ()=>{change(0);}
    document.getElementById("rojo").onclick=    ()=>{change(1);}
    document.getElementById("verde").onclick=   ()=>{change(2);}
    document.getElementById("azul").onclick=    ()=>{change(3);}
    document.getElementById("rosa").onclick=    ()=>{change(4);}
    document.getElementById("celeste").onclick= ()=>{change(5);}
    document.getElementById("amarillo").onclick=()=>{change(6);}
    document.getElementById("blanco").onclick=  ()=>{change(7);}
}