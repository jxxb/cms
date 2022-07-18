import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Document } from '../document.model'
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
// @ViewChild('f') dForm: NgForm;
editMode = false;
originalDocument: Document;
document: Document;
id: string;
  constructor(
    private route: ActivatedRoute, 
    private documentService:DocumentService,
    private router: Router
    ) {}
  ngOnInit(): void {
  this.route.params.subscribe((params:Params) => {
    this.id = params['id'];
  if (!this.id) {
      this.editMode = false;
      return;
  }
  this.documentService.getDocument(this.id).subscribe((docData)=>{
    this.originalDocument = docData.document; 
    if (!this.originalDocument) {
      return;
    }
    this.editMode = true;
    this.document = JSON.parse(JSON.stringify(this.originalDocument));
    if(this.originalDocument.children && this.originalDocument.children.length>0){
      this.originalDocument.children=JSON.parse(JSON.stringify(this.originalDocument.children));
    }
  });
  });
  }

  onSubmit(form:NgForm) {
    console.log(form);
    const value = form.value;
    const newDocument = new Document(
      "",
      //value.id,
      value.name,
      value.description,
      value.url,
      null
      );
      console.log(this.editMode);
    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
    this.documentService.addDocument(newDocument);
    }
    this.router.navigate(["/documents"]);
  }

  onCancel() {
    this.router.navigate(["/documents"]);
  }
}
