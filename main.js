song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist= 0;
scoreRightWrist= 0;

function setup()
{
    canvas = createCanvas(500, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

poseNet= ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses);
}

function draw()
{
image(video, 0, 0, 500, 500);
fill("red");
stroke("red");

if(scoreRightWrist > 0.2)
{
    circle(rightWristX, rightWristY, 30);
    
    if(rightWristY > 0 && rightWristY<=100)
    {
song.rate(0.5);
document.getElementById("speed").innerHTML = "Speed= 0.5x";
    }
    else if(rightWristY > 100 && rightWristY <= 200)
    {
        song.rate(1);
        document.getElementById("speed").innerHTML = "Speed= 1x";
    } else if(rightWristY > 200 && rightWristY <= 300)
    {
        song.rate(1.5)
        document.getElementById("speed").innerHTML = "Speed= 1.5x";
    } else if(rightWristY > 300 && rightWristY <= 400)
    {
        song.rate(2);
        document.getElementById("speed").innerHTML = "Speed= 2x";
    } else if(rightWristY > 500)
    {
        song.rate(2.5);
        document.getElementById("speed").innerHTML = "Speed= 2.5x";
    }
}




if(scoreLeftWrist > 0.2)
{
circle(leftWristX, leftWristY, 30);
inNumberLeftWristY=Number(leftWristY);
remove_decimal= floor(inNumberLeftWristY);
volume=remove_decimal/500;
document.getElementById("volume").innerHTML = "Volume=" + volume;
song.setVolume(volume);
}
}

function preload()
{
    song = loadSound("music.mp3");
}

function playsong()
{
    song.play();
    song.setVolume(0.5);
    song.rate(1);
}

function modelLoaded()
{
console.log("PoseNet Model Loaded");

}

function gotPoses(results)
{

    if(results.length > 0)
{
console.log(results);
scoreLeftWrist = results[0].pose.keypoints[9].score;
console.log("Score Left Wrist="+scoreLeftWrist);

scoreRightWrist = results[0].pose.keypoints[10].score;
console.log("Score Right Wrist="+scoreRightWrist);

leftWristX = results[0].pose.leftWrist.x;
leftWristY = results[0].pose.leftWrist.y;    
console.log("Left Wrist X=" + leftWristX + "Left Wrist Y=" + leftWristY);

rightWristX = results[0].pose.rightWrist.x;    
rightWristY = results[0].pose.rightWrist.y;    
console.log("Right Wrist X=" + rightWristX + "Right Wrist Y=" + rightWristY);
}

}












