<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterCurriculunsProfissionaisTableModifyCentroTreinamentoId extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::table('curriculuns_profissionais', function (Blueprint $table) {
      $table->foreignUuid('centro_treinamento_id')->nullable()->change();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::table('curriculuns_profissionais', function (Blueprint $table) {
      $table->foreignUuid('centro_treinamento_id')->nullable(false)->change();
    });
  }
};
