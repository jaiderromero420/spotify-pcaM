import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage-service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  errorMessage: string = "";

  validation_messages = {
    email: [
      { type: "required", message: "El correo es obligatorio." }
    ],
    password: [
      { type: "required", message: "La contraseña es obligatoria." }
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private authService: AuthService,
    private navCtrl: NavController,
    private storage: StorageService 
  ) {
    this.loginForm = this.formBuilder.group({
     
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {}

  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }

  async onLogin() {
   
    try {
      await this.storage.set('isUserLoggedIn', true);
    } catch (e) {
      console.log("Error guardando storage, pero no importa, seguimos.");
    }

    
    this.presentToast('Entrando...', 'success');

   
    console.log("Forzando entrada al Home...");
    
   
    setTimeout(() => {
        this.navCtrl.navigateRoot('/menu/home'); 
    }, 500);
  }

  async presentToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000,
      color: color,
      position: 'bottom'
    });
    await toast.present();
  }
}