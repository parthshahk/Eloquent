$('#word').keypress(event => {

    var keycode = (event.keyCode ? event.keyCode : event.which);

    if(keycode == '13'){
        
        var word = $("#word").val().trim();
        
        fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=4db1f56e-e61d-4755-912b-392c42fbe3da`)
            .then(res => {
                return res.json();
            })
            .then(json => {
                console.log(json)
            })

    }

});

$(document).ready(()=>{
    
    var markup ='';

    fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/test?key=4db1f56e-e61d-4755-912b-392c42fbe3da`)
            .then(res => {
                return res.json();
            })
            .then(json => {
                
                $.each(json, (key, meaning)=>{

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
                            sound = `<img src="./images/sound.png" onclick="document.getElementById('${meaning.meta.uuid}').play()"><audio id="${meaning.meta.uuid}" src="${url}" ></audio>`;
                        }
                    }



                    markup += `

                        <div class="row">
                            <div class="col s12">
                                <div class="card grey lighten-4 z-depth-0">
                                    <div class="card-content grey-text text-darken-4">
            
                                        <span class="card-title word">${meaning.meta.id} <span class="type">${meaning.fl}</span></span>
                                        <span class="card-title sound"><span class="syla">${headword}</span><span class="voice">${pronunciation}  ${sound}</span></span>
            
                                        <span class="card-title def-heading">Definition of ${meaning.meta.id}</span>
                                        <p class="defs">
                                            <span class="def">: marked by forceful and fluent expression</span>
                                            <span class="eg">an eloquent preacher</span>
                                            <span class="def">: vividly or movingly expressive or revealing</span>
                                            <span class="eg">an eloquent monument</span>
                                        </p>
            
                                    </div>
                                </div>
                            </div>
                        </div>

                    `;



                    $('#defView').html(markup);
                    
                });


            })


});