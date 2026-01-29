<?php
// database/seeders/StudentSeeder.php

namespace Database\Seeders;

use App\Models\Student;
use Illuminate\Database\Seeder;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $students = [
            [
                'name' => 'Ahmad Rizki Pratama',
                'nickname' => 'Rizki',
                'role' => 'Full Stack Developer',
                'github' => 'https://github.com/ahmadrizki',
                'instagram' => 'https://instagram.com/ahmadrizki',
                'portrait' => 'students/rizki.jpg',
                'bio' => 'Passionate about creating beautiful and functional web applications.',
                'order' => 1,
            ],
            [
                'name' => 'Siti Nurhaliza',
                'nickname' => 'Siti',
                'role' => 'Frontend Developer',
                'github' => 'https://github.com/sitinur',
                'instagram' => 'https://instagram.com/sitinur',
                'portrait' => 'students/siti.jpg',
                'bio' => 'UI/UX enthusiast with a love for clean and intuitive design.',
                'order' => 2,
            ],
            [
                'name' => 'Budi Santoso',
                'nickname' => 'Budi',
                'role' => 'Backend Developer',
                'github' => 'https://github.com/budisant',
                'instagram' => 'https://instagram.com/budisant',
                'portrait' => 'students/budi.jpg',
                'bio' => 'Server-side programming wizard, database optimization expert.',
                'order' => 3,
            ],
            [
                'name' => 'Dewi Lestari',
                'nickname' => 'Dewi',
                'role' => 'Mobile Developer',
                'github' => 'https://github.com/dewiles',
                'instagram' => 'https://instagram.com/dewiles',
                'portrait' => 'students/dewi.jpg',
                'bio' => 'Flutter and React Native developer, creating cross-platform magic.',
                'order' => 4,
            ],
            [
                'name' => 'Eko Prasetyo',
                'nickname' => 'Eko',
                'role' => 'DevOps Engineer',
                'github' => 'https://github.com/ekopras',
                'instagram' => 'https://instagram.com/ekopras',
                'portrait' => 'students/eko.jpg',
                'bio' => 'Infrastructure automation specialist, CI/CD pipeline master.',
                'order' => 5,
            ],
            [
                'name' => 'Fitri Handayani',
                'nickname' => 'Fitri',
                'role' => 'UI/UX Designer',
                'github' => 'https://github.com/fitrihan',
                'instagram' => 'https://instagram.com/fitrihan',
                'portrait' => 'students/fitri.jpg',
                'bio' => 'Designing delightful user experiences with attention to detail.',
                'order' => 6,
            ],
            [
                'name' => 'Gilang Ramadhan',
                'nickname' => 'Gilang',
                'role' => 'Game Developer',
                'github' => 'https://github.com/gilangram',
                'instagram' => 'https://instagram.com/gilangram',
                'portrait' => 'students/gilang.jpg',
                'bio' => 'Unity and Unreal Engine developer, bringing games to life.',
                'order' => 7,
            ],
            [
                'name' => 'Hana Safitri',
                'nickname' => 'Hana',
                'role' => 'Data Analyst',
                'github' => 'https://github.com/hanasaf',
                'instagram' => 'https://instagram.com/hanasaf',
                'portrait' => 'students/hana.jpg',
                'bio' => 'Turning data into actionable insights with Python and R.',
                'order' => 8,
            ],
        ];

        foreach ($students as $student) {
            Student::create($student);
        }
    }
}