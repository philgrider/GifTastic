// don't forget about the ready().
$(document).ready(function() {
    console.log('widnow size' + $(this).width());

var animalObject = {
    topics : [
        'dog',
        'cat',
        'rabbit',
        'hamster'
    ],
    animalChoice: '',
    newAnimal: '',
    mobile: false,
    gifySelected: false,
    buildAnimalButtons: function(){
        $animalDiv.empty();
        for(var i =0;i < this.topics.length;i++){
            var $animalBtn = $('<button>').attr({
                type : 'button',
                'class' : 'btn btn-info m-1',
                'data-animal' : this.topics[i]
            }).text(this.topics[i]);

            $animalDiv.append($animalBtn);
        }
    },

    buildGifs : function(results){
        console.log('Build Mobile ? ' + animalObject.mobile);
        if (this.mobile === true){
            for (var i = 0; i < results.length; i++) {
                var $animalGifyDiv = $('<div>');
                var $p = $('<p>').attr('class','m-2').text('Rating: ' + results[i].rating);
                var $image = $('<img>').attr({
                    'class': 'm-2 border',
                    'src': results[i].images.fixed_height_small_still.url,
                    'data-still': results[i].images.fixed_height_small_still.url,
                    'data-animate': results[i].images.fixed_height_small.url,
                    'data-state': 'still'
                    });
                $animalGifyDiv.append($p);
                $animalGifyDiv.append($image);
                $gifyDiv.prepend($animalGifyDiv);
                };
        }
        else{
            for (var i = 0; i < results.length; i++) {
                var $animalGifyDiv = $('<div>');
                var $p = $('<p>').attr('class','m-2').text('Rating: ' + results[i].rating);
                var $image = $('<img>').attr({
                    'class': 'm-2 border',
                    'src': results[i].images.fixed_height_still.url,
                    'data-still': results[i].images.fixed_height_still.url,
                    'data-animate': results[i].images.fixed_height.url,
                    'data-state': 'still'
                });
                $animalGifyDiv.append($p);
                $animalGifyDiv.append($image);
                $gifyDiv.prepend($animalGifyDiv);
            }; 
        };
    },
    checkSize : function () {  
        console.log('widnow size' + $(window).width());
        if($(window).width() < 578){
            console.log('Small size :' + $(window).width());
            animalObject.mobile = true;
            if(animalObject.gifySelected === true){
            animalObject.buildGifs(resultsValue);                
            }
            console.log('Mobile state: '+ animalObject.mobile);
        }
        else{
            animalObject.mobile = false;
            if(animalObject.gifySelected === true){
                animalObject.buildGifs(resultsValue);                
            }
            console.log('Mobile state: '+animalObject.mobile);
        }

    }
};
        // check the window size as it changes
        $(window).resize(animalObject.checkSize);
        // initial check of window size for mobile
        animalObject.checkSize();
        // containers for HTML Divs
        var $animalDiv = $('#animals-container');
        var $gifyDiv = $('#gify-container');
        // Build Buttons from Start
        animalObject.buildAnimalButtons();
        // Add Animals to the list
        $('#add-animal').on('click',  function(event){
            event.preventDefault();
            var animalName = $('#new-animal').val().trim();
            if(animalObject.topics.indexOf(animalName) === -1){
             animalObject.topics.push(animalName);   
            }
            console.log(animalObject.topics);
            animalObject.buildAnimalButtons();

        })
        var resultsValue ='';

        // find Gifs
            $('#animals-container').on('click','button', function () {
                animalObject.gifySelected = true;
                $gifyDiv.empty();
                animalObject.animalChoice = $(this).attr('data-animal');
                var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                    animalObject.animalChoice +
                    "&api_key=dc6zaTOxFJmzC&limit=10";
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function (response) {
                    resultsValue = response.data;
                    animalObject.buildGifs(resultsValue);
                    });

            
        });
        // play and stop gifs
        $('.gif').unbind('click').on('click', 'img', function (event) {
            event.preventDefault();
            var state = $(this).attr('data-state');
            console.log(state);
            if(state === 'still'){
                $(this).attr('src', $(this).attr('data-animate'));
                $(this).attr('data-state','animated');
              }
              else{
                $(this).attr('src', $(this).attr('data-still'));
                $(this).attr('data-state','still');
              }
        });

});