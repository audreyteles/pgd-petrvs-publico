<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterCurriculumsProfissionaisTableChangeFkGrupoEspecializadoNull extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::table('curriculums_profissionais', function (Blueprint $table) {
      $table->foreignUuid('grupo_especializado_id')->nullable()->change();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::table('curriculums_profissionais', function (Blueprint $table) {
      $table->foreignUuid('grupo_especializado_id')->nullable(false)->change();
    });
  }
}
