<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Unidade;
use App\Models\Entidade;
use App\Models\AtividadeTarefa;

class TipoTarefa extends ModelBase
{
  protected $table = 'tipos_tarefas';

  protected $with = [];

  public $fillable = [ /* TYPE; NULL?; DEFAULT?; */ // COMMENT
    'nome', /* varchar(256); NOT NULL; */ // Nome do tipo de tarefa
    'tempo_estimado', /* double(8,2); NOT NULL; */ // Tempo estimado para a execução do tipo de tarefa (Horas decimais)
    'documental', /* tinyint; NOT NULL; */ // Se o tipo de tarefa requer obrigatoriamente um documento
    'comentario', /* text; */ // Comentário predefinida para o tipo de tarefa
    //'deleted_at', /* timestamp; */
  ];
  //Has
  public function tarefas()
  {
    return $this->hasMany(AtividadeTarefa::class);
  }
  // Belongs
}
