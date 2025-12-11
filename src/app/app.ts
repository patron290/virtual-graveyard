import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
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
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('virtual-graveyard');
  protected readonly isTalking = signal(false);
  protected readonly userMessage = signal('');
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
      this.stopAudio();
      return;
    }
    this.playAudio('/kennedy.mp3');
  }

  sendMessage() {
    if (!this.userMessage().trim()) return;

    // Clear message
    this.userMessage.set('');

    // Stop current if any and play response
    if (this.isTalking()) {
      this.stopAudio();
    }
    this.playAudio('/answer.mp3');
  }

  private stopAudio() {
    this.audio?.pause();
    this.audio = null;
    this.isTalking.set(false);
  }

  private playAudio(src: string) {
    this.audio = new Audio(src);
    this.audio.load();

    this.audio.play().catch(error => {
      console.error("Audio playback failed:", error);
      this.isTalking.set(false);
    });

    this.isTalking.set(true);
  }
}
