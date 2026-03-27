const clientId = "058bedf28f7e4277ba8fea5227e795bb";
const clientSecret = "d7e4491358934e92b5f81308bc83f939";
const songs = {}
const resultsNum = 10;
let optionButtons = [];
let songList;
if("songList" in localStorage){
  songList = JSON.parse(localStorage.getItem("songList"));
} else{
  songList = [];
}
let accessToken;
document.getElementById("startButton").addEventListener("click", addSong);
document.getElementById("viewSongsButton").addEventListener("click", viewList);
document.getElementById("clearSongsButton").addEventListener("click", clearList);

function clearList(){
  songList = [];
}

async function getAccessToken() {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Basic " + btoa(clientId + ":" + clientSecret)
    },
    body: "grant_type=client_credentials"
  });
  const data = await response.json();
  return data.access_token;
}

class Song {
    constructor(name, dateAdded, dateReleased, artist, length, bpm, score) {
        this.name = name;
        this.dateAdded = dateAdded;
        this.dateReleased = dateReleased;                                                                                                                                                                                                                                               
        this.artist = artist;
        this.length = length;
        this.bpm = bpm;
        this.score = score;
    }
}

function getLink(song){
  let linkHead = "https://api.spotify.com/v1/search?q="
  let linkTail = "&type=track"
  let linkSong = song.replaceAll(" ", "+")
  return linkHead + linkSong + linkTail
}

async function searchSongs(link, token){
  const response = await fetch(link, {
    headers: {
      "Authorization": "Bearer " + token
    }
  });
  const data = await response.json();
  return data.tracks.items;
}

function msToMinSec(ms) {
  let min = Math.floor(ms / 60000);
  let sec = Math.floor((ms % 60000) / 1000).toString().padStart(2, "0");
  return (min + ":" + sec);
}

function songToList(songName, dateAdded, dateReleased, artist, length){
  console.log("added " + songName);
  let addedSong = new Song(songName, dateAdded, dateReleased, artist, length);
  songList.push(addedSong);
  console.log("Song List:");
  for(let i = 0; i<songList.length; i++){
    console.log(songList[i].name);
  }
}

async function addSong(){
  let song = document.getElementById("songInput").value;
  document.getElementById("outputList").innerHTML = "";
  optionButtons = [];
  accessToken = await getAccessToken();
  let link = getLink(song);
  let outputs = [];
  outputs = await searchSongs(link, accessToken);
  for(let i = 0; i<outputs.length; i++){
    if(i >= resultsNum){
      break;
    }
    optionButtons.push(document.createElement('button'));
    optionButtons[i].innerText = (outputs[i].name + " by " + outputs[i].artists[0].name + ", " + outputs[i].album.release_date + " - " + msToMinSec(outputs[i].duration_ms));
    let currentDate = new Date();
    optionButtons[i].addEventListener("click", () => songToList(outputs[i].name, currentDate, outputs[i].album.release_date, outputs[i].artists[0].name, outputs[i].duration_ms));
    document.getElementById("outputList").appendChild(optionButtons[i]);
    document.getElementById("outputList").appendChild(document.createElement("br"));
  }
}  

function viewList(){
  localStorage.setItem("songList", JSON.stringify(songList));
  window.location.href = "songList.html"
}

