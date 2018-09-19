// don't forget about the ready().

var animalObject = {
    topics : [
        'dog',
        'cat',
        'rabbit',
        'hamster'
    ],
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
    animalChoice: '',
    newAnimal: ''
}
        var $animalDiv = $('#animals-container');
        var $gifyDiv = $('#gify-container');
        animalObject.buildAnimalButtons();
        // Add Animals to the list
        var addAnimal = $('#add-animal');
        addAnimal.on('click',  function(event){
            event.preventDefault();
            var animalName = $('#new-animal').val().trim();
            if(animalObject.topics.indexOf(animalName) === -1){
             animalObject.topics.push(animalName);   
            }
            console.log(animalObject.topics);
            animalObject.buildAnimalButtons();

        })
        // find Gifs
            $('#animals-container').on('click','button', function () {
                $gifyDiv.empty();
                animalObject.animalChoice = $(this).attr('data-animal');
                var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                    animalObject.animalChoice +
                    "&api_key=dc6zaTOxFJmzC&limit=10";
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function (response) {
                    var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var $animalGifyDiv = $('<div>');
                    var $p = $('<p>').attr('class','m-2');
                    $p.text('Rating: ' + results[i].rating);
                    var $image = $('<img>');
                    $image.attr({
                        'class': 'm-2 border',
                        'src': results[i].images.fixed_height_still.url,
                        'data-still': results[i].images.fixed_height_still.url,
                        'data-animate': results[i].images.fixed_height.url,
                        'data-state': 'still'
                    });
                    $animalGifyDiv.append($p);
                    $animalGifyDiv.append($image);
                    $gifyDiv.prepend($animalGifyDiv);
                }
            
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
