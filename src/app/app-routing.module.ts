import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { DocumentsComponent } from './documents/documents.component';
import { MessagesComponent } from './messages/messages.component';

const routes: Routes = [
  // { path: '', redirectTo: '/documents', pathMatch: 'full'},
  // { path: 'contacts', component:ContactsComponent },
  // { path: 'documents', component:DocumentsComponent },
  // { path: 'messages', component:MessagesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
