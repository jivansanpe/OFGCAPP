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
        Schema::create('pieces', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('author_id');
            $table->foreign('author_id')->references('id')->on('authors')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->unsignedBigInteger('event_id');
            $table->foreign('event_id')->references('id')->on('events')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->string('name');
            $table->longText('description');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pieces');
    }
};
