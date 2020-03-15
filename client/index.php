<?php
$solution = isset($_GET['solution']) ? 1 : 0;
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<script defer src="https://use.fontawesome.com/releases/v5.0.2/js/all.js"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
<title>Digital Publications Group</title>
</head>
<body>
	<div class='container'>
		<div>&nbsp;</div>
		<div id='login' style='display: none;'>
			<h4 class="card-title mb-4 mt-1">Sign in</h4>
			<form>
				<!-- Only change code inside this form -->
				<div class="form-group">
					<label>Username</label>
					<input id="username"  name="username" class="form-control" placeholder="Username" type="input" required>
				</div>
				<div class="form-group">
					<label>Password</label>
					<input id="password" name="password" class="form-control" placeholder="******" type="password" required>
				</div>
				<div class="form-group">
					<div class="checkbox">
						<label>
							<input id="save" name="savepassword" type="checkbox" value="save">
							Save password
						</label>
					</div>
				</div>
				<div class="form-group">
					<button type="submit" class="btn btn-primary btn-block">Login</button>
				</div>
				<!-- End -->
			</form>
		</div>
		<div id='viewProjects' style='display: none;'>
			<table class="table">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Name</th>
						<th scope="col">Lastname</th>
						<th scope="col">Project</th>
					</tr>
				</thead>
				<tbody>
				</tbody>
			</table>
		</div>
	</div>
	<script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
	<script>
		var apiBase = 'http://dev.server.com:8080';
		var solution = <?=$solution ? 'true' : 'false';?>;
	</script>
	<script src="scripts<?=$solution?'-solution':''?>.js"></script>
</body>
</html>