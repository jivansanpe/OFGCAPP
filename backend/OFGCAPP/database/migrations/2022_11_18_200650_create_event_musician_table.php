<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('event_musician', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('musician_id');
            $table->foreign('musician_id')->references('id')->on('musicians')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->unsignedBigInteger('event_id');
            $table->foreign('event_id')->references('id')->on('events')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->string('category');
            $table->string('special');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('event_musician');
    }
};
