import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './register-guest.component.html',
  styleUrls: ['./register-guest.component.sass']
})
export class GuestRegisterComponent {
  form!: FormGroup;
  loading = false;
  submitted = false;
  apiUrl = 'http://localhost:8827/users/RegisterUser';

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      fName: ['', Validators.required],
      lName: ['', Validators.required],
      userName: ['', Validators.required],
      pwd: ['', [Validators.required]],
      userType: ['guest', [Validators.required]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    //stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.http.post<any>(this.apiUrl, this.form.value)
      .subscribe((data: any) => {
        if (this.form.value.userType == "admin") {
          this.router.navigate(['../admin'], { relativeTo: this.route });
        } else {
          this.router.navigate(['../guest'], { relativeTo: this.route });
        }
        
      },
      error => {
        console.log("Register error: ", error);
        this.loading = false;
      });
  }
}
