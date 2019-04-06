fetchWord = function(){

    var word = window.getSelection().toString();
    var definitions = '';
    fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=4db1f56e-e61d-4755-912b-392c42fbe3da`)
            .then(res => {
                return res.json();
            })
            .then(json => {
			
				var markup = '';

                json.forEach( meaning => {

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
                            sound = `<img src="https://parthshah.xyz/eloquent/hosted/sound.png" id="t${meaning.meta.uuid}" onclick="document.getElementById('${meaning.meta.uuid}').play();"><audio class="eqaudio" id="${meaning.meta.uuid}" src="${url}" ></audio>`;
                        }
                    }

                    //Definitions
					var definitions = '';
                    meaning.shortdef.forEach(value => {
                        definitions += `<span class="eqdef">:${value}</span>`;
                    });

                    
                    markup += `

                        <div class="eqrow">
                            <div class="eqcol eqs12">
                                <div class="eqcard eqgrey eqlighten-4">
                                    <div class="eqcard-content eqgrey-text eqtext-darken-4">
            
                                        <span class="eqcard-title eqword">${meaning.meta.id} <span class="eqtype">${type}</span></span>
                                        <span class="eqcard-title eqsound"><span class="eqsyla">${headword}</span><span class="eqvoice">${pronunciation}  ${sound}</span></span>
            
                                        <span class="eqcard-title eqdef-heading">Definition of ${meaning.meta.id}</span>
                                        <p class="eqdefs">${definitions}</p>
            
                                    </div>
                                </div>
                            </div>
                        </div>

                    `;


                    
                });

                
                // Modal
				var modal = new tingle.modal({});
				modal.setContent(markup);
				modal.open();

            })
   
}
document.body.addEventListener('dblclick',fetchWord);