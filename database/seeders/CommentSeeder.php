<?php
// database/seeders/CommentSeeder.php

namespace Database\Seeders;

use App\Models\Comment;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $comments = [
            [
                'name' => 'Ahmad Rahman',
                'message' => 'Selamat untuk teman-teman RPL Class 2024! Semoga sukses di masa depan dan jangan lupa untuk selalu belajar hal baru.',
                'emoji' => '🎉',
                'is_approved' => true,
            ],
            [
                'name' => 'Siti Nurhaliza',
                'message' => 'Terima kasih atas semua kenangan indah selama 3 tahun ini. Kita telah belajar banyak bersama dan tumbuh menjadi lebih baik.',
                'emoji' => '❤️',
                'is_approved' => true,
            ],
            [
                'name' => 'Budi Santoso',
                'message' => 'Coding marathon yang kita lakukan akan selalu menjadi kenangan tak terlupakan. Keep coding, guys!',
                'emoji' => '💪',
                'is_approved' => true,
            ],
            [
                'name' => 'Maya Sari',
                'message' => 'Semoga kita semua bisa berkontribusi positif untuk dunia teknologi. Sampai jumpa di dunia nyata!',
                'emoji' => '🌟',
                'is_approved' => true,
            ],
            [
                'name' => 'Rizki Pratama',
                'message' => 'Terima kasih untuk semua bantuan dan dukungan selama ini. Sukses selalu untuk semua!',
                'emoji' => '👍',
                'is_approved' => true,
            ],
        ];

        foreach ($comments as $comment) {
            Comment::create($comment);
        }
    }
}
