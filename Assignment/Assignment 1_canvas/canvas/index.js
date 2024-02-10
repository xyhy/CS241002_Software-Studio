var canvas = document.getElementById('canvas');
var screen = document.getElementById('screen');
var ctx = canvas.getContext('2d');
var color = document.querySelector('#color');
var fonts = document.querySelector('#fonts');
var fontsize = document.querySelector('#font_size');
var wid = document.querySelector('#bar');
// undo/redo
var undo_list = [];
var redo_list = [];
var state = ctx.getImageData(0,0,canvas.width,canvas.height);
undo_list.push(state);

var tmp_canvas;


ctx.fillStyle = 'black';
ctx.strokeStyle = 'black';
ctx.font = "20px Serif";
//ctx.lineWidth = document.getElementById('brush_width').value;
var textline= "";

var mousePrevx, mousePrevy, mouseNewx, mouseNewy;
var downflag = false;
var mode = 'pencil';


function events(){
    canvas.addEventListener('mousemove', function(e){
        getMousePosition('move', e)
    });
    canvas.addEventListener('mousedown', function(e){
        getMousePosition('down', e)
    });
    canvas.addEventListener('mouseup', function(e){
        getMousePosition('up', e)
    });
    canvas.addEventListener('mouseout', function(e){
        getMousePosition('out', e)
    });
}

function cal_radius(x, y){
    return Math.sqrt((x*x) + (y*y));
}

function draw(){
    ctx.beginPath();
    ctx.moveTo(mousePrevx, mousePrevy);
    ctx.lineTo(mouseNewx, mouseNewy);
    ctx.stroke();
    ctx.closePath();
}

function draw_rect(){
    ctx.putImageData(tmp_canvas,0,0);
    ctx.beginPath();
    ctx.rect(mousePrevx,mousePrevy, mouseNewx-mousePrevx, mouseNewy-mousePrevy);
    ctx.stroke();
    ctx.closePath();
}

function draw_circle(){
    ctx.putImageData(tmp_canvas,0,0);
    var r = cal_radius(mouseNewx-mousePrevx, mouseNewy-mousePrevy);
    ctx.beginPath();
    ctx.arc((mousePrevx+mouseNewx)/2, (mousePrevy+mouseNewy)/2, r/2, 0, 2*Math.PI);
    ctx.stroke();
    ctx.closePath();
}

function clean(){
    ctx.clearRect((mousePrevx+mouseNewx)/2, (mousePrevy+mouseNewy)/2, ctx.lineWidth, ctx.lineWidth);
}

function keyinput(str){
    if(mode == 'text'){
        if(downflag){
            var x = str.key;
            if(str.keyCode == 8){
                console.log("Backspace");
                ctx.putImageData(tmp_canvas,0,0);
                textline = textline.slice(0,textline.length-1);
                ctx.fillText(textline, mouseNewx, mouseNewy);
            }
        }
    }
}

function keyinput_press(str){
    if(mode == 'text'){
        if(downflag){
            if(str.keyCode != 13){
                ctx.putImageData(tmp_canvas,0,0);
                textline+=str.key;
                ctx.fillText(textline, mouseNewx, mouseNewy);
            }else{
                undo_list.push(ctx.getImageData(0,0,canvas.width,canvas.height));
                redo_list = [];
                downflag = false;
            }
        }
    }
}

function draw_tri(){
    ctx.putImageData(tmp_canvas,0,0);
    ctx.beginPath();
    ctx.moveTo(mousePrevx, mousePrevy);
    ctx.lineTo(mouseNewx, mouseNewy);
    ctx.lineTo(2*mousePrevx-mouseNewx, 2*mouseNewy-mouseNewy);
    ctx.lineTo(mousePrevx, mousePrevy);
    ctx.fill();
    ctx.closePath();
}


