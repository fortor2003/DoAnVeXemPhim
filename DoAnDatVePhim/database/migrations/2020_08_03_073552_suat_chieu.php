<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class SuatChieu extends Migration
{
    // Tên table trong cơ sở dữ liệu
    private $ten_bang = 'SUAT_CHIEU';
    private $chu_thich_bang = 'suất chieu';

    public function up()
    {
        // Tạo cấu trúc của bảng
        Schema::create($this->ten_bang, function (Blueprint $table) {
            $table->bigIncrements('id')->comment('ID');
            $table->unsignedBigInteger('phim_id');
            $table->unsignedBigInteger('phong_chieu_id');
            $table->date('ngay_chieu');
            $table->unsignedBigInteger('gio_bat_dau_id');
            $table->unsignedBigInteger('gio_ket_thuc_id');
            $table->boolean('giao_ngay')->default(0)->comment('Nếu = 1 => phim được chiều từ hh:mm đến hh:mm ngày hôm sau');
            $table->dateTime('thoi_diem_tao')->useCurrent();
            $table->dateTime('thoi_diem_cap_nhat')->useCurrent();
            $table->unique(['phim_id', 'phong_chieu_id', 'ngay_chieu', 'gio_bat_dau_id'], 'SUAT_CHIEU_UNQ_IDX');
        });
        // Tạo comment cho bảng
//        DB::statement("ALTER TABLE `$this->ten_bang` comment '$this->chu_thich_bang'");
    }

    public function down()
    {
        Schema::drop($this->ten_bang);
    }
}