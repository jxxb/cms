import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentChangedEvent = new Subject<Document[]>();
  private documents: Document[] = [];
  constructor(private http:HttpClient) {
  }

  sortAndSend() {
    this.documents.sort((a,b)=>a.name>b.name?1:b.name>a.name?-1:0);
    this.documentChangedEvent.next(this.documents.slice());
  }
  getDocument(id: string){
    return this.http.get<{message:string,documents:Document}>('http://localhost:3000/documents/' + id);
  }
  getDocuments(){
    this.http.get<{message:string,documents:Document[]}>('http://localhost:3000/documents/').subscribe(
      (documentData)=>{
        this.documents = documentData.documents;
        this.sortAndSend();
        this.documentChangedEvent.next(this.documents.slice());
      }, (error:any)=>{
        console.log(error);
      }
    );
  }
  addDocument(newDocument: Document) {
    if(!newDocument) {
      return;
    }
    newDocument.id='';
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    this.http.post<{message:string,document:Document}>(
      'http://localhost:3000/documents/',document,{headers:headers}).subscribe((documentData)=>{
        this.documents.push(documentData.document)
      this.sortAndSend();
      }
    );
  }
 updateDocument(originalDocument:Document,newDocument: Document) {
    if(!originalDocument || !newDocument) {
      return;
    }
    const pos = this.documents.findIndex(c=>c.id===originalDocument.id); 
    // let pos = this.documents.indexOf(originalDocument);
    if(pos < 0){
      return;
    }
    newDocument.id = originalDocument.id;
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    this.http.put('http://localhost:3000/documents/' + originalDocument.id,newDocument,{headers:headers}).subscribe((response:Response)=>{
        this.documents[pos] = newDocument;
        this.sortAndSend();
        })
  }
  deleteDocument(document: Document) {
    if(!document) {
      return;
    }
    const pos = this.documents.findIndex(c=>c.id===document.id); 
    //const pos = this.documents.indexOf(document);
    if(pos < 0) {
      return;
    }
    this.http.delete('http://localhost:3000/documents/' + document.id).subscribe(
      (response:Response)=>{
        this.documents.splice(pos, 1);
        this.sortAndSend();
      }
    );
  }
}

