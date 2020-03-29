function change() {
	var rangeLabel = document.getElementById("range-label");
	var experience = document.getElementById("experience");
	rangeLabel.innerText = experience.value + "K";
}

 document.addEventListener('submit', (e) =>
 {
	var x = document.forms["my-form"];
	var kvpairs = [];
	for ( var i = 0; i < x.elements.length; i++ ) {
	   var e = x.elements[i];
	   if(e.name=="gender"){
	   		if(document.getElementById(e.id).checked){
	   			kvpairs.push(encodeURIComponent(e.name) + "," + encodeURIComponent(e.value));
	   		}
	   }
	   else{
	   		kvpairs.push(encodeURIComponent(e.name) + "," + encodeURIComponent(e.value));	   	
	   }
	}
	var pass = document.querySelector('#password').value;
	var cpass = document.querySelector('#confirm-password').value;
	if(pass !== cpass){
		alert("Password Doesn't Match");
	}
	var user_key = "user-"+(localStorage.length+1);
	localStorage.setItem(user_key, JSON.stringify(kvpairs));
	event.preventDefault();
});


//Show the form values

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

			if(valname=="firstname" || valname=="lastname" || valname=="email" ||valname=="gender" ){
				if(valname=="email"){
					valvalue = String(valvalue);
					valvalue = valvalue.replace(/\%40/g, "@");
				}
				arr.push(valvalue);
			}
		}
		// console.log(arr[0]);
		const tbl = document.querySelector("#List-Entry");
		const r = document.createElement('tr');
		const Name = arr[0] + " " + arr[1];
		r.innerHTML = `
			<td> ${Name} </td>
			<td> ${arr[2]} </td>
			<td> ${arr[3]} </td>
		`
		tbl.appendChild(r);
	}
	event.preventDefault();
}


//Show the details of Students
var details_div = document.querySelector('#details');
if(document.querySelector('#List-Entry')!=null){
	document.querySelector('#List-Entry').addEventListener('click',function(e){
		if(e.target.parentElement){
			// console.log(e.target.parentElement.childNodes[2].nextSibling.innerText);
			var emailval = e.target.parentElement.childNodes[2].nextSibling.innerText;
			var arr = new Array();
			for (var j = 0; j< localStorage.length; j++) {
				var user = "user-"+(j+1);
				var this_user = localStorage.getItem(user);
				var tmp = JSON.parse(this_user), pos=-1;
				for(var x in tmp){
					var dif = tmp[x];
					var valname  =  tmp[x].split(",").slice(0,1);
					var valvalue =  tmp[x].split(",").slice(1,2);
					if(valname=="email"){
						valvalue = String(valvalue);
						valvalue = valvalue.replace(/\%40/g, "@");
	
						if(valvalue==emailval){
							pos = x;
							break;
						}
					}
				}
				
				if(pos!=-1){
					for(var x in tmp){
						var dif = tmp[x];
						var valname  =  tmp[x].split(",").slice(0,1);
						var valvalue =  tmp[x].split(",").slice(1,2);
						if(valname!='hobbies')arr.push(valvalue);
					}
					break;
				}
			}
			const tbl1 = document.querySelector(".details-contain");
			const r = document.createElement('ul');
			r.className = 'list-group';
			var mail = String(arr[2]);
			r.innerHTML = `
				<li class="list-group-item">
				Name: ${arr[0] + ' ' + arr[1]} </li>
				<li class="list-group-item">
				Email: ${mail.replace(/\%40/g, "@")} </li>
				<li class="list-group-item">
				Password: ${arr[3]} </li>
				<li class="list-group-item">
				Gender: ${arr[5]} </li>
				<li class="list-group-item">
				Income: ${arr[11]} </li>
			`
			if(tbl1.childElementCount==1){
				tbl1.appendChild(r);
			}
			else {
				
				// console.log(r);
				// while(tbl1.childElementCount!=2){
				tbl1.removeChild(tbl1.lastChild);
				// }
				tbl1.appendChild(r);
			}
			// console.log(tbl1.lastChild);
			// console.log(tbl1.childElementCount);
			
			
			details_div.style.display = "block";
			details_div.style.transition = "1s";

		}
	});
	var span = document.getElementsByClassName("close")[0];
	span.onclick = function() {
		details_div.style.display = "none";
		details_div.style.transition = "1s";
	}
	
	window.onclick = function(event) {
	
		if (event.target == details_div) {
		  details_div.style.display = "none";
		  details_div.style.transition = "1s";
		}
	}
}

