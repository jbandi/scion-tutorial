import { Contact, ContactService } from '../contact.service';
import { Observable } from 'rxjs';
import { provideWorkbenchActivity } from '@scion/workbench-application.angular';
import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-activity',
  templateUrl: './contact-activity.component.html',
  styleUrls: ['./contact-activity.component.scss'],
  providers: [
    provideWorkbenchActivity(ContactActivityComponent)
]
})
export class ContactActivityComponent {

  public contacts$: Observable<Contact[]>;

  constructor(private _contactService: ContactService) {
    this.contacts$ = this._contactService.contacts$();
  }
}
