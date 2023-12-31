const songs=[
    {
        songName:"Tere Bin",
        url:"songs/TereBin.mp3",
        artistName:"Atif Aslam",
        imgUrl:"songIMages/Atif.jpg"
    },
    {
        songName:"Tera Nasha",
        url:"songs/TeraNasha.mp3",
        artistName:"Unknown"
        ,imgUrl:"songIMages/forall.jpg"
    },
    {
        songName:"Idhar Zindagi Ka Janaza Uthay Ga",
        url:"songs/idharZindagi.mp3",
        artistName:"Some Youtuber"
        ,imgUrl:"songIMages/forall.jpg"
    },
    {
        songName:"NFAK MASHUP",
        url:"songs/NFAK_Mashup.mp3",
        artistName:"Ustad Nusrat Fateh Ali Khan"
        ,imgUrl:"songIMages/forall.jpg"
    }

]

const menu=document.querySelector("#menuBtn");
const slider=document.querySelector("#rangeS")
const song=document.querySelector("#songs");
const btn=document.querySelector("#btn");
const img=document.querySelector(".img img");
const songsList=document.querySelector(".songsS");
const mainApp=document.querySelector(".toHide");
const heading=document.querySelector(".buttons h2");
const title=document.querySelector(".buttons p");



function loaddata(){
    if(localStorage.length==0){
        song.innerHTML=
        `
        <source src="${songs[0].url}">
       `
  
        heading.innerHTML=songs[0].songName;
        img.setAttribute("src",songs[0].imgUrl);
        title.innerHTML=songs[0].artistName;
    }
    else{
        song.innerHTML=`
        <source src="${localStorage.getItem("data")}">
       `
       heading.innerHTML=localStorage.getItem("name");
       title.innerHTML=localStorage.getItem("artist");
       img.setAttribute("src",localStorage.getItem("image"));
   
    }

}
loaddata();
if(song.play()){
    btn.firstElementChild.classList.remove("fa-play");
    btn.firstElementChild.classList.add("fa-pause");
    img.style.animation="rotate 1s infinite ease-in-out forwards"
}
function menuF(){
     songsList.classList.toggle("visibilityInherit");
     mainApp.classList.toggle("visibilityHidden");
}


function selectSongFromTheList(e){
    let x=e.target.innerText;
    songsList.classList.add("visibilityHidden");
     mainApp.classList.add("visibilityInherit");
    for(let i=0;i<songs.length;i++){
        if(songs[i].songName===x){
            localStorage.setItem("data",songs[i].url);
            localStorage.setItem("name",songs[i].songName);
            localStorage.setItem("artist",songs[i].artistName);
            localStorage.setItem("image",songs[i].imgUrl);
            location.reload();
            break;
        }
    }
}

menu.addEventListener("click",menuF)
function list(){
    for(let i=0;i<songs.length;i++){
        let p=document.createElement("p");
        let img=document.createElement("img");
        img.setAttribute("src","imgs/logo.png");
        p.appendChild(img);
        p.innerHTML+=songs[i].songName;
        p.addEventListener("click",selectSongFromTheList)

        songsList.appendChild(p);
    }
}


list();
song.onloadedmetadata= function(){
    slider.max=song.duration;
    slider.value=song.currentTime;
    console.log("main working")

}
if(song.play()){
    setInterval(() => {
        console.log("interbal working");
        slider.value=song.currentTime;
    }, 500);
}
slider.onchange=function(){
    song.play();
    btn.firstElementChild.classList.remove("fa-play");
    btn.firstElementChild.classList.add("fa-pause");
    song.currentTime=slider.value;
}
btn.addEventListener("click",()=>{
    if(btn.firstElementChild.classList.contains("fa-play")){
        song.play();
        btn.firstElementChild.classList.remove("fa-play");
        btn.firstElementChild.classList.add("fa-pause");
        img.style.animation="rotate 1s infinite ease-in-out forwards"
    }
    else if(btn.firstElementChild.classList.contains("fa-pause")){
        song.pause();
        btn.firstElementChild.classList.add("fa-play");
        btn.firstElementChild.classList.remove("fa-pause");
        img.style.animation=""
    }
})

const nextbutton=document.querySelector("#nextBtn");
function nextSong(){
    let x=heading.innerText;
    for(let i=0;i<songs.length;i++){
        if(i==songs.length-1){
            localStorage.setItem("data",songs[0].url);
            localStorage.setItem("name",songs[0].songName);
            localStorage.setItem("artist",songs[0].artistName);
            localStorage.setItem("image",songs[0].imgUrl);
            location.reload();
        }else {
            if(songs[i].songName===x){
                localStorage.setItem("data",songs[i+1].url);
                localStorage.setItem("name",songs[i+1].songName);
                localStorage.setItem("artist",songs[i+1].artistName);
                localStorage.setItem("image",songs[i+1].imgUrl);
                location.reload();
                break;
            }
        }
       
    }
    
}
nextbutton.addEventListener("click",nextSong);
function previousSong(){
    let x=heading.innerText;
    let len=songs.length-1;
    for(let i=0;i<songs.length;i++){
        if(i==0){
            localStorage.setItem("data",songs[len].url);
            localStorage.setItem("name",songs[len].songName);
            localStorage.setItem("artist",songs[len].artistName);
            localStorage.setItem("image",songs[len].imgUrl);
            location.reload();
        }else {
            if(songs[i].songName===x){
                localStorage.setItem("data",songs[i-1].url);
                localStorage.setItem("name",songs[i-1].songName);
                localStorage.setItem("artist",songs[i-1].artistName);
                localStorage.setItem("image",songs[i-1].imgUrl);
                location.reload();
                break;
            }
        }
       
    }
    
}
const prevButton=document.querySelector("#prevBtn");
prevButton.addEventListener('click',previousSong);
