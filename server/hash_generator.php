<?php
// Given a username and a password that both are not blank, return their concatenation as a hash key (md5 or sha256) or `NULL`
// **DO NOT USE** more than 2 lines of code.
// Comments and blank lines are not getting counted
// Edit file below this line.

// Check if username and password isset and encrypt using sha256, return null 
// if either is not set
$userEncryptedHash = (isset($_GET['username']) && isset($_GET['password'])) ? 
		hash(
			'sha256', 
			strval($_GET['username']) . 
			strval($_GET['password'])
		) : NULL;

return $userEncryptedHash;