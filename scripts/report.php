<?php


$url_base = 'http://localhost:8000/';
$url_base = 'https://api.gurufox.ai/';

$info_url = $url_base . 'dateplaninfo/';
$plan_url = $url_base . 'dateplan/?plan_info=';


$info_uuids = [];
$date_plan_info = [];

function get_info_uuids($url, &$uuids) {
        $info = file_get_contents($url);
        $info = json_decode($info);
        $next = $info->next;
        $results = $info->results;
        foreach($results as $result) {
                $uuids[] = [
                        'uuid' => $result->uuid,
                        'budget' => $result->budget,
                        'date' => $result->date,
                        'location' => $result->location,
                        'time' => $result->time,
                        'vibe' => $result->vibe,
                ];
        }
        /*
        if ($next) {
                get_info_uuids($next, $uuids);
        }
        //*/

}

get_info_uuids($info_url, $info_uuids);
print($info_uuids[0]['uuid'] . "\n");
print(count($info_uuids) . " uuids.\n");

foreach($info_uuids as $info) {
        $url = $plan_url . $info['uuid'];
        $plan = file_get_contents($url);
        print($plan . "\n\n");
        $plan = json_decode($plan);
        $results = $plan->results;
        foreach ($results as $result) { 

                print($result->plan->description);
        }

}