function logcheck ()
{
	var email_id = document.querySelector('#email').value;
	var pass = document.querySelector('#password').value;
	email_id = String(email_id);
	email_id = email_id.replace(/\%40/g, "@");
	// console.log(email_id);
	var s = 0;
	for (var j = 0; j< localStorage.length; j++) {
		var user = "user-"+(j+1);
		var this_user = localStorage.getItem(user);
		var tmp = JSON.parse(this_user), pos=0;
		for(var x in tmp){
			var dif = tmp[x];
			var valname  =  tmp[x].split(",").slice(0,1);
			var valvalue =  tmp[x].split(",").slice(1,2);
			if(valname=="email"){
				valvalue = String(valvalue);
				valvalue = valvalue.replace(/\%40/g, "@");

				if(valvalue==email_id){
					pos++;
					// console.log(pos);
				}
			}
			else if(valname=='password'){
				if(valvalue==pass){
					pos++;
				}
			}
			if(pos==2)break;
		}
		// console.log(pos);
		if(pos==2){
			alert('Log In Successful!!');
			s = 1;
			break;
		}
	}
	if(!s){
		alert('Incorrect Email/Password');
	}
	// event.preventDefault();
}
/*Update Event */
function Update ()
{
	event.preventDefault();	
	var email_id = document.querySelector('#updateemail').value;
	console.log(email_id);
	var str,user_key;
	for (var j = 0; j< localStorage.length; j++) {
		var user = "user-"+(j+1);
		var this_user = localStorage.getItem(user);
		var tmp = JSON.parse(this_user), pos=0;
		// console.log(tmp);
		for(var x in tmp){
			var dif = tmp[x];
			var valname  =  tmp[x].split(",").slice(0,1);
			var valvalue =  tmp[x].split(",").slice(1,2);
			if(valname=="email"){
				valvalue = String(valvalue);
				valvalue = valvalue.replace(/\%40/g, "@");

				if(valvalue==email_id){
					pos++;
					// console.log('val');
					break;
				}
			}
		}
		if(pos!=-1){//find the person who's info wants to update
			// console.log(tmp);
			str = tmp;
			user_key = user;
			break;
		}
	}
	var fname = document.querySelector('#upfirstname').value;
	var lname = document.querySelector('#uplastname').value;
	var ename = document.querySelector('#upemail').value;
	var npass = document.querySelector('#uppassword').value;
	var ncpass = document.querySelector('#upconfirm-password').value;
	if(npass!=null && npass!=ncpass){
		alert("Passord Doesn't Match");
	}
	// console.log(fname,lname,str);
	var kvpairs = [];
	for(var x in str){
		var dif = str[x];
		var valname  =  str[x].split(",").slice(0,1);
		var valvalue =  str[x].split(",").slice(1,2);
		if(valname=="email"){
			valvalue = String(valvalue);
			valvalue = valvalue.replace(/\%40/g, "@");
		}
		if(valname == 'firstname'){
			// console.log(valname,valvalue);
			if(fname != ''){
				console.log("yes");
				kvpairs.push(encodeURIComponent(valname) + "," + encodeURIComponent(fname));	   	
			}
			else kvpairs.push(encodeURIComponent(valname) + "," + encodeURIComponent(valvalue));
		}
		else if(valname =='lastname'){
			if(lname!=''){
				kvpairs.push(encodeURIComponent(valname) + "," + encodeURIComponent(lname));	   	
			}
			else kvpairs.push(encodeURIComponent(valname) + "," + encodeURIComponent(valvalue));
		}
		else if(valname =='email'){
			if(ename!=''){
				kvpairs.push(encodeURIComponent(valname) + "," + encodeURIComponent(ename));	   	
			}
			else kvpairs.push(encodeURIComponent(valname) + "," + encodeURIComponent(valvalue));
		}
		else if(valname =='password'){
			if(npass!=''){
				kvpairs.push(encodeURIComponent(valname) + "," + encodeURIComponent(npass));	   	
			}
			else kvpairs.push(encodeURIComponent(valname) + "," + encodeURIComponent(valvalue));
		}
		else{
			kvpairs.push(encodeURIComponent(valname) + "," + encodeURIComponent(valvalue));	
		}
	}
	
	// console.log(user_key,kvpairs);
	localStorage.removeItem(user);
	localStorage.setItem(user_key, JSON.stringify(kvpairs));
}
