<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role', // IMPORTANT: Keep this here
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'role' => 'string', // IMPORTANT: Cast the role column
        ];
    }

    // Role check methods
    public function isAdmin(): bool
    {
        // The role is defined in your migration as: 'admin', 'staff', 'user'
        return $this->role === 'admin';
    }

    public function isStaff(): bool
    {
        // Staff role gives access to the staff portal. Admin also gets staff access.
        return in_array($this->role, ['staff', 'admin']);
    }

    public function isUser(): bool
    {
        return $this->role === 'user';
    }

    // Role scope methods
    public function scopeAdmins($query)
    {
        return $query->where('role', 'admin');
    }

    public function scopeStaffUsers($query)
    {
        return $query->whereIn('role', ['staff', 'admin']);
    }

    public function scopeRegularUsers($query)
    {
        return $query->where('role', 'user');
    }
}