import { Component, signal, computed, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

@Component({
  selector: 'app-chat-widget',
  standalone: true,
  imports: [FormsModule, DatePipe],
  template: `
    <aside
      class="flex h-full w-full max-w-sm flex-col rounded-2xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] shadow-xl"
    >
      <!-- Header -->
      <header class="flex items-center justify-between rounded-t-2xl bg-gradient-to-r from-primary-500 to-secondary-500 p-4 text-white">
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-xl">
            🎓
          </div>
          <div>
            <h2 class="font-display text-lg font-semibold">Homework Tutora</h2>
            <p class="text-sm opacity-90">{{ statusText() }}</p>
          </div>
        </div>
        <button
          (click)="toggleExpand()"
          [attr.aria-label]="isExpanded() ? 'Collapse chat' : 'Expand chat'"
          class="rounded-lg p-1.5 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            @if (!isExpanded()) {
              <polyline points="18 6 12 12 18 18"></polyline>
              <polyline points="6 6 6 18"></polyline>
            } @else {
              <polyline points="6 6 12 12 18 18"></polyline>
              <polyline points="18 6 12 12 6 6"></polyline>
            }
          </svg>
        </button>
      </header>

      <!-- Chat messages -->
      <main class="flex-1 overflow-y-auto p-4">
        <div class="space-y-3">
          @for (msg of messages(); track msg.timestamp) {
            <div
              class="max-w-[85%]"
              [class.ml-auto]="msg.role === 'user'"
            >
              <div
                class="rounded-2xl px-3 py-2 text-sm"
                [class.bg-primary-100]="msg.role === 'assistant'"
                [class.bg-primary-500]="msg.role === 'user'"
                [class.text-gray-800]="msg.role === 'assistant'"
                [class.text-white]="msg.role === 'user'"
              >
                {{ msg.content }}
              </div>
              <div
                class="text-[10px] opacity-50"
                [class.text-right]="msg.role === 'user'"
              >
                {{ msg.timestamp | date: 'shortTime' }}
              </div>
            </div>
          }
        </div>

        <!-- Typing indicator -->
        @if (isTyping()) {
          <div class="flex items-center gap-1 px-3 py-2 text-xs opacity-50">
            <span class="animate-bounce-delay-0">●</span>
            <span class="animate-bounce-delay-150">●</span>
            <span class="animate-bounce-delay-300">●</span>
          </div>
        }
      </main>

      <!-- Input area -->
      <footer
        class="flex items-center gap-2 border-t border-[rgb(var(--color-border))] p-3"
      >
        <input
          [ngModel]="newMessage()"
          (ngModelChange)="newMessage.set($event)"
          placeholder="Ask a question about your homework..."
          class="flex-1 rounded-lg border border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg-secondary))] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500"
        />
        <button
          (click)="sendMessage()"
          [disabled]="!newMessage().trim() || isTyping()"
          class="rounded-lg bg-primary-500 p-2 text-white transition-colors hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Send message"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 12 12 7 13"></polygon>
          </svg>
        </button>
      </footer>
    </aside>
  `,
  styles: [`
    @keyframes bounce-dot {
      0%, 80%, 100% { opacity: 0.3; }
      40% { opacity: 1; }
    }
    .animate-bounce-delay-0 { animation: bounce-dot 1.4s infinite both; }
    .animate-bounce-delay-150 { animation: bounce-dot 1.4s 0.15s infinite both; }
    .animate-bounce-delay-300 { animation: bounce-dot 1.4s 0.3s infinite both; }
  `],
})
export class ChatWidgetComponent {
  readonly chatBotUrl = input<string | null>(null);

  readonly messages = signal<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        "Hi there! I'm your AI study buddy. I can help with math, science, history, and more. What subject are you working on today?",
      timestamp: new Date(),
    },
  ]);

  readonly isTyping = signal(false);
  readonly isExpanded = signal(false);
  readonly newMessage = signal('');

  readonly statusText = computed(() => {
    if (this.isTyping()) return 'Typing...';
    return this.chatBotUrl()
      ? 'Online — connected to Tutor AI'
      : 'Online — connecting...';
  });

  sendMessage(): void {
    if (!this.newMessage().trim() || this.isTyping()) return;

    const text = this.newMessage().trim();
    this.messages.update((msgs) => [
      ...msgs,
      { role: 'user', content: text, timestamp: new Date() },
    ]);
    this.newMessage.set('');
    this.isTyping.set(true);

    // Simulate AI response (placeholder — replace with real chat bot integration)
    setTimeout(() => {
      this.messages.update((msgs) => [
        ...msgs,
        {
          role: 'assistant',
          content:
            "I'm still learning! Once the external chat bot is connected (via the `chatBotUrl` input), I'll be able to give you detailed answers. For now, I'm a placeholder demonstrating the chat widget layout.",
          timestamp: new Date(),
        },
      ]);
      this.isTyping.set(false);
    }, 2000);
  }

  toggleExpand(): void {
    this.isExpanded.update((v) => !v);
  }
}
