<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocumentosAssinaturasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('documentos_assinaturas', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->dateTime('data_hora')->useCurrent()->comment("Data hora da assinatura");
            $table->text('assinatura')->comment("Hash da assinatura");
            // Chaves estrangeiras:
            $table->foreignUuid('documento_id')->onDelete('restrict')->onUpdate('cascade')->comment("Documento");
            $table->foreignUuid('usuario_id')->onDelete('restrict')->onUpdate('cascade')->comment("Usuário");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('documentos_assinaturas');
    }
}
