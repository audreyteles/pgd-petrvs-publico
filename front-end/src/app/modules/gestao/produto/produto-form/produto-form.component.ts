import { Component, Injector, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { EditableFormComponent } from "src/app/components/editable-form/editable-form.component";
import { InputSearchComponent } from "src/app/components/input/input-search/input-search.component";
import { ProdutoDaoService } from "src/app/dao/produto-dao.service";
import { UnidadeDaoService } from "src/app/dao/unidade-dao.service";
import { IIndexable } from "src/app/models/base.model";
import { Produto } from "src/app/models/produto.model";
import { PageFormBase } from "src/app/modules/base/page-form-base";

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.scss']
})

export class ProdutoFormComponent extends PageFormBase<Produto, ProdutoDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('unidade', { static: false }) public unidade?: InputSearchComponent;

  public unidadeDao: UnidadeDaoService;
  
  constructor(public injector: Injector) {
    super(injector, Produto, ProdutoDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.join = [
      "produtoProcessoCadeiaValor.cadeiaValorProcesso.cadeiaValor", "produtoProduto.produtoRelacionado", "produtoCliente.cliente", "produtoSolucoes.solucao"
    ];
    this.form = this.fh.FormBuilder({
      nome: { default: "" },
      nome_fantasia: { default: "" },
      descricao: { default: "" },
      url: { default: "" },
      tipo: { default: "" },
      unidade_id: { default: "" },
      produto_processo_cadeia_valor: { default: [] },
      produto_produto: { default: [] },
      produto_cliente: { default: [] },
      produto_solucoes: { default: [] },
    });
  }


  public async loadData(entity: Produto, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    entity.unidade_id = entity.unidade?.id || this.auth.unidade!.id;
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public async initializeData(form: FormGroup) {
    form.patchValue(new Produto());
    this.entity = new Produto();

    await this.loadData(this.entity, this.form!);
  }

  public saveData(form: IIndexable): Promise<Produto> {
    return new Promise<Produto>((resolve, reject) => {
      const produto = this.util.fill(new Produto(), this.entity!);
      resolve(this.util.fillForm(produto, this.form!.value));
    });
  }
}