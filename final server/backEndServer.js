const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var w2v = require("word2vec-node-standalone")
var scoped_model
var ethers = require('ethers');
var providers = ethers.providers;

var provider = providers.getDefaultProvider('ropsten');

var temp_result;

w2v.load_w2v_model(function(model){
	console.log(model.size);
	scoped_model = model;
	start();
})

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
// var password = req.body.user_password;
// app.get('/getResult', (req, res) => res.send('Hello World!'))

app.use('/getResult', function(req,res){
 		var done = 0;
		console.log(done)
      // console.log(req.query.test)
      var result =""
      temp_result = scoped_model.mostSimilar(req.query.test, 10);
			console.log(temp_result)
			result +="<table style=\"width\:100\%\; border-collapse: collapse;\"><tr  style =\"color: grey\; \"><td></td><td>status</td><td>action</td></tr>"
			provider.resolveName(req.query.test+".eth").then(function(address) {
			    if(address == null){
			      console.log("available")
						result+= "<tr style=\"background-color\: \#261EFA\; color\:white\; \" ><td style=\"padding: 5px; padding-left:10px;\">"+req.query.test+".eth</td><td>available</td><td>BID\ |\ 🔔\ |\ 🛒</td></tr>";
			    }
			    else{
						console.log("not available")
			      result+= "<tr style=\"background-color\:grey\; color\:white\; \"><td style=\"padding: 5px; padding-left:10px;\">"+req.query.test+".eth</td><td>owned</td><td>BID\ |\ 🔔\ |\ 🛒</td></tr>";
			    }
					result+= "<tr><td>&nbsp;  </td><td>&nbsp;  </td><td> &nbsp; </td></tr>";
					result+= "<tr><td>&nbsp;  </td><td> &nbsp; </td><td>&nbsp;  </td></tr>";
					result+= "<tr><td style=\"color:grey\; \">SUGGESTED ADDRESSES  </td><td>  </td><td>  </td></tr>";
					done++;
					exit();
			});
			// if(Math.random() < 0.9){
	    //     // $('#result').html("<p>"+speech+"</p><br /><br />")
	    //     result+= "<tr style=\"background-color\: \#261EFA\; color\:white\; \" ><td style=\"padding: 5px; padding-left:10px;\">"+req.query.test+".eth</td><td>available</td><td>BID\ |\ 🔔\ |\ 🛒</td></tr>";
	    // }
	    // else{
	    //   	result+= "<tr style=\"background-color\:grey\; color\:white\; \"><td style=\"padding: 5px; padding-left:10px;\">"+req.query.test+".eth</td><td>owned</td><td>BID\ |\ 🔔\ |\ 🛒</td></tr>";
	    // }



			console.log("Testing done: "+done)
			function exit(){
				if(done > 0){
					if(temp_result != null && temp_result != undefined){
						var data;
						// result+= "<tr><td>&nbsp;  </td><td> &nbsp; </td><td>&nbsp;  </td></tr>";
						var i;
						for (i = 0; i < temp_result.length; i++) {
								// result += temp_result[i].word + "<br>";
								// console.log(temp_result[i].word+".eth")
								// provider.resolveName(temp_result[i].word+".eth").then(function(address) {
								// 	done++;
								// 	console.log(done)
								//     if(address == null){
								//       // console.log("available")
								// 			result+= "<tr><td style=\"padding: 5px; padding-left:10px;\">"+temp_result[i].word+".eth</td><td style =\"color: \#261EFA\; \">available</td><td>BID\ |\ 🔔\ |\ 🛒</td> </tr>";
								//     }
								//     else{
								//       result+="<tr><td style=\"padding: 5px; padding-left:10px;\">"+temp_result[i].word+".eth</td><td style =\"color: grey\; \">owned</td><td>BID\ |\ 🔔\ |\ 🛒</td> </tr>";
								//     }
								// 		exit();
								// });
								if(Math.random() < 0.9){
						      // result+= "<tr style=\"border:1px solid grey\"><td>"+temp_result[i].word+".eth</td><td style =\"color: \#261EFA\; \">available</td><td>BID\ |\ 🔔\ |\ 🛒</td> </tr>";
									result+= "<tr><td style=\"padding: 5px; padding-left:10px;\">"+temp_result[i].word+".eth</td><td style =\"color: \#261EFA\; \">available</td><td>BID\ |\ 🔔\ |\ 🛒</td> </tr>";
						    }
						    else{
						      // result+="<tr style=\"border:1px solid grey\"><td>"+temp_result[i].word+".eth</td><td style =\"color: grey\; \">owned</td><td>BID\ |\ 🔔\ |\ 🛒</td> </tr>";
									result+="<tr><td style=\"padding: 5px; padding-left:10px;\">"+temp_result[i].word+".eth</td><td style =\"color: grey\; \">owned</td><td>BID\ |\ 🔔\ |\ 🛒</td> </tr>";
						    }
								result+= "<tr><td>&nbsp;  </td><td> &nbsp; </td><td>&nbsp;  </td></tr>";
						}
					}

					result+= "</table>";
					console.log("returning")
					res.send(result);
				}
			}
})

function start(){
  app.listen(3000, () => console.log('Example app listening on port 3000!'))
}
