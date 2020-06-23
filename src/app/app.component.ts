import { Component ,OnInit} from '@angular/core';
// import { route}
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Kach';
  constructor(private router: Router){

  }
  ngOnInit() {
    }

onLogout() {
  localStorage.removeItem('userInfo');
  localStorage.clear();
  this.router.navigate(['/login'])

}
}

