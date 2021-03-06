import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
document: Document;
id: string;
nativeWindow: any;

  constructor(private DocumentService:DocumentService,
    private WindRefService: WindRefService,
    private route: ActivatedRoute, private router: Router) {
      this.nativeWindow = WindRefService.getNativeWindow();
    }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.DocumentService.getDocument(this.id)
        .subscribe((docData)=>{
          this.document = docData.document;
        });
      }
    )
  }

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onEditDocument() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDelete() {
    this.DocumentService.deleteDocument(this.document);
    this.router.navigateByUrl('/documents');
  }

}
