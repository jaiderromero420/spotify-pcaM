import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IonicModule, NavController, ToastController } from '@ionic/angular'; 
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

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

  // Mensajes de validación
  validation_messages = {
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
    private toastController: ToastController, 
    private router: Router,
    private authService: AuthService,
    private navCtrl: NavController 
  ) {
    this.loginForm = this.formBuilder.group({
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

  ngOnInit() {}

  // --- NUEVA FUNCIÓN: Ir al registro ---
  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }

  // --- FUNCIÓN PRINCIPAL DE LOGIN (Modificada) ---
  async onLogin() {
    // 1. Verificamos si el formulario visualmente está bien
    if (this.loginForm.valid) {
      
      // 2. Llamamos al servicio de autenticación con los datos del form
      this.authService.loginUser(this.loginForm.value)
        .then(async (res) => {
          // CASO ÉXITO:
          this.errorMessage = "";
          await this.presentToast('¡Bienvenido! Iniciando sesión...', 'success');
          
          // Navegamos al Home
          this.navCtrl.navigateForward('/home'); 
        })
        .catch(async (error) => {
          // CASO ERROR (Contraseña incorrecta o usuario no existe):
          this.errorMessage = error;
          await this.presentToast('Error: ' + error, 'danger');
        });

    } else {
      // 3. Si el formulario está incompleto
      console.log('Formulario inválido');
      await this.presentToast('Por favor, revisa los campos.', 'danger');
      this.loginForm.markAllAsTouched(); 
    }
  }

  // Helper para mostrar notificaciones
  async presentToast(message: string, color: 'success' | 'danger' | 'warning' = 'success') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'bottom',
      icon: color === 'success' ? 'checkmark-circle' : 'alert-circle'
    });
    await toast.present();
  }
}