<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlanejamentosObjetivosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('planejamentos_objetivos', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->integer('sequencia')->default(0)->comment("Sequência utilizada para ordenar os objetivos");
            $table->string('fundamentacao', 256)->comment("Fundamentação do objetivo");
            $table->string('nome', 256)->comment("Nome do objetivo");
            $table->text('path')->nullable()->comment('Path dos nós pais separados por /, ou NULL caso sejam nós raiz');
            // Chaves estrangeiras:
            $table->foreignUuid('planejamento_id')->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Planejamento ao qual se refere o objetivo");
            $table->foreignUuid('eixo_tematico_id')->constrained("eixos_tematicos")->onDelete('restrict')->onUpdate('cascade')->comment("Eixo temático ao qual se refere o objetivo");
            $table->foreignUuid('objetivo_pai_id')->nullable()->constrained("planejamentos_objetivos")->onDelete('restrict')->onUpdate('cascade')->comment("Objetivo pai ao qual se refere o objetivo");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('planejamentos_objetivos');

    }
}
