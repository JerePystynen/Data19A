window.onscroll = function() { myFunc() };

function myFunc() {
    if (this.document.body.scrollTop > 100) {
        this.document.getElementsByClassName("navBar").style.display = "block";
    } else {
        this.document.getElementsByClassName("navBar").style.display = "none";
    }
}