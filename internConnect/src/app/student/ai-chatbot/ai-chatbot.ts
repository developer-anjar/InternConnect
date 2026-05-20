import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Auth } from '../../core/services/auth';

interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

@Component({
  selector: 'app-ai-chatbot',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, FormsModule],
  templateUrl: './ai-chatbot.html',
  styleUrls: ['./ai-chatbot.css'],
})
export class AiChatbot implements OnInit {

  studentId!: number;
  messages: ChatMessage[] = [];
  newMessage: string = '';
  isTyping = false;

  CHAT_API = 'http://internconnect-5n7j.onrender.com/api/chat';

  @ViewChild('chatMessages') chatMessages!: ElementRef;

  constructor(
    private http: HttpClient,
    private auth: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.auth.getStudentId();
    if (!id) {
      Swal.fire('Login required', 'Please login first', 'warning');
      this.router.navigate(['/login']);
      return;
    }

    this.studentId = Number(id);

    // ✅ Welcome Message
    this.addMessage(
      "Hello! 👋 I'm your AI Career Assistant.\n\n" +
      "I can help you with:\n" +
      "• Internship suggestions\n" +
      "• Resume tips\n" +
      "• Interview preparation\n\n" +
      "Try typing: 'suggest internships'",
      false
    );
  }

  //  SEND MESSAGE
  sendMessage() {
    if (!this.newMessage.trim()) return;

    // Add user message
    this.addMessage(this.newMessage, true);

    const userMessage = this.newMessage;
    this.newMessage = '';
    this.isTyping = true;

    this.http.post<any>(this.CHAT_API, {
      studentId: this.studentId,
      message: userMessage
    }).subscribe({
      next: (res) => {
        setTimeout(() => {
          // ✅ FIXED (use reply instead of response)
          this.addMessage(res.reply || this.fallbackResponse(userMessage), false);
          this.isTyping = false;
        }, 800); // smooth typing effect
      },
      error: () => {
        this.addMessage(this.fallbackResponse(userMessage), false);
        this.isTyping = false;
      }
    });
  }

  //  FALLBACK (if API fails)
  fallbackResponse(message: string): string {
    const responses = [
      "That's a great question! Try exploring internships based on your skills.",
      "You can improve your resume by adding projects and achievements.",
      "Practice interview questions daily to improve confidence.",
      "Networking helps a lot! Try connecting on LinkedIn.",
      "Keep learning new skills to stay ahead.",
      "Try asking: 'suggest internships' for personalized results."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // ✅ ADD MESSAGE + AUTO SCROLL
  addMessage(text: string, isUser: boolean) {
    this.messages.push({
      text,
      isUser,
      timestamp: new Date()
    });

    setTimeout(() => {
      if (this.chatMessages) {
        this.chatMessages.nativeElement.scrollTop =
          this.chatMessages.nativeElement.scrollHeight;
      }
    }, 100);
  }

  // ⌨️ ENTER KEY SUPPORT
  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }
}