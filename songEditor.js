let songList = JSON.parse(localStorage.getItem("songList"));
document.getElementById("returnToMain").addEventListener("click", returnToMain);
document.getElementById("returnToList").addEventListener("click", viewList);

document.getElementById("setBPM").addEventListener("click", updateBPM);
document.getElementById("setLength").addEventListener("click", updateSongLength);
document.getElementById("editDriveLinks").addEventListener("click", goToLinkEditor);

function returnToMain(){
  localStorage.setItem("songList", JSON.stringify(songList));
  window.location.href = "index.html";
}

function viewList(){
  localStorage.setItem("songList", JSON.stringify(songList));
  window.location.href = "songList.html";
}

function goToLinkEditor(){
  localStorage.setItem("songList", JSON.stringify(songList));
  window.location.href = "editLinks.html";
}
