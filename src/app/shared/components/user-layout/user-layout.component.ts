import {Component, Injectable, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, Subject} from 'rxjs';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})

@Injectable({providedIn: 'root'})
export class UserLayoutComponent implements OnInit {

  ngOnInit(): void {

  }
}
