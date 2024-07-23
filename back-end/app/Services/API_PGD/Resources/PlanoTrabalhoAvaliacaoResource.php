<?php

namespace App\Services\API_PGD\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PlanoTrabalhoAvaliacaoResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            "id_periodo_avaliativo"           => $this->id,
            "data_inicio_periodo_avaliativo"  => $this->data_inicio,
            "data_fim_periodo_avaliativo"     => $this->data_fim,
            "avaliacao_registros_execucao"    => $this->converteAvaliacao($this->avaliacao->nota ?? 5),
            "data_avaliacao_registros_execucao" => $this->avaliacao->data_avaliacao ?? null,
        ];
    }

    function converteAvaliacao($nota)
    {
      switch ($nota) {
        case 'Excepcional':
          return 1;
        case 'Alto desempenho':
          return 2;
        case 'Adequado':
          return 3;
        case 'Inadequado':
          return 4;
        case 'Não executado':
          return 5;
      }
    }
}
