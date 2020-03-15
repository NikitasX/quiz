$(document).ready(function() {
	// Place your code here
	
	// Check if url is valid and if not redirect to #login
	function validateURL() {
		let url = window.location.href;
		let protocol = window.location.protocol;
		
		if(url != `${protocol}//dev.client.com:8080/#viewProjects` && 
		   url != `${protocol}//dev.client.com:8080/#login`) {
			window.location = `http://dev.client.com:8080/#login`;
		}
	}
	
	// Display the correct element for each endpoint (#login, #viewProjects)
	function showElements() {
		let url = window.location.href;
		let protocol = window.location.protocol;
		
		switch(url) {
			case `${protocol}//dev.client.com:8080/#viewProjects`:
				$('#login').hide();
				$('#viewProjects').show();
				break;
			case `${protocol}//dev.client.com:8080/#login`:
				$('#login').show();
				$('#viewProjects').hide();
				break;
		}
	}

	// Get values saved on storage and place and change their respective input values
	function getValuesFromStorage() {
		if(localStorage.getItem('username') != undefined) {
			$('#username').val(localStorage.getItem('username'));
		}		
		
		if(localStorage.getItem('password') != undefined) {
			$('#password').val(localStorage.getItem('password'));
		}		
		
		if(localStorage.getItem('savepassword') != undefined) {
			$('#save').prop('checked', true);
		}
	}

	// Make an ajax call with a hash provided, grab the returned data and
	// fill out the table 
	function makeAjaxCall(data) {

		var emptyData = false;
		dataIsNull = data.split('&');
		
		// Check if data values are empty and if they are return false
		$.each(dataIsNull, function(key, value){
			value = value.split('=');
			
			if(value[1] == undefined || value[1] == '') {
				emptyData = true;
			}
		});

		if(emptyData == true) {
			return false;
		}
		
		// Make an ajax call to get the user-pass hash from the server
		let ajaxCall = $.ajax({
			url: 'http://dev.server.com:8080?mode=login',
			type: 'GET',
			dataType: 'json',
			data: data
		});
		
		// When the above call is completed grab the users and projects 
		// of the above hash (assuming they differ) using two different
		// ajax calls
		ajaxCall.done((hash) =>{
			let users = $.ajax({
				url: `http://dev.server.com:8080?mode=get_users&hash=${hash.hash}`,
				type: 'GET',
				dataType: 'json'
			});			
			
			let projects = $.ajax({
				url: `http://dev.server.com:8080?mode=get_projects&hash=${hash.hash}`,
				type: 'GET',
				dataType: 'json'
			});
			
			// Wait until both ajax calls are completed before continuing 
			$.when(users.done(), projects.done()).
			then(function(users, projects){
				
				// Hide login form, show table
				$('#login').hide();
				$('#viewProjects').show();
				
				// Defind variables usersList, projectsList for ease of use
				let usersList = [];
				let projectsList = projects[0];
				
				// Fill out the usersList array with the user data using the
				// user ID as each array entry's index(key)
				$.each(users[0], function(key, value) {					
					usersList[value.id] = value.name + '///' + value.lastName;
				});
				
				var i = 1;
				
				// Clear #viewProjects tbody of any values
				$('#viewProjects tbody').html('');
				
				$.each(projectsList, function(key, value){
					
					// check if the user exists in the user array
					// if user doesn't exist, don't show the project,
					// assuming it's false
					if(usersList[value.user] == undefined) {
						return false;
					}
					
					// Split user name and lastname by some predefined value 
					// and assign them to variables
					let projectUser = usersList[value.user].split('///');
					
					let userName = projectUser[0];
					let userLastName = projectUser[1];
					
					// Append rows to tbody
					$('#viewProjects tbody').append(
					`<tr>
						<td>${i}</td>
						<td>${userName}</td>
						<td>${userLastName}</td>
						<td>${value.name}</td>
					</tr>`);
					
					i++;
				});
				
				// Change location hash
				location.hash = 'viewProjects';
			});
		});
	}

	// Check if the url is correct, show the necessary elements
	// and get values from storage
	validateURL();
	showElements();
	getValuesFromStorage();
	
	// On hashchange show the correct elements and make sure the form
	// gets submitted each time #viewProjects is loaded (data provided from form)
	$(window).on('hashchange', function(){
		validateURL();
		showElements();
		getValuesFromStorage();
		
		let url = window.location.href;
		let protocol = window.location.protocol;
		
		if(url === `${protocol}//dev.client.com:8080/#viewProjects`) {
			makeAjaxCall($('form').serialize());
		}
	});
	
	// Prevent default form submission, save data to localStorage and make ajax call
	$('form').on('submit', function(e){
		
		e.preventDefault();
		
		let data = $(this).serialize();
		let dataArray = $(this).serializeArray();
		
		if(dataArray[2] != undefined) {
			localStorage.setItem(dataArray[0].name, dataArray[0].value);
			localStorage.setItem(dataArray[1].name, dataArray[1].value);
			localStorage.setItem(dataArray[2].name, dataArray[2].value);
		} else {
			localStorage.clear();
		}
		
		makeAjaxCall(data);
	});
	
	// End
});