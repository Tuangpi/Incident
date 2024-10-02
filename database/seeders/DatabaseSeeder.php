<?php

namespace Database\Seeders;

use App\Models\BugType;
use App\Models\Company;
use App\Models\Customer;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        User::create([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('asdf1234'),
        ]);

        $company = Company::create([
            'name' => 'Sozo',
        ]);

        Customer::create([
            'email' => 'customer@gmail.com',
            'password' => bcrypt('asdf1234'),
            'company_id' => $company->id,
        ]);

        $bugTypes = [
            ['name' => 'New Feature Request'],
            ['name' => 'Bug'],
            ['name' => 'Issue'],
            ['name' => 'Enhancement']
        ];

        foreach ($bugTypes as $type) {
            BugType::create($type);
        }
    }
}
