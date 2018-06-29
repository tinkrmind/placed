var app={
  initialize: function() {
    speech = 'test';
    // app.getServerResponse(speech);
    $( "#target" ).keydown(function( event ) {
      // enter 13
      if ( event.which == 13 ) {
        console.log("enter");
         event.preventDefault();
         speech = $( "#target" ).val();
         app.getServerResponse(speech);
         // console.log(scoped_model.most_similar(JSON.stringify(requests), 10))
         // pos++;
         // curpos = 0;
      }
    });
  },
  getServerResponse: function(speech) {
    console.log("1 : speech = "+speech)
    // if(Math.random() < 0.1){
    //     // $('#result').html("<p>"+speech+"</p><br /><br />")
    //     $('#result').html("<table style=\"width\:100\%\; background-color\: \#261EFA\; color\:white\;\"><tr><td>"+speech+"</td><td>available</td><td>BID\ |\ 🔔\ |\ 🛒</td> </table><br /><br />")
    // }
    // else{
    //   $('#result').html("<table style=\"width\:100\%\; background-color\: grey\; color\:white\;\"><tr><td>"+speech+"</td><td>owned</td><td>BID\ |\ 🔔\ |\ 🛒</td> </table><br /><br />")
    // }
    // console.log($('#response').html("<img style=\"width: 110px\; align:center \"src=assets/loading2.gif />"));
    $('#response').html("<img style=\"width: 110px\; display: block; margin-left: auto; margin-right: auto;\"src=assets/loading2.gif />")
    // var reqURL = "http://as11613.itp.io:7999/?test="+speech;
		// var reqURL = "http://104.236.250.123:7999/?test="+speech;
    // var reqURL = "http://127.0.0.1:3000/?test="+speech;
    var reqURL = "/getResult?test="+speech;
    $.ajax({
			url: reqURL,
			type: 'GET',
			dataType: 'text',
			error: function(err){
				console.log(err);
			},
			success: function(data){
        console.log(data);
        res = data;
        // debugger
				console.log("2 : data = "+res);
				app.makeHTML(res);
        // if(res != ""){ // Play audio if play_audio is 1 and we got a response from server
        //   if(play_audio == 1){
        //     // Add audio
        //     $('#audio').html('<audio autoplay><source src="http://as11613.itp.io:1337/assets/output.mp3?dummy='+ms+'" type="audio/mpeg"></audio>');
        //     ms = Date.now();
        //   }
        // } else{
        //   $('#audio').html('<audio autoplay><source src="http://as11613.itp.io:1337/assets/defaultResponse.mp3" type="audio/mpeg"></audio>');
        // }
			}
		});
  },
  makeHTML:function(data){
    $('#response').html(data);
    // console.log("3 : data = "+data)
  }
}
