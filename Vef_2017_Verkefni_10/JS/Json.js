var concertEvents = [];
var $search = $("#filter");

	$.ajax({
	  'url': 'http://apis.is/concerts',
	  'type': 'GET',
	  'dataType': 'json',
	  'success': function(data) {
	   
			for(let i = 0; i<data.results.length; i++){
				concertEvents.push
				({
					name:data.results[i].eventDateName,
					when:data.results[i].dateOfShow,
					where:data.results[i].eventHallName,
					imageSrc:data.results[i].imageSource
				});
			}
			console.log(data);
			console.log(concertEvents);
			Display();
	  }
	});

function Display(){
	var Results = "";
	for (let i = 0; i<concertEvents.length; i++) {
	 		Results += "<div id='event_tap'><img src='" + concertEvents[i].imageSrc + 
	 		"' data-tags =" +concertEvents[i].name+"><div id='event_info'> <b>Nafn:</b> " + concertEvents[i].name + "<br> <b>Staðsetning:</b> " 
	 		+ concertEvents[i].where + "<br> <b>Tími:</b> " + concertEvents[i].when + "</div></div>";
	 }
	 $("#event_list").html(Results)
}

(function()
{
var $events = $('event_tap img');
var tagged = {};

	$('#filter').keyup(function(){
   var valThis = $(this).val();
    $("#even").foreach(function(){
     var text = $(this).text().toLowerCase();
        (text.indexOf(valThis) == 0) ? $(this).show() : $(this).hide();         
   });
});


});

/*

var $events = $('event_tap img');
var $search = $('#filter');

$('#filter').keyup(function(){
   var valThis = $(this).val().toLowerCase();
    if(valThis == ""){
        $('#event_tap > img').show();
        console.log("bleh");           
    } else {
        $('#event_tap > img').each(function(){
            var text = $(this).text().toLowerCase();
            (text.indexOf(valThis)  -1) ? $(this).show() : $(this).hide();
        });
   };
});*/