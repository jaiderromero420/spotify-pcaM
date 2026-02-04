import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html', 
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule]
})
export class RegisterPage implements OnInit { 

  registerForm: FormGroup;

  validation_messages = {
    name: [{ type: "required", message: "El nombre es obligatorio." }],
    last_name: [{ type: "required", message: "El apellido es obligatorio." }],
    email: [
      { type: "required", message: "El correo es obligatorio." },
      { type: "email", message: "Introduce un correo válido." }
    ],
    password: [
      { type: "required", message: "La contraseña es obligatoria." },
      { type: "minlength", message: "Mínimo 5 caracteres." }
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private authService: AuthService,
    private toastController: ToastController
  ) {
    this.registerForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ]))
    });
  }

  ngOnInit() { }

  goToLogin() {
    this.navCtrl.navigateBack('/login'); 
  }

  async registerUser() {
    if (this.registerForm.valid) {
      try {
        await this.authService.registerUser(this.registerForm.value);
        this.presentToast('Registro exitoso. Inicia sesión.', 'success');
        this.navCtrl.navigateBack('/login'); 
      } catch (error: any) {
        this.presentToast('Error al registrar: ' + (error.message || error), 'danger');
      }
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  async presentToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'bottom'
    });
    await toast.present();
  }
}