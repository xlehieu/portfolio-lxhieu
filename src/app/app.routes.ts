import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { MyLove } from './pages/my-love/my-love';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Trang chủ
  { path: 'my-love', component: MyLove }, // Route mới: portfolio-lxhieu.vercel.app/projects
  { path: '**', redirectTo: '' }, // Redirect về trang chủ nếu gõ sai đường dẫn
];
