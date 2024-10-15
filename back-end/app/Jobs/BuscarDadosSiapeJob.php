<?php

namespace App\Jobs;

use App\Exceptions\LogError;
use App\Jobs\Contratos\ContratoJobSchedule;
use App\Models\Tenant;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeServidor;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeServidores;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeUnidade;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeUnidades;
use App\Services\TenantConfigurationsService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\Middleware\WithoutOverlapping;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use App\Models\JobSchedule;

class BuscarDadosSiapeJob implements ShouldQueue, ContratoJobSchedule
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(private readonly ?string $tenantId = null)
    {
        Log::info("inicializando a busca dos dados do SIAPE. Tenant: " . $tenantId);
        
        $this->queue = 'siape_queue';
    }

    public static function getDescricao(): string
    {
        return 'Buscar Dados SIAPE';
    }

    public function handle(): void
    {
        ini_set('memory_limit', '-1');

        Log::info("Job BuscarDadosSiapeJob - Tenant {$this->tenantId}: START");
        
        $this->loadingTenantConfigurationMiddleware($this->tenantId);
        $config = config("integracao")["siape"];
        
        if(empty(trim($config["conectagov_chave"]))){
            Log::error("Job BuscarDadosSiapeJob Tenant {$this->tenantId}: Chave do ConectaGOV não informada");
            return;
        }

        $buscarDadosUnidadesSiape = new BuscarDadosSiapeUnidades($config["cpf"], $config["url"], $config["conectagov_chave"], $config["conectagov_senha"], $config);
        $buscarDadosUnidadesSiape->enviar();

        $buscarDadosUnidadeSiape = new BuscarDadosSiapeUnidade($config["cpf"], $config["url"], $config["conectagov_chave"], $config["conectagov_senha"], $config);
        $buscarDadosUnidadeSiape->enviar();

        $buscarDadosServidoresSiape = new BuscarDadosSiapeServidores($config["cpf"], $config["url"], $config["conectagov_chave"], $config["conectagov_senha"], $config);
        $buscarDadosServidoresSiape->enviar();
        
        $buscarDadosServidorSiape = new BuscarDadosSiapeServidor($config["cpf"], $config["url"], $config["conectagov_chave"], $config["conectagov_senha"], $config);
        $buscarDadosServidorSiape->enviar();

        Log::info("Job BuscarDadosSiapeJob Tenant {$this->tenantId} - END");
    }

    private function loadingTenantConfigurationMiddleware(string $tenantId): void
    {
        $tenantConfigurations = new TenantConfigurationsService();
        $tenantConfigurations->handle($tenantId);
    }
}
