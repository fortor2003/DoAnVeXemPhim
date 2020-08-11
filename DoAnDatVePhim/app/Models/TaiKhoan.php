<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class TaiKhoan extends Authenticatable implements MustVerifyEmail
{
    use Notifiable;

    protected $table = 'tai_khoan';
    protected $primaryKey = 'id';
    public $incrementing = true;
    protected $keyType = 'integer';
    const CREATED_AT = 'thoi_diem_tao';
    const UPDATED_AT = 'thoi_diem_cap_nhat';
    protected $fillable = [
        'ho_ten', 'email', 'mat_khau', 'loai_vai_tro'
    ];
    protected $hidden = [
        'mat_khau', 'remember_token',
    ];
    protected $casts = [
        'thoi_diem_kich_hoat' => 'datetime',
        'thoi_diem_tao' => 'datetime:Y-m-d H:i:s',
        'thoi_diem_cap_nhat' => 'datetime:Y-m-d H:i:s'
    ];
    public function hasVerifiedEmail()
    {
        return $this->thoi_diem_kich_hoat !== null;
    }

    public function markEmailAsVerified()
    {
        $this->thoi_diem_kich_hoat = now();
        $this->save();
    }

    public function getAuthPassword()
    {
        return $this->mat_khau;
    }

}