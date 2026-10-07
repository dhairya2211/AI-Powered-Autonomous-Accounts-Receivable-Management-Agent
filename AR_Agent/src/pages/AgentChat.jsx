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
    <div className="grid min-h-[calc(100vh-140px)] overflow-hidden rounded-3xl border border-line bg-card lg:grid-cols-[280px_1fr]">
      <aside className="border-b border-line lg:border-b-0 lg:border-r">
        <div className="border-b border-line p-4">
          <p className="font-display text-sm font-semibold">Recent Conversations</p>
          <p className="text-[11px] text-muted">Hardcoded demo threads</p>
        </div>
        <div className="space-y-1 p-2">
          {conversations.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`w-full rounded-2xl px-3 py-3 text-left transition ${
                active === item.id ? 'bg-primary/15 border border-primary/30' : 'hover:bg-white/5'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium">{item.title}</p>
                <span className="text-[11px] text-muted">{item.time}</span>
              </div>
              <p className="mt-1 truncate text-xs text-muted">{item.preview}</p>
            </button>
          ))}
        </div>
      </aside>

      <section className="flex min-h-[520px] flex-col">
        <div className="flex items-center gap-3 border-b border-line px-5 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
            <Sparkles size={16} />
          </div>
          <div>
            <p className="text-sm font-semibold">AR Collection Agent</p>
            <p className="text-[11px] text-success">Online · dummy responses only</p>
          </div>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto p-5">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-primary to-accent'
                    : 'border border-line bg-[#0B1120] text-slate-200'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-line p-4">
          <div className="flex items-center gap-2 rounded-2xl border border-line bg-[#0B1120] px-3 py-2">
            <button className="icon-btn h-9 w-9 border-0 bg-transparent" title="Attachment">
              <Paperclip size={16} />
            </button>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Message the AR agent..."
              className="flex-1 bg-transparent py-2 text-sm"
            />
            <button className="icon-btn h-9 w-9 border-0 bg-transparent" title="Microphone">
              <Mic size={16} />
            </button>
            <button
              onClick={send}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-r from-primary to-accent"
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
