$(window).scroll(function() {

    alert("iwdha");
});

function ScrollTo(obj) {
    if (obj > -1) { window.scrollTo({ top: obj, behavior: 'smooth' }); }
    else { window.scrollTo({ top: document.getElementById(obj).offsetTop, behavior: 'smooth' }); }
    return false;
}


var slideIndex = 0;

function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > x.length) {slideIndex = 1}
    x[slideIndex-1].style.display = "block";
    setTimeout(carousel, 2000); // Change image every 2 seconds
}


function toggleArea(var1) {
    if (var1=='patreon') {
        document.getElementById("site_header").textContent = "patreon";
        document.getElementById("site_description1").textContent = "We are 100% driven by you";
        document.getElementById("site_description2").textContent = "100% goes towards better games";
        document.getElementById("site_description3").textContent = "Thank you";
    }
    if (var1=='twitter') { 
        document.getElementById("site_header").textContent = "twitter";
        document.getElementById("site_description1").textContent = "info sometimes";
        document.getElementById("site_description2").textContent = "useless sometimes";
        document.getElementById("site_description3").textContent = "smart sometimes";
    }
    if (var1=='youtube') { 
        document.getElementById("site_header").textContent = "youtube";
        document.getElementById("site_description1").textContent = "new release trailers";
        document.getElementById("site_description2").textContent = '"meet the"-series';
        document.getElementById("site_description3").textContent = "We are 100% driven by you";
    }
    if (var1=='instagram') { 
        document.getElementById("site_header").textContent = "instagram";
        document.getElementById("site_description1").textContent = "random images";
        document.getElementById("site_description2").textContent = "0% thought put in";
        document.getElementById("site_description3").textContent = "We are 100% driven by you";
    }
    if (var1=='twitch') { 
        document.getElementById("site_header").textContent = "twitch";
        document.getElementById("site_description1").textContent = "coding and chill streams";
        document.getElementById("site_description2").textContent = "you can come tell your ideas live";
        document.getElementById("site_description3").textContent = "We are 100% driven by you";
    }
    if (var1=='discord') { 
        document.getElementById("site_header").textContent = "discord";
        document.getElementById("site_description1").textContent = "great community for everyone";
        document.getElementById("site_description2").textContent = "come interract with us";
        document.getElementById("site_description3").textContent = "We are 100% driven by you";
    }
}