function getMousePosition(op, e){
    if(mode == 'pencil'){
        if(op == 'move'){
            if(downflag){
                mousePrevx = mouseNewx;
                mousePrevy = mouseNewy;
                mouseNewx = e.clientX - canvas.offsetLeft;
                mouseNewy = e.clientY - canvas.offsetTop;
                draw();
            }
        }else if(op == 'down'){
            mousePrevx = mouseNewx;
            mousePrevy = mouseNewy;
            mouseNewx = e.clientX - canvas.offsetLeft;
            mouseNewy = e.clientY - canvas.offsetTop;
            downflag = true;
        }else if(op == 'up'){
            downflag = false;
            undo_list.push(ctx.getImageData(0,0,canvas.width,canvas.height));
            redo_list = [];
            console.log(undo_list);
        }
    }
    else if(mode == 'rectangle'){
        if(op == 'move'){
            if(downflag){
                mouseNewx = e.clientX - canvas.offsetLeft;
                mouseNewy = e.clientY - canvas.offsetTop;
                draw_rect();
            }
        }else if(op == 'down'){
            mousePrevx = e.clientX - canvas.offsetLeft;
            mousePrevy = e.clientY - canvas.offsetTop;
            tmp_canvas = ctx.getImageData(0,0,canvas.width,canvas.height);
            downflag = true;
        }else if(op == 'up'){
            downflag = false;
            undo_list.push(ctx.getImageData(0,0,canvas.width,canvas.height));
            redo_list = [];
            console.log(undo_list);
        }
    }
    else if(mode == 'circle'){
        if(op == 'move'){
            if(downflag){
                mouseNewx = e.clientX - canvas.offsetLeft;
                mouseNewy = e.clientY - canvas.offsetTop;
                draw_circle();
            }
        }else if(op == 'down'){
            mousePrevx = e.clientX - canvas.offsetLeft;
            mousePrevy = e.clientY - canvas.offsetTop;
            tmp_canvas = ctx.getImageData(0,0,canvas.width,canvas.height);
            downflag = true;
        }else if(op == 'up'){
            downflag = false;
            undo_list.push(ctx.getImageData(0,0,canvas.width,canvas.height));
            redo_list = [];
            console.log(undo_list);
        }
    }
    else if(mode == 'eraser'){
        if(op == 'move'){
            if(downflag){
                mousePrevx = mouseNewx;
                mousePrevy = mouseNewy;
                mouseNewx = e.clientX - canvas.offsetLeft;
                mouseNewy = e.clientY - canvas.offsetTop;
                clean();
            }
        }else if(op == 'down'){
            mousePrevx = mouseNewx;
            mousePrevy = mouseNewy;
            mouseNewx = e.clientX - canvas.offsetLeft;
            mouseNewy = e.clientY - canvas.offsetTop;
            downflag = true;
        }else if(op == 'up'){
            downflag = false;
            undo_list.push(ctx.getImageData(0,0,canvas.width,canvas.height));
            redo_list = [];
            console.log(undo_list);
        }
    }
    else if(mode == 'text'){
        if(op == 'down'){
            mouseNewx = e.clientX - canvas.offsetLeft;
            mouseNewy = e.clientY - canvas.offsetTop;
            tmp_canvas = ctx.getImageData(0,0,canvas.width,canvas.height);
            downflag = true;
            textline = "";
        }else if(op == 'out'){
            downflag = false;
        }
    }
    else if(mode == 'triangle'){
        if(op == 'move'){
            if(downflag){
                mouseNewx = e.clientX - canvas.offsetLeft;
                mouseNewy = e.clientY - canvas.offsetTop;
                draw_tri();
            }
        }else if(op == 'down'){
            mousePrevx = e.clientX - canvas.offsetLeft;
            mousePrevy = e.clientY - canvas.offsetTop;
            tmp_canvas = ctx.getImageData(0,0,canvas.width,canvas.height);
            downflag = true;
        }else if(op == 'up'){
            downflag = false;
            
            undo_list.push(ctx.getImageData(0,0,canvas.width,canvas.height));
            redo_list = [];
            console.log(undo_list);
        }
    }
    
}


canvas.onmouseenter = function(){mouseEnter()};
color.addEventListener('input',function(){
    ctx.fillStyle = color.value;
    ctx.strokeStyle = color.value;
});
fonts.addEventListener('input', function(){
    if(fonts.value == "Serif"){
        ctx.font = "20px serif";
    }else if(fonts.value == "Sans-serif"){
        ctx.font = "20px sans-serif";
    }else if(fonts.value == "Monospace"){
        ctx.font = "20px Monospace";
    }else if(fonts.value == "Cursive"){
        ctx.font = "20px Cursive";
    }else if(fonts.value == "Fantasy"){
        ctx.font = "20px Fantasy";
    }
});
fontsize.addEventListener('input',function(){
    if(fontsize.value>0){
        ctx.font = fontsize.value + "px " + fonts.value;
    }
});
wid.addEventListener('input',function(){
    ctx.lineWidth = document.getElementById('bar').value;
})



function mouseEnter(){
    if(mode == 'pencil'){
        canvas.style.cursor = 'crosshair';
    }else if(mode == 'rectangle'){
        canvas.style.cursor = 'crosshair';
    }else if(mode == 'circle'){
        canvas.style.cursor = 'crosshair';
    }else if(mode == 'triangle'){
        canvas.style.cursor = 'crosshair';
    }else if(mode == 'text'){
        canvas.style.cursor = 'text';
    }else if(mode == 'eraser'){
        canvas.style.cursor = 'crosshair';
    }
}

function mode_pencil(){
    downflag = false;
    mode = 'pencil';
}

function mode_rectangle(){
    downflag = false;
    mode = 'rectangle';
}

function mode_circle(){
    downflag = false;
    mode = 'circle';
}

function mode_triangle(){
    downflag = false;
    mode = 'triangle';
}

function mode_text(){
    downflag = false;
    mode = 'text';
}

function mode_eraser(){
    downflag = false;
    mode = 'eraser';
}

function reload(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    undo_list = [];
    redo_list = [];
    ctx.fillStyle = '#000000';
    ctx.strokeStyle = '#000000';
    ctx.font = 'sans';
    ctx.fontSize = 12;
    ctx.textAlign = 'left';
    textline= "";
    color.value = '#000000';
    mode_pencil();
}


function previewFile() {
    var preview = document.querySelector('#after_upload');
    var file    = document.querySelector('#fake_upload').files[0];
    var reader  = new FileReader();
  
    reader.readAsDataURL(file);
    reader.addEventListener("load", function () {
      preview.src = reader.result;
    }, false);
  

    console.log("preview file");
  }

function getfile(){
    console.log("getfile function");
    ctx.drawImage(document.getElementById('after_upload'), 10,10);
    console.log(ctx);
    console.log(document.getElementById('after_upload'));
    undo_list.push(ctx.getImageData(0,0,canvas.width,canvas.height));
    redo_list = [];
    console.log(undo_list);   
}

function undo(){
    if(undo_list.length>1){
        var move_state = undo_list.pop();
        redo_list.push(move_state);
        ctx.putImageData(undo_list[undo_list.length-1],0,0);
    }else{
        ctx.putImageData(undo_list[0],0,0);
    }
    console.log(undo_list);
    console.log(redo_list);
}
function redo(){
    if(redo_list){
        var move_state = redo_list.pop();
        if(move_state){
            undo_list.push(move_state);
            ctx.putImageData(undo_list[undo_list.length-1],0,0);
        }
    }
}

function download() {
    var download = document.getElementById("download");
    var image = canvas.toDataURL("image/png, image/jpeg");
    download.setAttribute("href", image);
}