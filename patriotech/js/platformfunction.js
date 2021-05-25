var chosen = false;

var patreon = "https://www.patreon.com/user?u=26547609";
var twitter = "https://twitter.com/PatriotechG";
var youtube = "https://www.youtube.com/channel/UCA4EiNi9JH3zH4B2u0iNZKQ/about";
var instagram = "https://www.instagram.com/patriotech.pics";
var twitch = "https://www.twitch.tv/patriotech_streams/videos";
var discord = "https://discord.gg/BURm4rA";

var patreon_desc1 = "Donate.";
var patreon_desc2 = "Be part of.";
var patreon_desc3 = "Rechoice.";

var twitter_desc1 = "Tell us.";
var twitter_desc2 = "Let us know.";
var twitter_desc3 = "Be part of.";

var youtube_desc1 = "Check us out.";
var youtube_desc2 = "Animated.";
var youtube_desc3 = "'Meet the'-series.'";

var instagram_desc1 = "Amaze.";
var instagram_desc2 = "Opportunity.";
var instagram_desc3 = "See things right.";

var twitch_desc1 = "See us live.";
var twitch_desc2 = "What we do.";
var twitch_desc3 = "Time to time.";

var discord_desc1 = "Community.";
var discord_desc2 = "Let's be.";
var discord_desc3 = "Join us.";

var path = "./img/platform/";
var platform = "";


document.onload(WindowLoad());


function WindowLoad() {
    chosen = false;
}


function openLink(name) {
    if (name == "patreon") { window.open(patreon); }
    if (name == "twitter") { window.open(twitter); }
    if (name == "youtube") { window.open(youtube); }
    if (name == "instagram") { window.open(instagram); }
    if (name == "twitch") { window.open(twitch); }
    if (name == "discord") { window.open(discord); }
}



var i;var num;
function ChangeImage() {
    //var img = document.getElementById("platform_img");
    var desc = document.getElementById("platform_description");
    
    desc.textContent=patreon_desc3.toString();


    //desc.textContent = i.toString();
}


function Platform(platform, name) {
    //var area = document.getElementById("");

    var t_platform = "test";

    var title = document.getElementById("platform_header");
    var img = document.getElementById("platform_img");
    var click = document.getElementById("platform_button");
    var desc = document.getElementById("platform_description");
    
    var plat = document.getElementById("social_platform");

    if (name == "none") {
        // if (plat.style.display == "none") { plat.style.display = "block"; }
        // else { plat.style.display = "none"; }

        var ctr = 1;
        plat.className = plat.className !== 'show' ? 'show' : 'hide';
        if (plat.className === 'show') {
            plat.style.display = 'block';
            window.setTimeout(function(){
                plat.style.opacity = 1;
                plat.style.transform = 'scale(1)';
            },700);
        }
        if (plat.className === 'hide') {
            plat.style.opacity = 0;
            plat.style.transform = 'scale(0)';
            window.setTimeout(function(){
                plat.style.display = 'none';
            },700);
        }
    }

    if (name == "patreon")   {
        if (platform == name && chosen == true) {  var win = window.open(click.href.toString(), '_blank'); win.focus(); return; }
        else { chosen = false; }

        img.src="./img/img01.jpg"; 
        desc.textContent=patreon_desc1.toString();
        t_platform = "Patreon";
        title.textContent = t_platform.toString();
        click.textContent = t_platform.toString();
        click.href=patreon.toString(); 
        int=0; 
        platform = name.toString();

        chosen=true;
    }
    if (name == "twitter")   {
        if (platform == name && chosen == true) {  var win = window.open(click.href.toString(), '_blank'); win.focus(); return; }
        else { chosen = false; }

        img.src="./img/img02.jpg"; 
        desc.textContent=twitter_desc1.toString();
        t_platform = "Twitter";
        title.textContent = t_platform.toString(); 
        click.textContent = t_platform.toString();
        click.href=twitter.toString(); 
        int=0; 
        platform = name;

        chosen=true;
    }
    if (name == "youtube")   {
        if (platform == name && chosen == true) {  var win = window.open(click.href.toString(), '_blank'); win.focus(); return; }
        else { chosen = false; }

        img.src="./img/img03.jpg"; 
        desc.textContent=youtube_desc1.toString();
        t_platform = "Youtube";
        title.textContent = t_platform.toString();
        click.textContent = t_platform.toString();
        click.href=youtube.toString(); 
        int=0; 
        platform = name;

        chosen=true;
    }
    if (name == "instagram") {
        if (platform == name && chosen == true) {  var win = window.open(click.href.toString(), '_blank'); win.focus(); return; }
        else { chosen = false; }

        img.src="./img/img03.jpg"; 
        desc.textContent=instagram_desc1.toString();
        t_platform = "Instagram";
        title.textContent = t_platform.toString();
        click.textContent = t_platform.toString();
        click.href=instagram.toString(); 
        int=0; 
        platform = name;

        chosen=true;
    }
    if (name == "twitch")    {
        if (platform == name && chosen == true) {  var win = window.open(click.href.toString(), '_blank'); win.focus(); return; }
        else { chosen = false; }

        img.src="./img/img04.jpg"; 
        desc.textContent=twitch_desc1.toString(); 
        t_platform = "Twitch";
        title.textContent = t_platform.toString();
        click.textContent = t_platform.toString();
        click.href=twitch.toString(); 
        int=0; 
        platform = name;

        chosen=true;
    }
    if (name == "discord")   {
        if (platform == name && chosen == true) {  var win = window.open(click.href.toString(), '_blank'); win.focus(); return; }
        else { chosen = false; }

        img.src="./img/img01.jpg"; 
        desc.textContent=discord_desc1.toString();
        t_platform = "Discord";
        title.textContent = t_platform.toString();
        click.textContent = t_platform.toString();
        click.href=discord.toString(); 
        int=0; 
        platform = name;

        chosen=true;
    }
}