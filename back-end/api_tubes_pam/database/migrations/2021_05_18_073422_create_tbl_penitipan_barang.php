<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblPenitipanBarang extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_penitipan_barang', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('namaPemilik');
            $table->string('NIKPemiik');
            $table->string('alamatRumah');
            $table->integer('noTelfon');
            $table->string('provinsi');
            $table->string('kota');
            $table->string('kodePos');
            $table->string('namaBarang');   
            $table->string('merekbarang');   
            $table->string('warnaBarang');   
            $table->string('jenisBarang');
            $table->string('noSeriBarang');  
            $table->date('batasPenitipan');
            $table->string('catatan');
            $table->enum('status', ['prose', 'diTolak', 'diTerima'])->default('proses');
            $table->boolean('confirmed')->default(false);
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('user_id')->references('id')->on('tbl_users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tbl_penitipan_barang');
    }
}
