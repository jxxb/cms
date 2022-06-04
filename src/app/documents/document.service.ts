import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DocumentListComponent } from './document-list/document-list.component';

import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;
  private documents: Document[] = [];

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }
  
  getDocuments(){
    return this.documents.slice();
  }

  getDocument(id: number){
    return this.documents[id];
  }

  deleteDocument(document: Document) {
    if(!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if(pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    
    this.documentChangedEvent.next(this.documents.slice());
  }

  getMaxId(): number {
  let maxId = 0;
  for(let document of this.documents) {
    let currentId = +document.id;
      if(currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addDocument(newDocument: Document) {
    if(newDocument === undefined || newDocument === null) {
      return;
    }
    this.maxDocumentId++;
    newDocument.id = String(this.maxDocumentId);
    this.documents.push(newDocument);
    let documentListClone = this.documents.slice();

    this.documentChangedEvent.next(documentListClone);
  }

  updateDocument(originalDocument:Document,newDocument: Document) {
    if(originalDocument || newDocument === undefined || null) {
      return;
    }

    let pos = this.documents.indexOf(originalDocument);
    if(pos < 0){
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    let DocumentListClone = this.documents.slice();
    this.documentChangedEvent.next(DocumentListClone);
  }
}

