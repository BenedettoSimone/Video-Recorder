var sBrowser, sUsrAg = navigator.userAgent;


// The order matters here, and this may report false positives for unlisted browsers.

if (sUsrAg.indexOf("Firefox") > -1) {
    sBrowser = "Mozilla Firefox";
    // "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0"
} else if (sUsrAg.indexOf("SamsungBrowser") > -1) {
    sBrowser = "Samsung Internet";
    // "Mozilla/5.0 (Linux; Android 9; SAMSUNG SM-G955F Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/9.4 Chrome/67.0.3396.87 Mobile Safari/537.36
} else if (sUsrAg.indexOf("Opera") > -1 || sUsrAg.indexOf("OPR") > -1) {
    sBrowser = "Opera";
    // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 OPR/57.0.3098.106"
} else if (sUsrAg.indexOf("Trident") > -1) {
    sBrowser = "Microsoft Internet Explorer";
    // "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; Zoom 3.6.0; wbx 1.0.0; rv:11.0) like Gecko"
} else if (sUsrAg.indexOf("Edge") > -1) {
    sBrowser = "Microsoft Edge (Legacy)";
    // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
} else if (sUsrAg.indexOf("Edg") > -1) {
    sBrowser = "Microsoft Edge (Chromium)";
    // Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.64
} else if (sUsrAg.indexOf("Chrome") > -1) {
    sBrowser = "Google Chrome or Chromium";
    // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/66.0.3359.181 Chrome/66.0.3359.181 Safari/537.36"
} else if (sUsrAg.indexOf("Safari") > -1) {
    sBrowser = "Apple Safari";
    // "Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1 980x1306"
} else {
    sBrowser = "unknown";
}



let camera_button = document.querySelector("#start-camera");
let video = document.querySelector("#video");
let start_button = document.querySelector("#start-record");
let stop_button = document.querySelector("#stop-record");
let download_link = document.querySelector("#download-video");
let delete_button = document.querySelector("#delete-video");
let div_recording =document.querySelector("#recording")

let instruction =document.querySelector("#instruction")
let title_instruction =document.querySelector("#title-instruction")
let more_instruction =document.querySelector("#more-instruction")
let form =document.querySelector("#form")


let stream = null;
let media_recorder = null;
let blobs_recorded = [];
let video_local = null;





camera_button.addEventListener('click', async () => {
    const constraints = {
        video: {
            width: 360, height: 288

        },
        audio: true
    };

    await init(constraints);
});



async function init(constraints) {
    try {

        stream = await navigator.mediaDevices.getUserMedia(constraints);

        await stream.getVideoTracks()[0].applyConstraints({

            frameRate: {ideal: 25, max: 25}
        });


        video.srcObject = stream;
        camera_button.style.display = 'none';
        video.style.display = 'block';
        start_button.style.display = 'block';

    } catch (e) {
        console.error('navigator.getUserMedia error:', e);
    }
}




/*
camera_button.addEventListener('click', async function() {
    try {
        camera_stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    }
    catch(error) {
        alert(error.message);
        return;
    }
    video.srcObject = camera_stream;
    camera_button.style.display = 'none';
    video.style.display = 'block';
    start_button.style.display = 'block';
});
*/

start_button.addEventListener('click', function() {

    if(sBrowser==="Apple Safari"){
        media_recorder = new MediaRecorder(stream, { mimeType: 'video/mp4' });
        console.log("1"+stream.frameRate)

    }else {
        media_recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
        console.log("2"+stream.frameRate)

    }

    media_recorder.addEventListener('dataavailable', function(e) {
        blobs_recorded.push(e.data);
    });

    media_recorder.addEventListener('stop', function() {

        video_local = URL.createObjectURL(new Blob(blobs_recorded, { type: 'video/mpg' }));
        download_link.href = video_local


        name_lastname = document.getElementById('name-lastname').value;
        phrase =  document.getElementById(counter).textContent;
        //var matches = phrase.match(/\b(\w)/g); // ['J','S','O','N']
        //phrase_code = matches.join('');

        download_link.download = phrases.indexOf(phrase) + '-'+ name_lastname.toLowerCase() + '.mpg'
        stop_button.style.display = 'none';
        div_recording.style.display = 'none';
        download_link.style.display = 'block';
        delete_button.style.display = 'block';

    });

    media_recorder.start(1000);



    start_button.style.display = 'none';
    stop_button.style.display = 'block';
    div_recording.style.display= 'block';
});

