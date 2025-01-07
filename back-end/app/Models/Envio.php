<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\AutoUuid;
use Illuminate\Support\Facades\DB;

class Envio extends Model
{
    use HasFactory, AutoUuid;

    protected $table = 'envios';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $casts = [
        'finished_at' => 'datetime',
    ];

    protected static function booted()
  {
    static::creating(function ($envio) {
      $envio->numero = DB::selectOne('SELECT NEXTVAL(seq_envios) AS nextval')->nextval;
    });
  }
}
