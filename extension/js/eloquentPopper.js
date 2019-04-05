fetchWord = function(){

    var word = window.getSelection().toString();
    var definitions = '';
    fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=4db1f56e-e61d-4755-912b-392c42fbe3da`)
            .then(res => {
                return res.json();
            })
            .then(json => {
                
                json.forEach((meaning)=>{

                    if(typeof meaning.meta === 'undefined' || typeof meaning === 'undefined'){
                        return;
                    }

                    // Skip if no short defs
                    if(typeof meaning.shortdef[0] === 'undefined'){
                        return;
                    }

                    //Definitions
                    meaning.shortdef.forEach((value) => {
                        definitions += `${value}, `;
                    });
                    
                });

                var popup = `
                    <span class="popuptext" id="myPopup">${definitions}</span>
              `;

              document.body.innerHTML += popup;

              var popup = document.getElementById("myPopup");
              popup.classList.toggle("show");

            })
   
}
document.body.addEventListener('dblclick',fetchWord);