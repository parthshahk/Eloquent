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