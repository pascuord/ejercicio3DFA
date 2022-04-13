import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthDTO } from "src/app/Models/auth.dto";
import { HeaderMenus } from "src/app/Models/header-menus.dto";
import { AuthService } from "src/app/Services/auth.service";
import { HeaderMenusService } from "src/app/Services/header-menus.service";
import { LocalStorageService } from "src/app/Services/local-storage.service";
import { SharedService } from "src/app/Services/shared.service";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";
import { login } from "../actions";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginUser: AuthDTO;
  email: FormControl;
  password: FormControl;
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private sharedService: SharedService,
    private headerMenusService: HeaderMenusService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.loginUser = new AuthDTO("", "", "", "");

    this.email = new FormControl("", [
      Validators.required,
      Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
    ]);

    this.password = new FormControl("", [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
    ]);

    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });
  }

  ngOnInit(): void {}

  login() {
    let responseOK: boolean = false;
    let errorResponse: any;

    this.loginUser.email = this.email.value;
    this.loginUser.password = this.password.value;

    this.store.dispatch(login(this.loginUser));
    this.loginForm.reset();

    /* this.authService.login(this.loginUser).subscribe(
      (authResult) => {
        responseOK = true;
        this.loginUser.user_id = authResult.user_id;
        this.loginUser.access_token = authResult.access_token;
        // save token to localstorage for next requests
        this.localStorageService.set("user_id", this.loginUser.user_id);
        this.localStorageService.set(
          "access_token",
          this.loginUser.access_token
        );
      },
      (error: any) => {
        responseOK = false;
        errorResponse = error.error;
        const headerInfo: HeaderMenus = {
          showAuthSection: false,
          showNoAuthSection: true,
        };
        this.headerMenusService.headerManagement.next(headerInfo);
        this.sharedService.errorLog(error.error);
      },
      () => {
        this.sharedService.managementToast(
          "loginFeedback",
          responseOK,
          errorResponse
        );

        if (responseOK) {
          const headerInfo: HeaderMenus = {
            showAuthSection: true,
            showNoAuthSection: false,
          };
          // update options menu
          this.headerMenusService.headerManagement.next(headerInfo);
          this.router.navigateByUrl("home");
        }
      }
    );
  } */
  }
}