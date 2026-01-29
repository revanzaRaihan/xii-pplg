<?php
// routes/api.php

use App\Http\Controllers\CommentController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public routes
Route::post('/comments', [CommentController::class, 'store'])->name('comments.store');
Route::get('/comments', [CommentController::class, 'index'])->name('comments.index');

// Protected routes (admin only) - uncomment jika ingin moderasi komentar
// Route::middleware('auth:sanctum')->group(function () {
//     Route::post('/comments/{id}/approve', [CommentController::class, 'approve'])->name('comments.approve');
//     Route::delete('/comments/{id}', [CommentController::class, 'destroy'])->name('comments.destroy');
// });