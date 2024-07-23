import { Component } from '@angular/core';

@Component({
  selector: 'app-project-management-console',
  templateUrl: './project-management-console.component.html',
  styleUrls: ['./project-management-console.component.scss']
})
export class ProjectManagementConsoleComponent {

  visible: boolean;

  showFiltersDialog(){
    console.log('showFiltersDialog');
    this.visible = true;
  }
}
