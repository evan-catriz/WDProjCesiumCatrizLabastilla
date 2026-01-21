function confirmSubmit() {
    return confirm("Do you want to submit?");
}
            
function confirmReset() {
    return confirm("All data will be cleared. Continue?");
}
            
document.getElementById("myForm").addEventListener("submit", function (event) {
            
    if (!confirmSubmit()) {
        event.preventDefault();
        return;
        }
            
        event.preventDefault(); 
            
        const uname = document.getElementById("uname").value.trim();
        const upass = document.getElementById("upass").value.trim();
            
        localStorage.setItem("usname", uname);
        localStorage.setItem("uspass", upass);
            
        alert("Account saved successfully!");
    });