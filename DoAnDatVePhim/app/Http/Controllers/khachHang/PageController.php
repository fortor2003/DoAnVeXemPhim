<?php

namespace App\Http\Controllers\khachHang;

use App\Http\Controllers\Controller;
use App\Models\Ghe;
use App\Models\SuatChieu;
use App\Models\TaiKhoan;
use App\Services\khachHang\GheService;
use App\Services\khachHang\PageService;
use App\Services\khachHang\RapService;
use App\Services\khachHang\SuatChieuService;
use Illuminate\Http\Request;

class PageController extends Controller
{
    private $pageService;
    private $suatChieuService;
    private $rapService;
    private $gheService;

    public function __construct(PageService $pageService, SuatChieuService $suatChieuService, RapService $rapService, GheService $gheService)
    {
        $this->pageService = $pageService;
        $this->suatChieuService = $suatChieuService;
        $this->rapService = $rapService;
        $this->gheService = $gheService;
        $this->middleware('auth')->only(['datGhePage']);
    }

    public function trangChuPage()
    {
        $danhSachPhimHayNhatHomNay = $this->pageService->danhSachPhimHayNhatHomNay();
        $danhSachPhimDangChieu = $this->pageService->danhSachPhimDangChieu();
        $theLoai = $this->pageService->danhSachTheLoai();
        return view('khachHang.pages.trangChuPage', compact(['danhSachPhimHayNhatHomNay', 'danhSachPhimDangChieu', 'theLoai']));
    }

    public function dangNhapPage()
    {
        return view('nguoidung.page.dangNhapPage');
    }

    public function chiTietPhimPage($id)
    {
        $thongTinPhim = $this->pageService->thongTinPhim($id);
        $danhSachRap = $this->rapService->danhSachRap();
        $danhSachSuatChieu = $this->suatChieuService->danhSachSuatChieu($id, null, null);
        return view('khachHang.pages.chiTietPhimPage', compact('thongTinPhim', 'danhSachRap', 'danhSachSuatChieu'));
    }

    public function datVePage(Request $request)
    {
        $phimId = $request->get('phim_id');
        $danhSachPhimDangChieu = $this->pageService->danhSachPhimDangChieu();
        $danhSachRap = $this->rapService->danhSachRap();
        return view('khachHang.pages.datVePage', compact(['danhSachPhimDangChieu', 'danhSachRap', 'phimId']));
    }

    public function datGhePage(Request $request)
    {
        $suatChieuId = $request->query('suat_chieu_id');
        if ($suatChieuId) {
            SuatChieu::findOrFail($suatChieuId);
            $suatChieu = $this->suatChieuService->thongTinSuatChieu($suatChieuId);
            $giaVe = 90000;
            $danhSachHangGhe = $this->gheService->danhSachGhe($suatChieuId);
            return view('khachHang.pages.datGhePage', compact(['suatChieuId', 'suatChieu', 'giaVe', 'danhSachHangGhe']));
        } else {
            return redirect()->route('khachHang.datVePage');
        }
    }

    public function thanhToanPage()
    {
        return view('khachHang.pages.thanhToanPage');
    }

    public function hienThiVePage()
    {
        return view('khachHang.pages.hienThiVePage');
    }

    public function thongDiepPage(Request $request)
    {
        $message = $request->query('message');
        if ($message) {
            return view('khachHang.pages.thongDiepPage', compact('message'));
        } else {
            abort(404);
        }
    }
}
