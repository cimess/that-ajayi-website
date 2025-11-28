import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Bot, X } from 'lucide-react';
import { generateStylistResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIStylist: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! I am Ayo, your personal stylist. Are you planning for a wedding, a gala, or just need a wardrobe refresh?' }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    // Filter history for context (simplified)
    const historyForApi = messages.map(m => ({ role: m.role, text: m.text }));

    const response = await generateStylistResponse(userMsg, historyForApi);

    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div id="consult" className="fixed bottom-8 right-8 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-3 bg-eko-gold text-eko-black px-6 py-4 rounded-full shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <Sparkles className="w-5 h-5" />
            <span className="font-bold tracking-wide">Ask Stylist Ayo</span>
          </button>
        )}
      </div>

      {/* Chat Interface Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-neutral-900 w-full max-w-md h-[600px] rounded-2xl shadow-2xl flex flex-col border border-eko-gold/20 overflow-hidden animate-fade-in-up">

            {/* Header */}
            <div className="bg-eko-green p-4 flex justify-between items-center border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-eko-gold">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-serif font-bold">Stylist Ayo</h3>
                  <p className="text-white/60 text-xs">AI Powered Fashion Expert</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl p-4 ${
                    msg.role === 'user'
                      ? 'bg-eko-gold text-eko-black rounded-tr-none'
                      : 'bg-white/10 text-white rounded-tl-none'
                  }`}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                   <div className="bg-white/10 rounded-2xl p-4 rounded-tl-none flex gap-2 items-center">
                     <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce"></span>
                     <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce delay-75"></span>
                     <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce delay-150"></span>
                   </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Prompts */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
                {['Wedding Guest', 'Date Night', 'Office Wear', 'Traditional'].map(prompt => (
                  <button
                    key={prompt}
                    onClick={() => setInput(`I need an outfit for ${prompt}`)}
                    className="whitespace-nowrap bg-white/5 border border-white/10 rounded-full px-4 py-1 text-xs text-white/70 hover:bg-eko-gold hover:text-eko-black transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 bg-black border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about fabrics, styles, or events..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-3 text-white focus:outline-none focus:border-eko-gold transition-colors placeholder:text-white/30"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="bg-eko-gold text-eko-black p-3 rounded-full hover:bg-white transition-colors disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-center text-white/20 text-xs mt-3">
                Powered by Gemini. Fashion advice may vary based on availability.
              </p>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default AIStylist;
