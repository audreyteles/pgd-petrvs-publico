<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMateriasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('materias', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->string('nome', 256)->comment("Nome do curso");
            $table->tinyInteger('horas_aula')->nullable()->default(0)->comment("Horas aula da matéria");
            $table->tinyInteger('ativo')->default(1)->comment("Curso ativo ou inativo");
            // Chaves estrangeiras:
            // $table->foreignUuid('area_materia_id')->constrained("areas_conhecimentos")->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('curso_id')->constrained("cursos")->onDelete('restrict')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('materias');
    }
}