stop_button.addEventListener('click', function() {
    media_recorder.stop();
});



download_link.addEventListener('click', async function () {

    download_link.style.display = 'none'
    delete_button.style.display = 'none';

    blobs_recorded = [];
    video_local = null;

    start_button.style.display = 'block';


});



delete_button.addEventListener('click', function (){
    blobs_recorded = [];
    video_local = null;

    delete_button.style.display = 'none'
    download_link.style.display = 'none'
    start_button.style.display = 'block'
})





/* instruction*/

$('#instruction').click(function() {
    clickToExpandCards($(this));
});
function clickToExpandCards($obj){
    var clickedElement = $obj;
    if (clickedElement.hasClass('expanded')) {
        clickedElement.removeClass('expanded');
        more_instruction.style.display = 'none'
        form.style.display = 'none'

    } else {
        clickedElement.addClass('expanded');
        more_instruction.style.display = 'block'
        form.style.display = 'block'
    }
};



window.onresize= function closeInstruction() {
    if (instruction.classList.contains('expanded')) {
        instruction.classList.remove("expanded");
        more_instruction.style.display = 'none'
        form.style.display = 'none'
    }
}



/*CAROUSEL*/
let phrases = ['Salve quanto costa quell\' articolo?', //0
                'È in offerta, costa 10 euro.', //1
                'Perfetto, vorrei comprarne due.', //2
                'Certo ecco a lei, vuole un sacchetto?', //3
                'Sì, grazie e arrivederci.', //4
                'Le auguro una buona giornata.', //5
                'Buongiorno, io sono Mario.', //6
                'Buonasera, io sono Mario', //7
                'Piacere Luigi, come stai?', //8
                'Tutto bene, tu?', //9
                'Tutto bene, grazie.', //10
                'Prendiamo un caffè al bar?', //11
                'Certo volentieri, io lo prenderò macchiato.', //12
                'A che ora arriva il pullman?', //13
                'Dovrebbe arrivare tra qualche minuto.', //14
                'Quanto costa il biglietto?', //15
                'Purtroppo non lo so, però potresti chiedere all’autista.', //16
                'Va bene, grazie lo stesso.', //17
                'Prego.' //18
]

let slideIndex = [1,1];
let slideId = ["mySlides1"]
let counter = 0

let nav_container = document.getElementById("navigation-carousel");
window.onload = function fill_carousel(){
    for(let i = 0; i<phrases.length; i++){

        const elem = document.createElement("h3");
        elem.classList.add('mySlides1');
        elem.setAttribute('id',i);

        if(i==0){
            elem.style.display = "block";
        }
        elem.innerHTML = phrases[i];
        document.getElementById("slideshow-container").insertBefore(elem, nav_container)
    }
}

showSlides(1, 0, 0);
showSlides(1, 1, 0);


//because we change the id's when we delete element from carousel
//we need to distinguish what action we performed (done or next/previous slide)
//0 if we make next/previous action
//1 if we make Done action

function plusSlides(n, no, what_action) {
    showSlides(slideIndex[no] += n, no, what_action);
}

function showSlides(n, no, what_action) {
    let i;
    let x = document.getElementsByClassName(slideId[no]);
    if (n > x.length) {slideIndex[no] = 1}
    if (n < 1) {slideIndex[no] = x.length}
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    if (what_action==0){
        x[slideIndex[no]-1].style.display = "block";
        counter =  x[slideIndex[no]-1].id;
    }
    else{
        x[0].style.display = "block";
        counter =  x[0].id;
    }

}

function done() {
    document.getElementById("slideshow-container").removeChild(document.getElementById(counter));
    let children = document.querySelector('#slideshow-container').querySelectorAll('.mySlides1');
    if (children.length > 0){

        console.log("before:"+counter)
        plusSlides(1, 0, 1)
        console.log("after:"+counter)
    }
    else{
        document.getElementById("finish").style.display = "block";
        document.getElementById("navigation-carousel").style.display = "none";
    }
}

