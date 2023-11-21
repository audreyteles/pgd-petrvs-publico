<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DeleteRespostasQuestionariosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('respostas_questionarios');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::create('respostas_questionarios', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->dateTime('data_respostas')->comment("Data e hora das respostas");
            $table->tinyInteger('editavel')->default(1)->comment("Possibilidade de editar as respostas");
            $table->json('respostas')->nullable()->comment("Respostas do questionário");
            // Chaves estrangeiras:
            $table->foreignUuid('questionario_id')->constrained("questionarios")->onDelete('restrict')->onUpdate('cascade')->comment("FK Questionario ID");
            $table->foreignUuid('usuario_id')->constrained("usuarios")->onDelete('restrict')->onUpdate('cascade')->unique()->comment('Usuário');
        });
    }
}
