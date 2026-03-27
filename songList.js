let songList = JSON.parse(localStorage.getItem("songList"));
document.getElementById("ReturnToMain").addEventListener("click", returnToMain);
let listButtons = [];

for(let i = 0; i<songList.length; i++){
    listButtons.push(document.createElement('button'));
    listButtons[i].innerText = (songList[i].name + " by " + songList[i].artist + ", " + songList[i].dateReleased + " - " + msToMinSec(songList[i].length) + " - Added " + songList[i].dateAdded);
    console.log(songList[i].name + " by " + songList[i].artist + ", " + songList[i].dateReleased + " - " + msToMinSec(songList[i].length) + " - Added " + songList[i].dateAdded);
    listButtons[i].addEventListener("click", openEditor);
    document.getElementById("buttonList").appendChild(listButtons[i]);
    document.getElementById("buttonList").appendChild(document.createElement("br"));
  }


function msToMinSec(ms) {
  let min = Math.floor(ms / 60000);
  let sec = Math.floor((ms % 60000) / 1000).toString().padStart(2, "0");
  return (min + ":" + sec);
}

function returnToMain(){
  localStorage.setItem("songList", JSON.stringify(songList));
  window.location.href = "index.html"
}

function openEditor(){
  localStorage.setItem("songList", JSON.stringify(songList));
  window.location.href = "songEditor.html"
}

