import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OlamDataGridModule } from './datagrid/datagrid.component';
import { ConfirmBoxComponent } from './confirm-box/confirm-box.component';
import { MessageComponent, MessageModule } from './message/message.component';
import { ModalModule } from 'ngx-bootstrap';
import { ConfirmationService } from './confirm-box/confirm.service';
import { OlamSingleSelectModule } from './singleselect/singleselect.component';
import { OlamMultiSelectModule } from './multiselect/multiselect.component';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { GridModule } from '@progress/kendo-angular-grid';


@NgModule({
  declarations: [
    AppComponent,
    ConfirmBoxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    OlamDataGridModule,
    GridModule,
    ModalModule.forRoot(),
    OlamSingleSelectModule,
    OlamMultiSelectModule,
    DateInputsModule,
    MessageModule  
  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
