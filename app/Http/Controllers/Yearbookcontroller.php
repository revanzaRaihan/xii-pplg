<?php
// app/Http/Controllers/YearbookController.php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Student;
use Inertia\Inertia;
use Inertia\Response;

class YearbookController extends Controller
{
    /**
     * Display the yearbook main page.
     */
    public function index(): Response
    {
        // Get all students ordered
        $students = Student::ordered()->get()->map(function ($student) {
            return [
                'id' => $student->id,
                'name' => $student->name,
                'nickname' => $student->nickname,
                'role' => $student->role,
                'github' => $student->github,
                'instagram' => $student->instagram,
                'portrait' => $student->portrait_url,
                'bio' => $student->bio,
            ];
        });

        // Get approved comments
        $comments = Comment::approved()
            ->latest()
            ->take(50)
            ->get()
            ->map(function ($comment) {
                return [
                    'id' => $comment->id,
                    'name' => $comment->name,
                    'message' => $comment->message,
                    'emoji' => $comment->emoji,
                    'created_at' => $comment->created_at->toISOString(),
                ];
            });

        // Memory images - bisa dari database atau static
        $memories = [
            [
                'id' => 1,
                'src' => asset('images/memory-1.jpg'),
                'alt' => 'Class photo 2024',
                'caption' => 'Foto bersama kelas RPL 2024',
                'gridColumn' => 'span 4',
                'gridRow' => 'span 2',
            ],
            [
                'id' => 2,
                'src' => asset('images/memory-2.jpg'),
                'alt' => 'Coding session',
                'caption' => 'Sesi coding marathon',
                'gridColumn' => 'span 3',
                'gridRow' => 'span 3',
            ],
            [
                'id' => 3,
                'src' => asset('images/memory-3.jpg'),
                'alt' => 'Project presentation',
                'caption' => 'Presentasi project akhir',
                'gridColumn' => 'span 5',
                'gridRow' => 'span 2',
            ],
            [
                'id' => 4,
                'src' => asset('images/memory-4.jpg'),
                'alt' => 'Team collaboration',
                'caption' => 'Kolaborasi team',
                'gridColumn' => 'span 4',
                'gridRow' => 'span 3',
            ],
            [
                'id' => 5,
                'src' => asset('images/memory-5.jpg'),
                'alt' => 'Workshop event',
                'caption' => 'Workshop teknologi',
                'gridColumn' => 'span 4',
                'gridRow' => 'span 2',
            ],
            [
                'id' => 6,
                'src' => asset('images/memory-6.jpg'),
                'alt' => 'Field trip',
                'caption' => 'Kunjungan industri',
                'gridColumn' => 'span 4',
                'gridRow' => 'span 2',
            ],
            [
                'id' => 7,
                'src' => asset('images/memory-7.jpg'),
                'alt' => 'Graduation ceremony',
                'caption' => 'Acara kelulusan',
                'gridColumn' => 'span 6',
                'gridRow' => 'span 3',
            ],
            [
                'id' => 8,
                'src' => asset('images/memory-8.jpg'),
                'alt' => 'Celebration moment',
                'caption' => 'Momen perayaan',
                'gridColumn' => 'span 6',
                'gridRow' => 'span 2',
            ],
        ];

        return Inertia::render('Yearbook/Index', [
            'students' => $students,
            'comments' => $comments,
            'memories' => $memories,
        ]);
    }
}