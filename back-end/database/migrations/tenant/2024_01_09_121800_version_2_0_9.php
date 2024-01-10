<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Tenant;
use App\Traits\Version;
use Illuminate\Support\Facades\DB;

class Version209 extends Migration
{
    use Version;

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $this->version("2.0.9");
    }

    /**
     * Reverse the migrations. 
     *
     * @return void
     */
    public function down()
    {
        throw new Exception("Impossível retornar para versões já atualizadas");
    }
}
