import { Component, OnInit } from '@angular/core';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit { 
  documents: Document[] = [
    // new Document('1', 'Halo','It is cool', 'halo.com', null),
    // new Document('2', 'Tetris','It is fun', 'www.t.pizza', null)
  ]

  constructor(private DocumentService: DocumentService) { }

  ngOnInit(): void {
    this.documents = this.DocumentService.getDocuments();
  }

  onSelectedDocument(document: Document) {
    this.DocumentService.documentSelected.emit(document);
  }

}
