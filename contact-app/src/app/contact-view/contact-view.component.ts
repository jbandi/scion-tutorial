import {
  provideWorkbenchView,
  WorkbenchRouter,
  WorkbenchView,
  PopupService,
  Popup
} from '@scion/workbench-application.angular';
import { Component, OnDestroy } from '@angular/core';
import { Observable, pipe, Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact, ContactService } from '../contact.service';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';

const FIRSTNAME = 'firstname';
const LASTNAME = 'lastname';

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.scss'],
  providers: [provideWorkbenchView(ContactViewComponent)]
})
export class ContactViewComponent implements OnDestroy {
  public readonly FIRSTNAME = FIRSTNAME;
  public readonly LASTNAME = LASTNAME;

  private _destroy$ = new Subject<void>();

  public form: FormGroup;
  public contact: Contact;

  constructor(
    route: ActivatedRoute,
    private _contactService: ContactService,
    private _view: WorkbenchView,
    private _router: WorkbenchRouter,
    formBuilder: FormBuilder,
    private _popupService: PopupService
  ) {
    this._view.heading = 'Contact';
    this.form = new FormGroup({
      [FIRSTNAME]: formBuilder.control('', Validators.required),
      [LASTNAME]: formBuilder.control('', Validators.required)
    });

    // Load contact
    route.params
      .pipe(
        map(params => params['id']),
        distinctUntilChanged(),
        switchMap(id => this.load$(id)),
        takeUntil(this._destroy$)
      )
      .subscribe();

    // Store contact if the form changes

    this.form.statusChanges
      .pipe(
        filter(() => this.form.valid),
        switchMap(() => this.store$()),
        takeUntil(this._destroy$)
      )
      .subscribe();
  }

  private load$(contactId: string): Observable<any> {
    return this._contactService.contact$(contactId).pipe(
      tap((contact: Contact) => {
        this.contact = contact;
        this._view.title = `${this.contact.firstname} ${this.contact.lastname}`;
        this.form.controls[FIRSTNAME].setValue(contact.firstname, { emitEvent: false });
        this.form.controls[LASTNAME].setValue(contact.lastname, { emitEvent: false });
      })
    );
  }

  private store$(): Observable<any> {
    return this._contactService.update$({
      id: this.contact.id,
      firstname: this.form.controls[FIRSTNAME].value,
      lastname: this.form.controls[LASTNAME].value
    });
  }

  public onCommunicationAdd(event: MouseEvent): void {
    event.preventDefault();
    const popup: Popup = {
      position: 'east',
      anchor: event.target as Element
    };
    this._popupService.open(popup, {
      entity: 'communication',
      action: 'create',
      contactId: this.contact.id
    });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
  }
}
