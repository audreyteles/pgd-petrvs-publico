<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterIntegracaoServidoresTableChangeDataModificacaoType extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("ALTER TABLE integracao_servidores MODIFY data_modificacao DATETIME NULL DEFAULT NULL;");
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("ALTER TABLE integracao_servidores MODIFY data_modificacao VARCHAR(50) NULL DEFAULT NULL;");
    }
}
