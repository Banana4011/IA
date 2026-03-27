let links = JSON.parse(localStorage.getItem("driveLinks"))
document.getElementById("goBack").addEventListener("click", returnToEditor);

function goBack(){
    localStorage.setItem("driveLinks", JSON.stringify(links))
    window.location.href = "songEditor.html"
}