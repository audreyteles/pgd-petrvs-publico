<?php

namespace App\Models;

use App\Models\ModelBase;

class AreaAtividadeExterna extends ModelBase
{
   
    protected $table = 'areas_atividades_externas';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome', /* varchar(256); NOT NULL; */// Nome da área
        'ativo', /* tinyint; NOT NULL; DEFAULT: '1'; */// area ativo ou inativo
        //'deleted_at', /* timestamp; */
    ];

    // Has
    public function historicoAtividadeExterna() { return $this->hasMany(HistoricoAtividadeExterna::class); }
    
}
