<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlanosTrabalhosConsolidacoesAtividadesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('planos_trabalhos_consolidacoes_atividades', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->json('snapshot')->comment("Snapshot do registro de atividades");
            $table->dateTime('data_conclusao')->comment("Data e hora da conclusao");
            //Chaves estrangeiras
            $table->uuid('plano_trabalho_consolidacao_id')->nullable()->comment("Consolidação do Plano de Trabalho à qual se refere o status");
            $table->uuid('atividade_id')->nullable()->comment("Atividade à qual se refere o status");
            // Chaves estrangeiras:
            $table->foreign('plano_trabalho_consolidacao_id', 'fk_plan_trb_cons_id_plan_trb_cons_id')->references('id')->on('planos_trabalhos_consolidacoes')->onDelete('restrict')->onUpdate('cascade');
            $table->foreign('atividade_id', 'fk_atividades_id_atividades_id')->references('id')->on('atividades')->onDelete('restrict')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('status_justificativas');
    }
}
