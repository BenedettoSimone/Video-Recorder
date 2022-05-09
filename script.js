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

array_videos= new Array()
array_url=new Array()
let stream = null;
let media_recorder = null;
let blobs_recorded = [];
let video_local = null;


camera_button.addEventListener('click', async () => {
    const constraints = {
        video: {
            width: 360, height: 288
        }
    };

    await init(constraints);
});


async function init(constraints) {
    try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);

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
    }else {
        media_recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
    }

    media_recorder.addEventListener('dataavailable', function(e) {
        blobs_recorded.push(e.data);
    });

    media_recorder.addEventListener('stop', function() {


        video = new Blob(blobs_recorded, { type: 'video/mpg' })

        array_url.push(URL.createObjectURL(video))
        array_url.push(URL.createObjectURL(video))
        array_url.push(URL.createObjectURL(video))












        name_lastname = document.getElementById('name-lastname').value
        phrase_code = document.getElementById('phrase-code').value
        download_link.download = phrase_code + '-'+ name_lastname + '.mpg'

        stop_button.style.display = 'none';
        div_recording.style.display = 'none';
        download_link.style.display = 'block';
        delete_button.style.display = 'block';

        for (let k=0;k<3;k++) {

            console.log(array_url[k])
            download_link.href = array_url[k]
            download_link.click(function (e) {
                e.preventDefault();




            });
        }


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

