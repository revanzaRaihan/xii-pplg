<?php
// app/Http/Controllers/CommentController.php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;

class CommentController extends Controller
{
    /**
     * Store a newly created comment.
     */
    public function store(Request $request)
    {
        // Rate limiting - max 3 comments per hour per IP
        $key = 'comment-submit:' . $request->ip();
        
        if (RateLimiter::tooManyAttempts($key, 3)) {
            $seconds = RateLimiter::availableIn($key);
            
            throw ValidationException::withMessages([
                'message' => "Terlalu banyak percobaan. Silakan coba lagi dalam {$seconds} detik.",
            ]);
        }

        // Validate request
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'message' => 'required|string|max:500',
            'emoji' => 'nullable|string|max:10',
        ]);

        // Create comment
        $comment = Comment::create([
            'name' => $validated['name'],
            'message' => $validated['message'],
            'emoji' => $validated['emoji'] ?? null,
            'ip_address' => $request->ip(),
            'is_approved' => true, // Auto-approve, atau set false jika ingin moderasi
        ]);

        // Increment rate limiter
        RateLimiter::hit($key, 3600); // 1 hour

        return response()->json([
            'success' => true,
            'message' => 'Komentar berhasil dikirim!',
            'data' => $comment,
        ], 201);
    }

    /**
     * Get all approved comments.
     */
    public function index()
    {
        $comments = Comment::approved()
            ->latest()
            ->take(50) // Limit 50 komentar terbaru
            ->get();

        return response()->json([
            'success' => true,
            'data' => $comments,
        ]);
    }

    /**
     * Approve a comment (admin only).
     */
    public function approve($id)
    {
        $comment = Comment::findOrFail($id);
        $comment->update(['is_approved' => true]);

        return response()->json([
            'success' => true,
            'message' => 'Komentar berhasil disetujui!',
        ]);
    }

    /**
     * Delete a comment (admin only).
     */
    public function destroy($id)
    {
        $comment = Comment::findOrFail($id);
        $comment->delete();

        return response()->json([
            'success' => true,
            'message' => 'Komentar berhasil dihapus!',
        ]);
    }
}