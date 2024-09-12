
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import  routes  from './app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // Import your routes

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // Provide HttpClient for API calls
    provideRouter(routes), provideAnimationsAsync(), // Provide the routes using provideRouter
  ],
}).catch((err) => console.error(err));

