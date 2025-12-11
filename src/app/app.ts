import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddPersonDialogComponent } from './add-person-dialog/add-person-dialog.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatDialogModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('virtual-graveyard');
  protected readonly isTalking = signal(false);
  private readonly dialog = inject(MatDialog);
  private audio: HTMLAudioElement | null = null;

  openAddPersonDialog() {
    this.dialog.open(AddPersonDialogComponent, {
      width: '400px',
      panelClass: 'custom-dialog-container' // Optional for global styling if needed
    });
  }

  toggleTalk() {
    if (this.isTalking()) {
      this.audio?.pause();
      this.audio = null;
      this.isTalking.set(false);
      return;
    }

    this.audio = new Audio('/kennedy.mp3');
    this.audio.load();

    this.audio.play().catch(error => {
      console.error("Audio playback failed:", error);
      this.isTalking.set(false);
    });

    this.isTalking.set(true);
  }
}
