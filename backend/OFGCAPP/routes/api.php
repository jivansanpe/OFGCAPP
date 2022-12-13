<?php
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\PieceController;
use App\Http\Controllers\Api\AuthorController;
use App\Http\Controllers\Api\MusicianController;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
// Route::post('/events/{event}/musicians/{musician}/add','App\Http\Controllers\Api\EventController@add_musician');
Route::get('events', 'App\Http\Controllers\Api\EventController@index');
Route::get('events/{event}', 'App\Http\Controllers\Api\EventController@show');
Route::get('musicians', 'App\Http\Controllers\Api\MusicianController@index');
Route::get('musicians/{musician}', 'App\Http\Controllers\Api\MusicianController@show');
Route::get('authors', 'App\Http\Controllers\Api\AuthorController@index');
Route::get('authors/{author}', 'App\Http\Controllers\Api\AuthorController@show');
Route::get('pieces', 'App\Http\Controllers\Api\PieceController@index');
Route::get('pieces/{piece}', 'App\Http\Controllers\Api\PieceController@show');
Route::post('login', [AuthController::class, 'signin']);
Route::post('register', [AuthController::class, 'signup']);
Route::middleware('auth:sanctum')->group( function () {
    Route::apiResource('events', EventController::class)->except(['index','show']);
    Route::apiResource('pieces', PieceController::class)->except(['index','show']);
    Route::apiResource('authors', AuthorController::class)->except(['index','show']);
    Route::apiResource('musicians', MusicianController::class)->except(['index','show']);
});
