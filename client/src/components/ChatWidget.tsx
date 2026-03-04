import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Send, MessageCircle } from 'lucide-react';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const SYSTEM_PROMPT = `Eres un asistente virtual de educación financiera para Fya Social Capital. Respondes preguntas básicas sobre finanzas personales, créditos, tasas de interés y buenas prácticas.

Temas que dominas: qué es la tasa de interés, tipos de tasas (efectiva anual, efectiva mensual, nominal), cómo funciona un crédito, amortización, hábitos financieros saludables, cómo mejorar el historial crediticio.

Reglas:
- Responde en español, de forma clara y concisa.
- Usa lenguaje accesible para el público general.
- Incluye enlaces de navegación cuando sea relevante, usando el formato [Texto de enlace](/ruta).
- Rutas disponibles: [Registrar crédito](/registrar), [Consulta de créditos](/consulta), [Cómo obtener tu crédito](/como-obtener-credito).
- Si el usuario pregunta cómo registrar un crédito, sugiere ir a [Registrar crédito](/registrar).
- Si pregunta por consejos para obtener crédito, sugiere [Cómo obtener tu crédito](/como-obtener-credito).
- Si no sabes algo, dilo con honestidad.`;

type Message = { role: 'model' | 'user'; text: string };

export function ChatWidget() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: 'Hola, soy tu asistente financiero. Puedes preguntarme sobre tasas de interés, tipos de crédito, amortización o cómo mejorar tus posibilidades de obtener un crédito. ¿En qué puedo ayudarte?'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  const handleNavigate = (path: string) => {
    if (path.startsWith('/')) {
      navigate(path);
      setIsChatOpen(false);
    }
  };

  const renderMessageText = (text: string) => {
    const parseLine = (line: string, lineKey: string) => {
      const linkRegex = /\[([^\]]+)\]\((\/[^)]+)\)/g;
      const parts: React.ReactNode[] = [];
      let lastIndex = 0;
      let m: RegExpExecArray | null;
      let idx = 0;
      while ((m = linkRegex.exec(line)) !== null) {
        if (m.index > lastIndex) {
          parts.push(line.slice(lastIndex, m.index));
        }
        parts.push(
          <button
            key={`${lineKey}-${idx}`}
            type="button"
            onClick={() => handleNavigate(m![2])}
            className="text-primary hover:underline font-medium inline"
          >
            {m[1]}
          </button>
        );
        lastIndex = linkRegex.lastIndex;
        idx++;
      }
      if (lastIndex < line.length) parts.push(line.slice(lastIndex));
      return parts;
    };
    return text.split(/\n/).map((line, i) => (
      <p key={i} className={i > 0 ? 'mt-2' : ''}>
        {parseLine(line, `l-${i}`)}
      </p>
    ));
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    if (!apiKey) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: 'Configura VITE_GEMINI_API_KEY en client/.env.'
        }
      ]);
      setInputValue('');
      return;
    }

    const userMsg: Message = { role: 'user', text: inputValue };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const recentHistory = messages.slice(-8).map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
            contents: [...recentHistory, { role: 'user', parts: [{ text: userMsg.text }] }],
            generationConfig: {
              temperature: 0.3,
              maxOutputTokens: 400
            }
          })
        }
      );

      const data = await response.json();

      if (data.error) throw new Error(data.error.message);

      const botText =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        'Lo siento, hubo un error procesando tu solicitud.';

      setMessages((prev) => [...prev, { role: 'model', text: botText }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: 'model', text: `Error: ${error instanceof Error ? error.message : 'Error desconocido'}` }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isChatOpen && (
        <div className="mb-4 w-80 md:w-96 bg-card border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[500px] animate-in slide-in-from-bottom-10 fade-in duration-200">
          <div className="bg-muted/50 p-4 border-b flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MessageCircle className="size-5 text-primary" />
              <span className="font-semibold">Asistente Financiero</span>
            </div>
            <button
              onClick={toggleChat}
              className="text-muted-foreground hover:text-foreground transition-colors p-1"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[200px]">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-muted rounded-bl-none border'
                  }`}
                >
                  {msg.role === 'model' ? (
                    <span className="whitespace-pre-wrap">{renderMessageText(msg.text)}</span>
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted p-3 rounded-2xl rounded-bl-none border flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:75ms]" />
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:150ms]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t bg-muted/30 flex gap-2">
            <input
              type="text"
              placeholder="Pregunta sobre finanzas..."
              className="flex-1 bg-background border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded-xl transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={toggleChat}
        className={`${
          isChatOpen ? 'bg-muted' : 'bg-primary hover:bg-primary/90'
        } text-primary-foreground p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center`}
      >
        {isChatOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}
