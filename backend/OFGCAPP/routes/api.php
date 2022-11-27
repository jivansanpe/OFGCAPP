<?php
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\PieceController;
use App\Http\Controllers\Api\AuthorController;
use App\Http\Controllers\Api\MusicianController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// Route::post('/events/{event}/musicians/{musician}/add','App\Http\Controllers\Api\EventController@add_musician');
Route::apiResource('events', EventController::class);
Route::apiResource('pieces', PieceController::class);
Route::apiResource('authors', AuthorController::class);
Route::apiResource('musicians', MusicianController::class);
