<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Query\Expression;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AlterPlanoTrabalhoTableAddCriteriosAvaliacao extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('planos_trabalhos', function (Blueprint $table) {
            $table->json('criterios_avaliacao')->default(new Expression('(JSON_ARRAY())'))->comment("Critérios para avaliação");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('planos_trabalhos', function (Blueprint $table) {
            $table->dropColumn('criterios_avaliacao');
        });
    }
}
