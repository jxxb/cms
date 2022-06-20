import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;
  private documents: Document[] = [];

  constructor(private http:HttpClient) {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  storeDocuments() {
    const documents = JSON.stringify(this.getDocuments());
    this.http.put('https://angular-7a03c-default-rtdb.firebaseio.com/documents.json', documents).subscribe(
      ()=>{
        this.documentChangedEvent.next(this.documents.slice());
      }
    )
  }
  
  getDocuments(){
    this.http.get('https://angular-7a03c-default-rtdb.firebaseio.com/documents.json').subscribe(
      (documents:Document[] = [])=>{
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        this.documents.sort((a,b)=>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );
        this.documentChangedEvent.next(this.documents.slice());
      }, (error:any)=>{
        console.log(error);
      }
    );
    return this.documents.slice();
  }

  getDocument(id: string):Document{
    for (const document of this.documents) {
      if(document.id === id) {
        return document;
      }
    }
    return null;
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
    this.storeDocuments();
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
    if(!newDocument) {
      return;
    }
    this.maxDocumentId++;
    newDocument.id = String(this.maxDocumentId);
    this.documents.push(newDocument);
    this.storeDocuments();
  }

  updateDocument(originalDocument:Document,newDocument: Document) {
    if(!originalDocument || !newDocument) {
      return;
    }

    let pos = this.documents.indexOf(originalDocument);
    if(pos < 0){
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.storeDocuments();
  }
}

