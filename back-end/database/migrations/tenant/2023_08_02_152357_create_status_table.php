<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStatusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('status', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->enum('codigo', ['ATIVO', 'AVALIADO', 'CANCELADO', 'CONCLUIDO', 'HOMOLOGANDO', 'INCLUIDO', 'INICIADO', 'RECORRIDO', 'SUSPENSO'])->comment("Status do artefato (plano de entregas, plano de trabalho ou atividade)");
            $table->text('justificativa')->comment("Justificativa da mudança para este status");
            //Chaves estrangeiras
            $table->foreignUuid('plano_entrega_id')->nullable()->constrained("planos_entregas")->onDelete('restrict')->onUpdate('cascade')->comment("Plano de Entregas ao qual se refere o status");
            $table->foreignUuid('plano_trabalho_id')->nullable()->constrained("planos_trabalhos")->onDelete('restrict')->onUpdate('cascade')->comment("Plano de Trabalho ao qual se refere o status");
            $table->foreignUuid('plano_trabalho_consolidacao_id')->nullable()->constrained("planos_trabalhos_consolidacoes")->onDelete('restrict')->onUpdate('cascade')->comment("Consolidação do Plano de Trabalho à qual se refere o status");
            $table->foreignUuid('atividade_id')->nullable()->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Atividade à qual se refere o status");
            $table->foreignUuid('usuario_id')->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Usuário que realizou a mudança de status");
        });
        // Cria o campo status_id nas tabelas 'planos_entregas', 'planos_trabalhos', 'atividades'e 'planos_trabalhos_consolidacoes', devido à referência cruzada
        Schema::table('planos_entregas', function (Blueprint $table) {
            $table->foreignUuid('status_id')->nullable()->constrained("status")->onDelete('restrict')->onUpdate('cascade')->comment("Status atual do Plano de Entregas");
        });
        Schema::table('planos_trabalhos', function (Blueprint $table) {
            $table->foreignUuid('status_id')->nullable()->constrained("status")->onDelete('restrict')->onUpdate('cascade')->comment("Status atual do Plano de Trabalho");
        });
        Schema::table('planos_trabalhos_consolidacoes', function (Blueprint $table) {
            $table->foreignUuid('status_id')->nullable()->constrained("status")->onDelete('restrict')->onUpdate('cascade')->comment("Status atual da Consolidação do Plano de Trabalho");
        });
        Schema::table('atividades', function (Blueprint $table) {
            $table->foreignUuid('status_id')->nullable()->constrained("status")->onDelete('restrict')->onUpdate('cascade')->comment("Status atual da Atividade");
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Apaga o campo status_id das tabelas 'atividades', 'planos_trabalhos_consolidacoes', 'planos_trabalhos' e 'planos_entregas', devido à referência cruzada
        Schema::table('atividades', function (Blueprint $table) {
            $table->dropConstrainedForeignId('status_id');
        });
        Schema::table('planos_trabalhos_consolidacoes', function (Blueprint $table) {
            $table->dropConstrainedForeignId('status_id');
        });
        Schema::table('planos_trabalhos', function (Blueprint $table) {
            $table->dropConstrainedForeignId('status_id');
        });
        Schema::table('planos_entregas', function (Blueprint $table) {
            $table->dropConstrainedForeignId('status_id');
        });
        Schema::dropIfExists('status');
    }
}
