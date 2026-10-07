import { useState } from 'react'
import { Mic, Paperclip, Send, Sparkles } from 'lucide-react'
import { conversations, sampleMessages } from '../data/chat'

function AgentChat() {
  const [active, setActive] = useState(conversations[0].id)
  const [messages, setMessages] = useState(sampleMessages)
  const [draft, setDraft] = useState('')

  const send = () => {
    if (!draft.trim()) return
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), role: 'user', text: draft },
      {
        id: Date.now() + 1,
        role: 'ai',
        text: 'Logged. The collection workflow will continue autonomously.',
      },
    ])
    setDraft('')
  }

  return (
    <div className="grid min-h-[calc(100vh-140px)] overflow-hidden rounded-card border lg:grid-cols-[260px_1fr]"
         style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
      <aside className="border-b lg:border-b-0 lg:border-r" style={{ borderColor: 'var(--border)' }}>
        <div className="border-b p-4" style={{ borderColor: 'var(--border)' }}>
          <p className="text-sm font-bold" style={{ color: 'var(--text)' }}>Recent Conversations</p>
          <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Demo conversation threads</p>
        </div>
        <div className="space-y-1 p-2">
          {conversations.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`conv-item ${active === item.id ? 'active' : ''}`}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{item.title}</p>
                <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{item.time}</span>
              </div>
              <p className="mt-1 truncate text-xs" style={{ color: 'var(--text-muted)' }}>{item.preview}</p>
            </button>
          ))}
        </div>
      </aside>

      <section className="flex min-h-[520px] flex-col">
        <div className="flex items-center gap-3 border-b px-5 py-4" style={{ borderColor: 'var(--border)' }}>
          <div className="flex h-10 w-10 items-center justify-center rounded-btn bg-primary text-white">
            <Sparkles size={16} />
          </div>
          <div>
            <p className="text-sm font-bold" style={{ color: 'var(--text)' }}>AR Collection Agent</p>
            <p className="text-[11px] font-medium text-success">Online · Dummy responses</p>
          </div>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto p-5" style={{ background: 'var(--bg-secondary)' }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t p-4" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
          <div className="composer">
            <button className="icon-btn-ghost h-9 w-9" title="Attachment">
              <Paperclip size={16} />
            </button>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Message the AR agent..."
              className="composer-input"
            />
            <button className="icon-btn-ghost h-9 w-9" title="Microphone">
              <Mic size={16} />
            </button>
            <button
              onClick={send}
              className="flex h-9 w-9 items-center justify-center rounded-btn bg-primary text-white transition-all duration-150 hover:bg-primary-700 hover:scale-[1.05]"
              title="Send"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AgentChat
