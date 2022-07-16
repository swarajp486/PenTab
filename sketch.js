chrome.runtime.onMessage.addListener(gotMessage)
function gotMessage(message,sender,sednResponse){
    console.log(message.txt)
}

var F = document.body,
		u = document.documentElement,
		v = document.body.scrollTop || document.documentElement.scrollTop,
		w = Math.max(F.scrollHeight, F.offsetHeight, u.clientHeight, u.scrollHeight, u.offsetHeight),
		x = 7500;
	v + screen.height > x && (x += (v + screen.height) / 7500 * 7500);


var k = document.createElement("div");
k.id = "pageMarker_draggable";
document.body.appendChild(k);
k.innerHTML = '<div id="pageMarker_color"><div class="pageMarker_title">Color</div><input id="pageMarker_colorSelect" type="color" value="#000000"></div><div id="pageMarker_tools"><div class="pageMarker_title pageMarker_toolsTitle">Tools</div><div class="pageMarker_toolDiv"><a id="pageMarker_pen" class="pageMarker_tool"><img id="pageMarker_penImg" class="pageMarker_icon" alt="/images/Marker" title="Marker"></img></a><a id="pageMarker_eraser" class="pageMarker_tool"><img id="pageMarker_eraserImg" class="pageMarker_icon" alt="/images/Eraser" title="Eraser"></img></a><a id="pageMarker_pointer" class="pageMarker_tool"><img id="pageMarker_pointerImg" class="pageMarker_icon" alt="/images/Pointer" title="Pointer"></img></a><a id="pageMarker_save" class="pageMarker_tool"><img id="pageMarker_saveImg" class="pageMarker_icon" alt="/images/Save" title="Save Drawing"></img></a><a id="pageMarker_clear" class="pageMarker_tool"><img id="pageMarker_clearImg" class="pageMarker_icon" alt="/images/Clear" title="Clear"></img></a><a id="pageMarker_exit" class="pageMarker_tool"><img id="pageMarker_exitImg" class="pageMarker_icon" alt="/images/Exit" title="Exit"></img></a></div></div><div id="pageMarker_size"><div class="pageMarker_title">Size</div><input type="range" id="pageMarker_thicknessSlider" value="5" max="60" min="1"></div>';
k.style.top = v + "px";
var R =document.querySelectorAll(".pageMarker_tool");
console.log(R)
  
R.forEach(function(a, c) {
    
    var h = a.querySelector("img");
    h.src = chrome.runtime.getURL(h.alt.toLowerCase() + ".png");
    });


let penEnable=false, 
    eraseEnable =false,
    pointerEnable=false,
    saveEnable=false,
    deleteEnable=false;
   

function setup(){
    console.log(windowHeight,windowWidth)
    console.log("skfjls")
    let boardDraw=createCanvas(document.body.clientWidth,x)
   
    boardDraw.position(0,0)
    boardDraw.id("pageMarker_canvas")
    boardDraw.style("cursor" ,"crosshair")
    console.log("try_height_width",document.getElementById("pageMarker_canvas").style.height,document.getElementById("pageMarker_canvas").style.width)
    clean = document.getElementById("pageMarker_clear")
   
    pointer = document.getElementById("pageMarker_pointer")
    pen = document.getElementById("pageMarker_pen")
    eras = document.getElementById("pageMarker_eraser")

    pen.addEventListener("click",function(){
      enablepen(boardDraw)
    })
    eras.addEventListener("click",function(){
     toggleErase(boardDraw)
    })
    pointer.addEventListener("click",function(){
        enablpointer(boardDraw)
    })
    clean.addEventListener("click",function(){
        clearScreen(boardDraw)
    });
    

    
 }


function draw(){
    pen_thick = document.getElementById("pageMarker_thicknessSlider")
    pen_color = document.getElementById("pageMarker_colorSelect")
   
    
    stroke(pen_color.value)
    strokeWeight(pen_thick.value)
    if(penEnable && mouseIsPressed){
        line(mouseX,mouseY,pmouseX,pmouseY)
    }
}


pen = document.getElementById("pageMarker_pen")
eras = document.getElementById("pageMarker_eraser")
pointer = document.getElementById("pageMarker_pointer")
exitdiv = document.getElementById("pageMarker_exit")
sav = document.getElementById("pageMarker_save")
eras.addEventListener("click",toggleErase);
pen.addEventListener("click",enablepen)
exitdiv.addEventListener("click",exit)
function G(a, c) {
  a.style.background = ""
}

function d(a) {
  console.log("d",penEnable,eraseEnable)
  
  R.forEach(G);
 
  a.style.background = "rgba(0,0,0,0.2)"

}



function enablepen(a){
  d(pen)
  console.log("enablepen",penEnable,eraseEnable)
  penEnable=true
  if (eraseEnable){
   noErase();
   eraseEnable=false
  }
  if (pointerEnable){
    a.style("pointerEvents","auto")
    pointerEnable=false
    
  }

}

function enablpointer(a){
  d(pointer)
  console.log("second")
   penEnable=false
   if(!pointerEnable){
    a.style("pointerEvents","none")
    pointerEnable=true
  }
  
}


function clearScreen(a){
    a.clear()
}
function toggleErase(a) {
   d(eras)
  console.log("enableerase",penEnable,eraseEnable)
    penEnable=true
    if (!eraseEnable) {
      erase();
      eraseEnable=true
    }
    if (pointerEnable){
      a.style("pointerEvents","auto")
      pointerEnable=false
      
    }
    
  }
    
function exit() {
    document.getElementById("pageMarker_canvas").remove();
    document.getElementById("pageMarker_draggable").remove()
}
window.onscroll = function(){
    console.log(document.documentElement.clientWidth,document.documentElement.clientheight)
    v = document.body.scrollTop || document.documentElement.scrollTop;
		if(v + screen.height >  document.getElementById("pageMarker_canvas").height/2){
			c = Math.max(F.scrollHeight, F.offsetHeight, u.clientHeight, u.scrollHeight, u.offsetHeight);
            r=document.getElementById("pageMarker_canvas").style.height/2
			c = r + 7500 < c ? r + 7500 : c;
            resizeCanvas(document.body.clientWidth,c)
			
		}
	k.style.top = v + "px";
    
}
ka = document.getElementById("pageMarker_save")
ka.addEventListener("click", H);


function H() {
    var a = document.getElementById("pageMarker_draggable");
    (new Promise(function(c, e) {
        a.style.display = "none";
        setTimeout(function() {
            "none" == a.style.display ? c() : e()
        }, 500)
    })).then(function() {
        chrome.runtime.sendMessage({
            from: "content_script"
        }, function(c) {
            screenshot = c.screenshot;
            c = new Date;
            c = c.getFullYear() + "-" + ("0" + (c.getMonth() + 1)).slice(-2).toString() + "-" + ("0" + c.getDate()).slice(-2);
            var e = document.createElement("a");
            e.download = "Screenshot_" + c + "_PageMarker.png";
            e.href = screenshot;
            document.body.appendChild(e);
            e.click();
            document.body.removeChild(e);
            
            a.style.display = "block"
        })
    }).catch(function() {
        console.error("An error has occured.")
    })
}





