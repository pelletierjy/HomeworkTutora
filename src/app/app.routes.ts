import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home';
import { PlaceholderComponent } from './features/placeholder/placeholder';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'subjects',
    component: PlaceholderComponent,
    data: { title: 'Subjects' },
  },
  {
    path: 'grades',
    component: PlaceholderComponent,
    data: { title: 'Grades' },
  },
  {
    path: 'knowledge-base',
    component: PlaceholderComponent,
    data: { title: 'Knowledge Base' },
  },
  { path: '**', redirectTo: '' },
];
