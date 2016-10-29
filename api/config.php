<?php
    ini_set('max_execution_time', 0);
    set_time_limit(0);

    ini_set('display_errors', 1);
    error_reporting(E_ALL);

    require_once '../wp-load.php';

    /**
    *
    * $unit = M - Miles, K - Kilometers, N - Nautical Miles
    *
    **/
	function distance($lat1, $lon1, $lat2, $lon2, $unit) {
		$theta = $lon1 - $lon2;
		$dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) +  cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta));
		$dist = acos($dist);
		$dist = rad2deg($dist);
		$miles = $dist * 60 * 1.1515;
		$unit = strtoupper($unit);

		$f = 0;

		if ($unit == "K")
			$f = $miles * 1.609344;
		else if ($unit == "N")
			$f = $miles * 0.8684;
		else
			$f = $miles;

		return number_format($f, 2);
	}
?>