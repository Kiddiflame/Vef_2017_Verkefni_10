"use strict";

var fylki = [];

function template(x){
	var stakur = document.createElement("DIV");
	stakur.className = "ui basic segment";
	stakur.setAttribute("src", fylki[x].image);
	stakur.setAttribute("data-tags", fylki[x].where);
	var mynd = document.createElement("IMG");
	var texti1 = document.createElement("P");
	var texti2 = document.createElement("P");
	var texti3 = document.createElement("P");
	var brek = document.createElement("BR");
	var heiti = document.createTextNode("Heiti: " + fylki[x].name);
	var stadur = document.createTextNode("Staður: " + fylki[x].where);
	var hvenaer = document.createTextNode("Hvenær: " + fylki[x].when);
	mynd.setAttribute("src", fylki[x].image);
	mynd.setAttribute("data-tags", fylki[x].where);
	mynd.setAttribute("alt", fylki[x].name);
	texti1.appendChild(heiti);
	texti2.appendChild(stadur);
	texti3.appendChild(hvenaer);
	stakur.appendChild(mynd);
	stakur.appendChild(texti1);
	stakur.appendChild(texti2);
	stakur.appendChild(texti3);
	document.getElementById("tonleikar").appendChild(stakur);
}
function render(image){	
	document.getElementById("tonleikar").appendChild(image);	
}

$.ajax({
	'url': 'http://apis.is/concerts',
	'type': 'GET',
	'dataType': 'JSON',
	'success': function(data)	{
		
		for (var i = 0; i < data.results.length; i++) {
			fylki.push({
				name: data.results[i].eventDateName,
				where: data.results[i].eventHallName,
				when: data.results[i].dateOfShow,
				image: data.results[i].imageSource
			});
		// kalla á createTemplate
			template(i);
		// kalla á render		
		}
		(function()	{
			var $imgs = $('#tonl img');   
    		var $search = $('#filters');   
    		var $ps = $('#tonl div');  
    		var cache = []; 

    		console.log($ps);
    		console.log($imgs);
			$imgs.each(function() {                
        		cache.push({                         
            		image: this,                     
            		text: this.alt, //.trim().toLowerCase(),
            		paragraph1: this.nextSibling,
            		paragraph2: this.nextSibling.nextSibling, 
            		paragraph3: this.nextSibling.nextSibling.nextSibling     		
           		});
           		
      		});
      		
      		console.log(cache);
    		function filter() {                    
        		var query = this.value.trim().toLowerCase(); 
        		cache.forEach(function(img) {         
            		var index = 0;         
            		console.log(img.paragraph);

            		if (query) {                        
             			index = img.text.indexOf(query);
             			console.log(index);
            		}
            		img.image.style.display = index === -1 ? 'none' : '';
            		img.paragraph1.style.display = index === -1 ? 'none' : '';
            		img.paragraph2.style.display = index === -1 ? 'none' : '';
            		img.paragraph3.style.display = index === -1 ? 'none' : '';
        		});
      		} 

			if('oninput' in $search[0])	{
				$search.on('input', filter);
			} else	{
				$search.on('keyup', filter);
			}
		}());
		
		//console.log(fylki);
	}
});
console.log(fylki);