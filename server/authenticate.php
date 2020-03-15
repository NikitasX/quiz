<?php
return $needsAuthentication ? (authenticate($hash, 'sha256') ? TRUE : FALSE) : TRUE;

function authenticate(?string $hash = '', string $algo = 'sha256'): bool {
	$authenticated = FALSE;
	// Depending on the hashing algo you chose in `key_generator.php` write the body of `authenticate` function so that its result depends
	// on the length of the hash.
	// Edit below this line
	
	// sha256 length is 64 characters
	$authenticated = (
			strlen($hash) != 0 && 
			strlen($hash) === 64
		) ? TRUE : FALSE;
	
	// End
	return (bool) $authenticated;
}