import {Component, Input, OnInit} from '@angular/core';
import {AlertService, AlertType} from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  @Input() delay = 5000;
  text = '';
  type: AlertType = 'success';

  constructor(private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.alertService.alert$.subscribe(alert => {
      this.text = alert.text;
      this.type = alert.type;
      setTimeout(() => {
        this.text = '';
      }, this.delay);
    });
  }
}
