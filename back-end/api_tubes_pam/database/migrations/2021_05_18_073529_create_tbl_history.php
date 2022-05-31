<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblHistory extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_history', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('PenitipanKendaraan_id')->default(null);
            $table->unsignedBigInteger('PenitipanPerhiasan_id')->default(null);
            $table->unsignedBigInteger('PenitipanBarang_id')->default(null);
            $table->unsignedBigInteger('PenitipanRumah_id')->default(null);
            $table->boolean('done')->default(false);
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('user_id')->references('id')->on('tbl_users')->onDelete('cascade');
            $table->foreign('PenitipanKendaraan_id')->references('id')->on('tbl_penitipan_kendaraan');
            $table->foreign('PenitipanPerhiasan_id')->references('id')->on('tbl_penitipan_perhiasan');
            $table->foreign('PenitipanBarang_id')->references('id')->on('tbl_penitipan_barang');
            $table->foreign('PenitipanRumah_id')->references('id')->on('tbl_penitipan_rumah');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tbl_history');
    }
}
