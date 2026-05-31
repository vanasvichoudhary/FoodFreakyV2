import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Bot, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

export const LiveChatWidget: React.FC = () => {
  const { activeOrderId } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: 'Hi there! 👋 Welcome to FeastExpress. How can I help you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const predefinedPrompts = [
    { text: 'Where is my order?', action: 'order' },
    { text: 'What coupons are active?', action: 'coupons' },
    { text: 'Do you deliver to Beverly Hills?', action: 'delivery' },
    { text: 'Speak to a human representative.', action: 'human' },
  ];

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePromptClick = (prompt: { text: string; action: string }) => {
    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: prompt.text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      let replyText = '';

      if (prompt.action === 'order') {
        if (activeOrderId) {
          replyText = `I found your active order ${activeOrderId}! You can track it in real-time in your Dashboard page. It is currently being processed.`;
        } else {
          replyText = "You don't have any active orders right now. Click on 'Menu' to order some delicious food!";
        }
      } else if (prompt.action === 'coupons') {
        replyText = 'Currently, we have 3 active coupons:\n1. FEAST20: 20% OFF (Min order $25)\n2. YUMMY50: Flat $5.00 OFF (Min order $15)\n3. FREEDEL: Free Delivery (Min order $20). Type them in at Checkout!';
      } else if (prompt.action === 'delivery') {
        replyText = 'Yes! We deliver to Beverly Hills and surrounding areas within 35 minutes. Free delivery applies for orders over $20 using code FREEDEL!';
      } else {
        replyText = 'Connecting you to our agent Jack... Just kidding! Since this is a demo, please note our customer service number is +1 (555) FOOD-HELP.';
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-5 left-5 z-40 pointer-events-auto">
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-all duration-300"
          title="Live Chat Support"
        >
          <MessageSquare className="w-6 h-6 animate-pulse-slow" />
          <span className="font-semibold text-sm pr-1 hidden sm:inline">Support Chat</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[330px] sm:w-[360px] h-[480px] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 animate-fade-in-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-600 to-amber-500 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1.5 rounded-full">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-none">FeastBot</h4>
                <span className="text-[10px] text-orange-100 flex items-center gap-1 mt-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block animate-ping"></span>
                  Active Customer Support
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-orange-200 hover:bg-white/10 p-1 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50 dark:bg-slate-950/40">
            {messages.map((m) => (
              <div key={m.id} className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`p-1.5 rounded-full flex-shrink-0 mt-1 ${m.sender === 'user' ? 'bg-orange-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200'}`}>
                  {m.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>
                <div className="max-w-[75%]">
                  <div className={`p-3 rounded-2xl text-xs whitespace-pre-line leading-relaxed shadow-sm ${
                    m.sender === 'user'
                      ? 'bg-orange-600 text-white rounded-tr-none'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-100 dark:border-slate-800 rounded-tl-none'
                  }`}>
                    {m.text}
                  </div>
                  <span className="text-[9px] text-slate-400 dark:text-slate-500 block mt-1 px-1">
                    {m.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-full flex-shrink-0 mt-1 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="p-2.5 border-t border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900 flex flex-wrap gap-1.5">
            {predefinedPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handlePromptClick(p)}
                disabled={isTyping}
                className="text-[10px] font-medium border border-orange-200 dark:border-orange-900/60 hover:bg-orange-50 dark:hover:bg-orange-950/20 text-orange-600 dark:text-orange-400 py-1.5 px-2.5 rounded-full transition-all duration-200 text-left disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {p.text}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
