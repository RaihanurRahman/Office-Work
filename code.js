function change() {
	var rangeLabel = document.getElementById("range-label");
	var experience = document.getElementById("experience");
	rangeLabel.innerText = experience.value + "K";
}

document.addEventListener("submit", function(){
	var x = document.forms["my-form"];
	var kvpairs = [];
		
	for ( var i = 0; i < x.elements.length; i++ ) {
	   var e = x.elements[i];
	   if(e.name=="gender"){
	   		if(document.getElementById(e.id).checked){
	   			kvpairs.push(encodeURIComponent(e.name) + "," + encodeURIComponent(e.value));
	   		}
	   }
	   else if(e.name=="hobbies"){
	   		if(document.getElementById(e.id).checked){
	   			kvpairs.push(encodeURIComponent(e.name) + "," + encodeURIComponent(e.value));
	   		}
	   }
	   else{
	   		kvpairs.push(encodeURIComponent(e.name) + "," + encodeURIComponent(e.value));	   	
	   }
	}
	console.log(kvpairs);
	var user_key = "user-"+(localStorage.length+1);
	localStorage.setItem(user_key, JSON.stringify(kvpairs));

	
	
	event.preventDefault();
});

// console.log(localStorage.getItem("user-1"));
function showvalues(){
	for (var j = 0; j< localStorage.length; j++) {
		var arr = new Array();
		var user = "user-"+(j+1);
		var this_user = localStorage.getItem(user);
				var tmp = JSON.parse(this_user);
		for(var x in tmp){
			var dif = tmp[x];
			var valname  =  tmp[x].split(",").slice(0,1);
			var valvalue =  tmp[x].split(",").slice(1,2);
			console.log(typeof(valname));

			if(valname=="firstname" || valname=="lastname" || valname=="email" ||valname=="gender" ){
				if(valname=="email"){
					valvalue = String(valvalue);
					valvalue = valvalue.replace(/\+/g, " ").replace(/\%40/g, "@");
				}
				arr.push(valvalue);
			}
		}
		console.log(arr[0]);
		var tbl = document.getElementById("List-Entry");
		var r = tbl.insertRow();
		var c1 = r.insertCell();
		var c2 = r.insertCell();
		var c3 = r.insertCell();
		var Name = arr[0] + " " + arr[1];
		c1.innerHTML = Name;
		c2.innerHTML = arr[2];
		c3.innerHTML = arr[3];
	}
	 event.preventDefault();
}

