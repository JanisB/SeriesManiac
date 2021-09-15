<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Grade;
use App\Models\Movies;
use Illuminate\Support\Facades\Http;

class test extends Controller
{
    public function test()
    {
        $randMovies = Movies::inRandomOrder()->limit(1)->first();
        $data = Http::get('https://api.myshows.ru/shows/'.$randMovies->api_id);
        $string = explode("/small", $data['image']);
        $url = implode("", $string);
        $data['big_image'] = $url;
        return $data;
    }

}
