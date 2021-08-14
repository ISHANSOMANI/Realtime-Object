img = ""
objects = []
status=""


function setup(){
    canvas = createCanvas(380,380)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    video.size(380,380)
    objectDetector = ml5.objectDetector("cocossd",ModelLoaded);
    document.getElementById("status").innerHTML = "Status:Detecting Objects";
}
function ModelLoaded(){
    console.log("Model Loaded Successfully!")
    status = true
    
}
function gotResults(error,results){
if(error){
    console.log(error);

}
else{
    console.log(results);
    objects = results;
}

}


function draw(){
    image(video,0,0,380,380);
    if (status != ""){
r = random(255)
g = random(255)
b = random(255)
        objectDetector.detect(video,gotResults)
        for (i = 0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Object Detected";
            document.getElementById("no_of_objects").innerHTML = "Number Of Objects Detected:"+objects.length;
            fill(r,g,b);
            percent = floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"% ",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}