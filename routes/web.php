<?php
// routes/web.php

use App\Http\Controllers\YearbookController;
use Illuminate\Support\Facades\Route;

// Main yearbook page
Route::get('/', [YearbookController::class, 'index'])->name('yearbook.index');
