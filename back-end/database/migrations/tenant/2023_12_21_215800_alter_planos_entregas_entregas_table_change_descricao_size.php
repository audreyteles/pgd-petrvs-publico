<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterPlanosEntregasEntregasTableChangeDescricaoSize extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("ALTER TABLE planos_entregas_entregas MODIFY descricao TEXT NOT NULL;");
    }

    public function down()
    {
        DB::statement("ALTER TABLE planos_entregas_entregas MODIFY descricao VARCHAR(256) NOT NULL DEFAULT '';");
    }
}
