import { Component, inject, signal, computed, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService, ChatMessage } from '../../../core/services/chat.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.html',
  styleUrls: ['./chatbot.css']
})
export class ChatbotComponent implements AfterViewChecked {
  private chatService = inject(ChatService);

  isOpen = signal(false);
  messages = signal<ChatMessage[]>([
    { text: 'Hello! How can I help you today?', sender: 'bot', timestamp: new Date() }
  ]);
  inputMessage = signal('');
  isLoading = signal(false);

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  toggleChat() {
    this.isOpen.update(v => !v);
  }

  sendMessage() {
    const msg = this.inputMessage().trim();
    if (!msg) return;

    // Add user message
    this.messages.update(msgs => [...msgs, { text: msg, sender: 'user', timestamp: new Date() }]);
    this.inputMessage.set('');
    this.isLoading.set(true);

    this.chatService.sendMessage(msg).subscribe({
      next: (res) => {
        this.messages.update(msgs => [...msgs, { text: res.response, sender: 'bot', timestamp: new Date() }]);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Chat error:', err);
        this.messages.update(msgs => [...msgs, { text: 'Sorry, I am having trouble connecting to the server.', sender: 'bot', timestamp: new Date() }]);
        this.isLoading.set(false);
      }
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
}
