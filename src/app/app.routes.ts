import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home';
import { AiTutorComponent } from './features/ai-tutor/ai-tutor';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ai-tutor', component: AiTutorComponent },
  { path: '**', redirectTo: '' },
];
