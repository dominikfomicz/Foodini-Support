import { Component, OnInit, Injectable, HostListener } from '@angular/core';
import { LocationStrategy } from '@angular/common';
import { ConnectionService } from './core/services/connection.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	token;

	constructor (private connect: ConnectionService) {
	}

	ngOnInit() {
		this.connect.token.subscribe( (state: boolean) => {
			this.token = state;
		})
		// this.token = this.connect.tokenStatusObservable ? this.connect.tokenStatusObservable : this.connect.getToken();
	}
	@HostListener('document:keydown', ['$event'])
	onKeyDown(evt: KeyboardEvent) {
		if ( evt.keyCode === 8 || evt.which === 8 ) {
			let doPrevent = true;
			const types =['text', 'password', 'file', 'search', 'email', 'number', 'date',
					'color', 'datetime', 'datetime-local', 'month', 'range', 'search', 'tel', 'time', 'url', 'week'];
			const target = (<HTMLInputElement>evt.target);

			const disabled = target.disabled || (<HTMLInputElement>event.target).readOnly;
			if (!disabled) {
				if (target.isContentEditable) {
					doPrevent = false;
				} else if (target.nodeName === 'INPUT') {
					let type = target.type;
					if (type) {
						type = type.toLowerCase();
					}
					if (types.indexOf(type) > -1) {
						doPrevent = false;
					}
				} else if (target.nodeName === 'TEXTAREA') {
					doPrevent = false;
				}
			}
			if (doPrevent) {
				evt.preventDefault();
				return false;
			}
		}
	}
}
