import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'src/app/core/services/connection.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	public username = 'dominik@excode.eu';
	public password = 'codex2435';

	constructor(public service: ConnectionService) {}

	login() {
		this.service.login(this.username, this.password);
	}

	ngOnInit() {}

}
