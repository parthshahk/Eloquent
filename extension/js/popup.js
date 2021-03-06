var transitionSpeed = 500;

$(document).ready(() => {
    $("#loadView").hide();
    $("#defView").hide();
    $("#notFound").hide();
    $("#back").hide();

    $("#back").click(() => {

        $("#notFound").hide();
        $("#defView").fadeOut(transitionSpeed);
        $("#back").hide();
        $("#homeView").fadeIn(transitionSpeed);

        $("#defView").html("");
        $("#word").val("");
        $("#word").focus();

    });
});

$('#word').keypress(event => {

    var keycode = (event.keyCode ? event.keyCode : event.which);

    if(keycode == '13'){
        
        var word = $("#word").val().trim();
        fetchWord(word);
        $("#homeView").hide();
        $("#credit").hide();
        $("#loadView").fadeIn(transitionSpeed);

    }

});

function fetchWord(word){
    
    var markup;

    fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=4db1f56e-e61d-4755-912b-392c42fbe3da`)
            .then(res => {
                return res.json();
            })
            .then(json => {
                
                $.each(json, (key, meaning)=>{

                    if(typeof meaning.meta === 'undefined' || typeof meaning === 'undefined'){
                        return;
                    }

                    // Skip if no short defs
                    if(typeof meaning.shortdef[0] === 'undefined'){
                        return;
                    }

                    // Word Type
                    var type = '';
                    if(typeof meaning.fl !== 'undefined'){
                        type = meaning.fl;
                    }

                    // Headword
                    var headword = meaning.hwi.hw;
                    headword = headword.replace(/\*/g, "&middot;");

                    // Pronunciation
                    var pronunciation='';
                    if(typeof meaning.hwi.prs !== 'undefined'){
                        if(typeof meaning.hwi.prs[0].mw !== 'undefined'){
                            pronunciation = meaning.hwi.prs[0].mw;
                        }
                    }

                    // Sound
                    var sound = '';
                    if(typeof meaning.hwi.prs !== 'undefined'){
                        if(typeof meaning.hwi.prs[0].sound !== 'undefined'){

                            var subdir;
                            if(meaning.hwi.prs[0].sound.audio.startsWith("bix")){
                                subdir = 'bix';
                            }else if(meaning.hwi.prs[0].sound.audio.startsWith("gg")){
                                subdir = 'gg';
                            }else if(meaning.hwi.prs[0].sound.audio.charAt(0).match(/[a-z]/)){
                                subdir = meaning.hwi.prs[0].sound.audio.charAt(0);
                            }else{
                                subdir = 'number';
                            }
                            var url = `https://media.merriam-webster.com/soundc11/${subdir}/${meaning.hwi.prs[0].sound.audio}.wav`;
                            sound = `<img src="./images/sound.png" id="t${meaning.meta.uuid}"><audio id="${meaning.meta.uuid}" src="${url}" ></audio>`;
                        }
                    }

                    //Definitions
                    var definitions = '';
                    $.each(meaning.shortdef, (key, value) => {
                        definitions += `<span class="def">:${value}</span>`;
                    });

                    
                    markup = `

                        <div class="row">
                            <div class="col s12">
                                <div class="card grey lighten-4 z-depth-0">
                                    <div class="card-content grey-text text-darken-4">
            
                                        <span class="card-title word">${meaning.meta.id} <span class="type">${type}</span></span>
                                        <span class="card-title sound"><span class="syla">${headword}</span><span class="voice">${pronunciation}  ${sound}</span></span>
            
                                        <span class="card-title def-heading">Definition of ${meaning.meta.id}</span>
                                        <p class="defs">${definitions}</p>
            
                                    </div>
                                </div>
                            </div>
                        </div>

                    `;


                    $('#defView').append(markup);


                    // Add Sound Event Listener
                    if(typeof meaning.hwi.prs !== 'undefined'){
                        if(typeof meaning.hwi.prs[0].sound !== 'undefined'){
                            $("#t" + meaning.meta.uuid).click(() => {
                                document.getElementById(meaning.meta.uuid).play();
                            });
                        }   
                    }


                    
                });

                
                $("#defView").fadeIn(transitionSpeed);
                $("#loadView").hide();
                $("#credit").fadeIn(transitionSpeed);
                $("#back").fadeIn(transitionSpeed);

                if($("#defView").html() == ""){
                    $("#notFound").fadeIn(transitionSpeed);
                }

            })
}