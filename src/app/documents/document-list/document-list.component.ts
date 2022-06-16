import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit { 
  documents: Document[] = [];
  changeSub:Subscription;

  constructor(private DocumentService: DocumentService) { }

  ngOnInit(): void {
    this.changeSub = this.DocumentService.documentChangedEvent
    .subscribe(
      (documents:Document[]) => {
        this.documents = documents;
      }
    );

    this.documents = this.DocumentService.getDocuments();
  }

  ngOnDestroy(): void {
    this.changeSub.unsubscribe();
  }
}
