import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { IIndexable } from 'src/app/models/base.model';

@Component({
    selector: 'gantt-templates',
    templateUrl: './gantt-templates.component.html',
    styleUrls: ['./gantt-templates.component.scss']
})
export class GanttTemplatesComponent implements OnInit {
    @Input() id: string = "";
    @Input() set hasTime(value: boolean) {
        if(this._hasTime != value) {
            this._hasTime = value;
            this.buildTemplates();
        }
    }
    get hasTime(): boolean {
        return this._hasTime;
    }
    @Input() set hasCost(value: boolean) {
        if(this._hasCost != value) {
            this._hasCost = value;
            this.buildTemplates();
        }
    }
    get hasCost(): boolean {
        return this._hasCost;
    }

    constructor() { }

    public startComment = "";
    public endComment = "";
    public templates: IIndexable = {};

    public _hasTime: boolean = false;
    public _hasCost: boolean = false;

    ngOnInit(): void {
        this.buildTemplates();
    }

    public buildTemplates() {
        const workSpace = "workSpace" + this.id;
        this.templates["GANTBUTTONS"] =
            `<div class="ganttButtonBar noprint">
                <div class="buttons">
                    <button onclick="$('#` + workSpace + `').trigger('undo.gantt');return false;" class="button textual icon requireCanWrite" title="undo"><span class="teamworkIcon">&#39;</span></button>
                    <button onclick="$('#` + workSpace + `').trigger('redo.gantt');return false;" class="button textual icon requireCanWrite" title="redo"><span class="teamworkIcon">&middot;</span></button>
                    <span class="ganttButtonSeparator requireCanWrite requireCanAdd"></span>
                    <button onclick="$('#` + workSpace + `').trigger('addAboveCurrentTask.gantt');return false;" class="button textual icon requireCanWrite requireCanAdd" title="insert above"><span class="teamworkIcon">l</span></button>
                    <button onclick="$('#` + workSpace + `').trigger('addBelowCurrentTask.gantt');return false;" class="button textual icon requireCanWrite requireCanAdd" title="insert below"><span class="teamworkIcon">X</span></button>
                    <span class="ganttButtonSeparator requireCanWrite requireCanInOutdent"></span>
                    <button onclick="$('#` + workSpace + `').trigger('outdentCurrentTask.gantt');return false;" class="button textual icon requireCanWrite requireCanInOutdent" title="un-indent task"><span class="teamworkIcon">.</span></button>
                    <button onclick="$('#` + workSpace + `').trigger('indentCurrentTask.gantt');return false;" class="button textual icon requireCanWrite requireCanInOutdent" title="indent task"><span class="teamworkIcon">:</span></button>
                    <span class="ganttButtonSeparator requireCanWrite requireCanMoveUpDown"></span>
                    <button onclick="$('#` + workSpace + `').trigger('moveUpCurrentTask.gantt');return false;" class="button textual icon requireCanWrite requireCanMoveUpDown" title="move up"><span class="teamworkIcon">k</span></button>
                    <button onclick="$('#` + workSpace + `').trigger('moveDownCurrentTask.gantt');return false;" class="button textual icon requireCanWrite requireCanMoveUpDown" title="move down"><span class="teamworkIcon">j</span></button>
                    <span class="ganttButtonSeparator requireCanWrite requireCanDelete"></span>
                    <button onclick="$('#` + workSpace + `').trigger('deleteFocused.gantt');return false;" class="button textual icon delete requireCanWrite" title="Elimina"><span class="teamworkIcon">&cent;</span></button>
                    <span class="ganttButtonSeparator" style="display:none;"></span>
                    <button onclick="$('#` + workSpace + `').trigger('expandAll.gantt');return false;" class="button textual icon " title="Expandir todos"><span class="teamworkIcon">6</span></button>
                    <button onclick="$('#` + workSpace + `').trigger('collapseAll.gantt'); return false;" class="button textual icon " title="Contrair todos"><span class="teamworkIcon">5</span></button>
                    <span class="ganttButtonSeparator"></span>
                    <button onclick="$('#` + workSpace + `').trigger('zoomMinus.gantt'); return false;" class="button textual icon " title="Almentar zoom"><span class="teamworkIcon">)</span></button>
                    <button onclick="$('#` + workSpace + `').trigger('zoomPlus.gantt');return false;" class="button textual icon " title="Diminuir zoom"><span class="teamworkIcon">(</span></button>
                    <span class="ganttButtonSeparator"></span>
                    <button onclick="$('#` + workSpace + `').trigger('print.gantt');return false;" class="button textual icon " title="Imprimir"><span class="teamworkIcon">p</span></button>
                    <span class="ganttButtonSeparator"></span>
                    <button onclick="ge.gantt.showCriticalPath=!ge.gantt.showCriticalPath; ge.redraw();return false;" class="button textual icon requireCanSeeCriticalPath" title="CRITICAL_PATH"><span class="teamworkIcon">&pound;</span></button>
                    <span class="ganttButtonSeparator requireCanSeeCriticalPath"></span>
                    <button onclick="$('#` + workSpace + `').trigger('splitter.gantt', [.1]);return false;" class="button textual icon"><span class="teamworkIcon">F</span></button>
                    <button onclick="$('#` + workSpace + `').trigger('splitter.gantt', [50]);return false;" class="button textual icon"><span class="teamworkIcon">O</span></button>
                    <button onclick="$('#` + workSpace + `').trigger('splitter.gantt', [100]);return false;" class="button textual icon"><span class="teamworkIcon">R</span></button>
                    <span class="ganttButtonSeparator"></span>
                    <button onclick="$('#` + workSpace + `').trigger('fullScreen.gantt');return false;" class="button textual icon" style="display:none;" title="FULLSCREEN" id="fullscrbtn"><span class="teamworkIcon">@</span></button>
                    <button onclick="ge.element.toggleClass('colorByStatus' );return false;" class="button textual icon" style="display:none;"><span class="teamworkIcon">&sect;</span></button>
                    <button onclick="editResources();" class="button textual requireWrite" title="edit resources" style="display:none;"><span class="teamworkIcon">M</span></button>
                    <button onclick="saveGanttOnServer();" class="button first big requireWrite" style="display:none;" title="Save">Save</button>
                    <button onclick='newProject();' class='button requireWrite newproject' style="display:none;"><em>clear project</em></button>
                    <button class="button login" title="login/enroll" onclick="loginEnroll($(this));" style="display:none;">login/enroll</button>
                    <button class="button opt collab" title="Start with Twproject" onclick="collaborate($(this));" style="display:none;"><em>collaborate</em></button>
                    <a href="https://gantt.twproject.com/" target="_blank" style="position:absolute;right:0px;"><img src="assets/gantt/res/twGanttLogo.png" alt="Twproject" align="absmiddle" style="max-width: 100px; margin-top: 5px; padding-right: 15px"></a>
                </div>
            </div>`;
        this.templates["TASKSEDITHEAD"] = 
            `<table class="gdfTable" cellspacing="0" cellpadding="0">
                <thead>
                    <tr style="height:40px">
                        <th class="gdfColHeader" style="width:35px; border-right: none;"></th>
                        <th class="gdfColHeader" style="width:25px; display: none;"></th>
                        <th class="gdfColHeader gdfResizable" style="width:100px; display: none;">code/short name</th>
                        <th class="gdfColHeader gdfResizable" style="width:300px;">Nome</th>
                        ` + this.tableCostTemplate("HEAD") + `
                        <th class="gdfColHeader" align="center" style="width:17px; display: none;" title="Inicio é um marco."><span class="teamworkIcon" style="font-size: 8px;">^</span></th>
                        <th class="gdfColHeader gdfResizable" style="width:80px;">Início</th>
                        <th class="gdfColHeader" align="center" style="width:17px; display: none;" title="Termino é um marco."><span class="teamworkIcon" style="font-size: 8px;">^</span></th>
                        <th class="gdfColHeader gdfResizable" style="width:80px;">Fim</th>
                        <th class="gdfColHeader gdfResizable" style="width:50px;">Dur.</th>
                        <th class="gdfColHeader gdfResizable" style="width:20px;">%</th>
                        <th class="gdfColHeader gdfResizable requireCanSeeDep" style="width:50px;">Dependência</th>
                        <th class="gdfColHeader gdfResizable" style="width:1000px; text-align: left; padding-left: 10px;">Recursos</th>
                    </tr>
                </thead>
            </table>`;
        this.templates["TASKROW"] =
            `<tr id="tid_(#=obj.id#)" taskId="(#=obj.id#)" class="taskEditRow (#=obj.isParent()?'isParent':''#) (#=obj.collapsed?'collapsed':''#)" level="(#=level#)">
                <th class="gdfCell edit" align="right" style="cursor:pointer;"><span class="taskRowIndex">(#=obj.getRow()+1#)</span> <span class="teamworkIcon" style="font-size:12px;">e</span></th>
                <td class="gdfCell noClip" align="center" style="display: none;"><div class="taskStatus cvcColorSquare" status="(#=obj.status#)"></div></td>
                <td class="gdfCell" style="display: none;"><input type="text" name="code" value="(#=obj.code?obj.code:''#)" placeholder="code/short name"></td>
                <td class="gdfCell indentCell" style="padding-left:(#=obj.level*10+18#)px;"><div class="exp-controller" align="center"></div><input type="text" name="name" value="(#=obj.name#)" placeholder="name"></td>
                ` + this.tableCostTemplate("ROW") + `
                <td class="gdfCell" align="center" style="display: none;"><input type="checkbox" name="startIsMilestone"></td>
                <td class="gdfCell"><input type="text" name="start" value="" class="date"></td>
                <td class="gdfCell" align="center" style="display: none;"><input type="checkbox" name="endIsMilestone"></td>
                <td class="gdfCell"><input type="text" name="end" value="" class="date"></td>
                <td class="gdfCell"><input type="text" name="duration" autocomplete="off" value="(#=obj.duration#)"></td>
                <td class="gdfCell"><input type="text" name="progress" class="validated" entrytype="PERCENTILE" autocomplete="off" value="(#=obj.progress?obj.progress:''#)" (#=obj.progressByWorklog?"readOnly":""#)></td>
                <td class="gdfCell requireCanSeeDep"><input type="text" name="depends" autocomplete="off" value="(#=obj.depends#)" (#=obj.hasExternalDep?"readonly":""#)></td>
                <td class="gdfCell taskAssigs">(#=obj.getAssigsResources()#)</td>
            </tr>`;
        this.templates["TASKEMPTYROW"] =
            `<tr class="taskEditRow emptyRow">
                <th class="gdfCell" align="right"></th>
                <td class="gdfCell noClip" style="display: none;" align="center"></td>
                <td class="gdfCell" style="display: none;"></td>
                <td class="gdfCell"></td>
                ` + this.tableCostTemplate("EMPTY") + `
                <td class="gdfCell" style="display: none;"></td>
                <td class="gdfCell"></td>
                <td class="gdfCell" style="display: none;"></td>
                <td class="gdfCell"></td>
                <td class="gdfCell"></td>
                <td class="gdfCell"></td>
                <td class="gdfCell requireCanSeeDep"></td>
                <td class="gdfCell"></td>
            </tr>`;
        this.templates["TASKBAR"] = 
            `<div class="taskBox taskBoxDiv" taskId="(#=obj.id#)">
                <div class="layout (#=obj.hasExternalDep?'extDep':''#)">
                    <div class="taskStatus" status="(#=obj.status#)"></div>
                    <div class="taskProgress" style="width:(#=obj.progress>100?100:obj.progress#)%; background-color:(#=obj.progress>100?'red':'rgb(153,255,51);'#);"></div>
                    <div class="milestone (#=obj.startIsMilestone?'active':''#)"></div>
                    <div class="taskLabel"></div>
                    <div class="milestone end (#=obj.endIsMilestone?'active':''#)"></div>
                </div>
            </div>`;
        this.templates["CHANGE_STATUS"] = 
            `<div class="taskStatusBox">
                <div class="taskStatus cvcColorSquare" status="STATUS_ACTIVE" title="Active"></div>
                <div class="taskStatus cvcColorSquare" status="STATUS_DONE" title="Completed"></div>
                <div class="taskStatus cvcColorSquare" status="STATUS_FAILED" title="Failed"></div>
                <div class="taskStatus cvcColorSquare" status="STATUS_SUSPENDED" title="Suspended"></div>
                <div class="taskStatus cvcColorSquare" status="STATUS_WAITING" title="Waiting" style="display: none;"></div>
                <div class="taskStatus cvcColorSquare" status="STATUS_UNDEFINED" title="Undefined"></div>
            </div>`;
        this.templates["TASK_EDITOR"] =
            `<div class="ganttTaskEditor">
                <h2 class="taskData">Task editor</h2>
                <table cellspacing="1" cellpadding="5" width="100%" class="taskData tableGantt" border="0">
                    <tr>
                        <td width="200" style="height: 80px" valign="top">
                            <label for="code">code/short name</label><br>
                            <input type="text" name="code" id="code" value="" size=15 class="formElements" autocomplete='off' maxlength=255 style='width:100%' oldvalue="1">
                        </td>
                        <td colspan="3" valign="top"><label for="name" class="required">name</label><br><input type="text" name="name" id="name" class="formElements" autocomplete='off' maxlength=255 style='width:100%' value="" required="true" oldvalue="1"></td>
                    </tr>
                    <tr class="dateRow">
                        <td nowrap="">
                            <div style="position:relative">
                                <label for="start">start</label>&nbsp;&nbsp;&nbsp;&nbsp;
                                <input type="checkbox" id="startIsMilestone" name="startIsMilestone" value="yes"> &nbsp;<label for="startIsMilestone">is milestone</label>&nbsp;
                                <br><input type="text" name="start" id="start" size="8" class="formElements dateField validated date" autocomplete="off" maxlength="255" value="" oldvalue="1" entrytype="DATE">
                                <span title="calendar" id="starts_inputDate" class="teamworkIcon openCalendar" onclick="$(this).dateField({inputField:$(this).prevAll(':input:first'),isSearchField:false});">m</span>
                            </div>
                        </td>
                        <td nowrap="">
                            <label for="end">End</label>&nbsp;&nbsp;&nbsp;&nbsp;
                            <input type="checkbox" id="endIsMilestone" name="endIsMilestone" value="yes"> &nbsp;<label for="endIsMilestone">is milestone</label>&nbsp;
                            <br><input type="text" name="end" id="end" size="8" class="formElements dateField validated date" autocomplete="off" maxlength="255" value="" oldvalue="1" entrytype="DATE">
                            <span title="calendar" id="ends_inputDate" class="teamworkIcon openCalendar" onclick="$(this).dateField({inputField:$(this).prevAll(':input:first'),isSearchField:false});">m</span>
                        </td>
                        <td nowrap="">
                            <label for="duration" class=" ">Days</label><br>
                            <input type="text" name="duration" id="duration" size="4" class="formElements validated durationdays" title="Duration is in working days." autocomplete="off" maxlength="255" value="" oldvalue="1" entrytype="DURATIONDAYS">&nbsp;
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <label for="status" class=" ">status</label><br>
                            <select id="status" name="status" class="taskStatus" status="(#=obj.status#)" onchange="$(this).attr('STATUS',$(this).val());">
                                <option value="STATUS_ACTIVE" class="taskStatus" status="STATUS_ACTIVE">active</option>
                                <option value="STATUS_WAITING" class="taskStatus" status="STATUS_WAITING">suspended</option>
                                <option value="STATUS_SUSPENDED" class="taskStatus" status="STATUS_SUSPENDED">suspended</option>
                                <option value="STATUS_DONE" class="taskStatus" status="STATUS_DONE">completed</option>
                                <option value="STATUS_FAILED" class="taskStatus" status="STATUS_FAILED">failed</option>
                                <option value="STATUS_UNDEFINED" class="taskStatus" status="STATUS_UNDEFINED">undefined</option>
                            </select>
                        </td>
                        <td valign="top" nowrap>
                            <label>progress</label><br>
                            <input type="text" name="progress" id="progress" size="7" class="formElements validated percentile" autocomplete="off" maxlength="255" value="" oldvalue="1" entrytype="PERCENTILE">
                        </td>
                    </tr>
                    </tr>
                    <tr>
                        <td colspan="4">
                            <label for="description">Description</label><br>
                            <textarea rows="3" cols="30" id="description" name="description" class="formElements" style="width:100%"></textarea>
                        </td>
                    </tr>
                </table>
                <h2>Assignments</h2>
                <table cellspacing="1" cellpadding="0" width="100%" id="assigsTable">
                    <tr>
                        <th style="width:100px;">name</th>
                        <th style="width:70px;">Role</th>
                        <th style="width:30px;">est.wklg.</th>
                        <th style="width:30px;" id="addAssig"><span class="teamworkIcon" style="cursor: pointer">+</span></th>
                    </tr>
                </table>
                <div style="text-align: right; padding-top: 20px">
                    <span id="saveButton" class="button first" onClick="$(this).trigger('saveFullEditor.gantt');">Save</span>
                </div>
            </div>`;
        this.templates["ASSIGNMENT_ROW"] =
            `<tr taskId="(#=obj.task.id#)" assId="(#=obj.assig.id#)" class="assigEditRow">
                <td><select name="resourceId" class="formElements" (#=obj.assig.id.indexOf("tmp_")==0?"":"disabled"#)></select></td>
                <td><select type="select" name="roleId" class="formElements"></select></td>
                <td><input type="text" name="effort" value="(#=getMillisInHoursMinutes(obj.assig.effort)#)" size="5" class="formElements"></td>
                <td align="center"><span class="teamworkIcon delAssig del" style="cursor: pointer">d</span></td>
            </tr>`;
        this.templates["RESOURCE_EDITOR"] = 
            `<div class="resourceEditor" style="padding: 5px;">
                <h2>Project team</h2>
                <table cellspacing="1" cellpadding="0" width="100%" id="resourcesTable">
                    <tr>
                        <th style="width:100px;">name</th>
                        <th style="width:30px;" id="addResource"><span class="teamworkIcon" style="cursor: pointer">+</span></th>
                    </tr>
                </table>
                <div style="text-align: right; padding-top: 20px"><button id="resSaveButton" class="button big">Save</button></div>
            </div>`,
        this.templates["RESOURCE_ROW"] =
            `<tr resId="(#=obj.id#)" class="resRow">
                <td><input type="text" name="name" value="(#=obj.name#)" style="width:100%;" class="formElements"></td>
                <td align="center"><span class="teamworkIcon delRes del" style="cursor: pointer">d</span></td>
            </tr>`;
    }

    public tableCostTemplate(type: string): string {
        return !this.hasCost ? "" : (type == "HEAD" ? 
            `<th class="gdfColHeader gdfResizable" style="width:300px;">Custo</th>` : (type == "ROW" ? 
            `<td class="gdfCell" style="display: none;"><input type="text" name="cost" value="(#=obj.cust?obj.cust:''#)" placeholder="Custo"></td>` :
            `<td class="gdfCell"></td>`
        ));
    }

    public get keys(): string[] {
        return Object.keys(this.templates);
    }

}
