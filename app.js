/**
 * Created by hx on 2015/4/21.
 */
var songDetails = [["My Dearest","supercell"],["他一定很爱你","阿杜"],["I Love You","Stewart Mac"],["True Strength","John Dreamer"],["什么都可以","黄晓明"],["听见下雨的声音","周杰伦"]];

function playMusic(index){
    var Oaudio = document.getElementById("music_audio");
    Oaudio.setAttribute("src", "source/"+index+".mp3");
    var songName = document.getElementById("songName");
    var singer = document.getElementById("singer");
    var indexChange = Number(Oaudio.getAttribute("src").slice(-5,-4))-1;
    songName.innerHTML = songDetails[indexChange][0];
    singer.innerHTML = songDetails[indexChange][1];
    playIt();
}
/*
 *  上一曲
 */
function previous(){
    var Oaudio = document.getElementById("music_audio");
    var songName = document.getElementById("songName");
    var singer = document.getElementById("singer");
    var index = Number(Oaudio.getAttribute("src").slice(-5,-4))-1;
    if(index<1){
        Oaudio.setAttribute("src", "source/6.mp3");
        songName.innerHTML = songDetails[5][0];
        singer.innerHTML = songDetails[5][1];
    }
    else{
        Oaudio.setAttribute("src", "source/"+index+".mp3");
        songName.innerHTML = songDetails[index-1][0];
        singer.innerHTML = songDetails[index-1][1];
    }
    playIt();
}
/*
 *  下一曲
 */
function next(){
    var Oaudio = document.getElementById("music_audio");
    var songName = document.getElementById("songName");
    var singer = document.getElementById("singer");
    var index = Number(Oaudio.getAttribute("src").slice(-5,-4))+1;
    if(index>6){
        Oaudio.setAttribute("src", "source/1.mp3");
        songName.innerHTML = songDetails[0][0];
        singer.innerHTML = songDetails[0][1];
    }
    else{
        Oaudio.setAttribute("src", "source/"+index+".mp3");
        songName.innerHTML = songDetails[index-1][0];
        singer.innerHTML = songDetails[index-1][1];
    }
    playIt();
}
/*
 *  控制播放和暂停
 */
function playIt(){
    var Oaudio = document.getElementById("music_audio");
    var Oplaybtn = document.getElementById("playBtn");
    if(Oaudio.paused){
        Oaudio.play();
        progress(Oaudio);
        Oplaybtn.src = "./btns/stop.jpg";
    }else{
        Oaudio.pause();
        Oplaybtn.src = "./btns/play.jpg";
    }
}
/*
 * 同步显示播放的时间
 */
function progress(Oaudio){
    var Ospan = document.getElementById("progress");
    var tag = setInterval(function(){
        if(Oaudio.currentTime!=Oaudio.duration){
            Ospan.innerHTML = toMinutes(Oaudio.currentTime) + "/" + toMinutes(Oaudio.duration);
        }else{
            clearInterval(tag);
        }
    },1000);
    var line = document.getElementById("progress-line");
    var lag = setInterval(function(){
        if(Oaudio.currentTime!=Oaudio.duration){
            var s = parseInt(Oaudio.currentTime);
            var m = parseInt(Oaudio.duration);
            var c = s/m*630;
            line.style.width= c+"px";
        }else{
            clearInterval(lag);
        }
    },1000);
}
/*
 * 把播放时间转换为分钟和秒的显示方式
 */
function toMinutes(num){
    var sec = parseInt(num);
    var minutes = Math.floor(sec/60);
    var secleft = sec%60;
    return minutes + ":" + secleft;
}
/*
 * 控制音量和进度条
 */
$(document).ready( function() {
    $(".music_player") .delegate('#music_box','click',function(e){
        var Oaudio = document.getElementById("music_audio");
        var $mouse = e.pageX - $(this).offset().left;
        var $span = Math.round($mouse);
        if($span==630){
            Oaudio.currentTime=Oaudio.duration;
        }
        else{
            Oaudio.currentTime=$span/630*Oaudio.duration;
        }
        var s = parseInt(Oaudio.currentTime);
        var m = parseInt(Oaudio.duration);
        //$("#progress-line").style.width= s/m*630+"px";
        $("#progress-line").animate({width:s/m*630+"px"},1);
        Oaudio.play();
        progress(Oaudio);
    });
    $('.volume') .delegate('.taskBoxLinks','click',function(e){
        var $mouse = e.pageX - $(this).offset().left;
        var $span = Math.round($mouse);
        var vo = $("#volume-line");
        //$(this).find('h3').stop().animate({width:$span+'%'},100);
        //$("#volume-line").stop().animate({width:$span/100*80+"px"},100);
        vo.stop().animate({width:$span+"px"},1);
        if($span>=80){
            document.getElementById("music_audio").volume=1.0;
            vo.stop().animate({width:80+"px"},1);
        }
        else{
            document.getElementById("music_audio").volume=$span/80;
        }
    });
});
/*
 * 静音控制
 */
function volumeOn(){
    var Oaudio = document.getElementById("music_audio");
    var len = $("#volume-line").css("width");
    Op = document.getElementById("v-btn");
    var l = parseInt(len);
    if(Oaudio.volume>0){
        Oaudio.volume=0;
        Op.src = "./btns/vn.gif";
    }else{
        Oaudio.volume=l/80;
        Op.src = "./btns/v.gif";
    }
}

