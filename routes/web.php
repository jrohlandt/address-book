<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::get('/home', 'HomeController@index')->name('home');

Auth::routes();
Route::get('/logout', 'Auth\LoginController@logout');

Route::prefix('contacts')->middleware(['auth'])->group(function() {
    Route::get('/', 'ContactController@index');
    Route::post('/', 'ContactController@store');
    Route::get('/{contactId}', 'ContactController@show');
    Route::get('/create', function() { return view('app'); });
    Route::get('/{contactId}/edit', function() { return view('app'); });
    Route::put('/{contactId}', 'ContactController@update');
    Route::delete('/{contactId}', 'ContactController@destroy');


});

Route::resource('/example', 'ContactController');


