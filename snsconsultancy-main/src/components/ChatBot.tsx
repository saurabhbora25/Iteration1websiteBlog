import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, X, Send, Bot, User, ExternalLink } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { sendChatPrompt } from '@/integrations/chatApi';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  actions?: {
    label: string;
    action: () => void;
  }[];
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
           content:
        "Hello! I'm your Study Abroad Assistant. I can help you with information about studying in EU countries, costs, universities, and requirements. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [apikey, setApikey] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
     const stored = localStorage.getItem('chatApiKey');
    const envKey = import.meta.env.VITE_CHAT_API_KEY as string | undefined;
    if (stored) {
      setApiKey(stored);
    } else if (envKey) {
      setApiKey(envKey);
    }
    


      
      


Ready to get started?`,
        actions: [
          {
            label: 'Book Free Consultation',
            action: () => handleBookCall()
          },
          {
            label: 'View All Pricing',
            action: () => {
              setIsOpen(false);
              setTimeout(() => {
                document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
              }, 300);
            }
          }
        ]
      };
    }
    
    // Greeting responses
    if (input.includes('hello') || input.includes('hi') || input.includes('hey') || input === '') {
      return {
        content: `Hello! I'm here to help you with studying in Europe. I can provide information about:

🌍 Country overviews and costs
🎓 University recommendations  
📋 Admission requirements
📝 Visa processes
💼 Our services and pricing

What would you like to know about?`,
        actions: [
          {
            label: 'Compare Countries',
            action: () => handleQuickQuery('cost comparison')
          },
          {
            label: 'Book Consultation',
            action: () => handleBookCall()
          }
        ]
      };
    }
    
    // Default response
    return {
      content: `I'd be happy to help! I specialize in EU study abroad information. You can ask me about:

• Specific countries (Germany, France, Hungary, Croatia, Denmark)
• University costs and living expenses  
• Top universities and programs
• Admission requirements
• Visa processes
• Our consultation services
 const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setApiKey(value);
    localStorage.setItem('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', value); 
 }; 


  const handleQuickQuery = (query: string) => {
    setInputValue(query);
    handleSendMessage(query);
  };

  const handleBookCall = (country?: string) => {
    const event = new CustomEvent('openBookingModal', {
      detail: { selectedCountry: country }
    });
    window.dispatchEvent(event);
    setIsOpen(false);
  };
    
  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputValue.trim();
    if (!text) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

        if (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) {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: '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',
        timestamp: new Date()
      };
        
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
   return;
  };
try {
      const reply = await sendChatPrompt(text, apiKey);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: reply,
        timestamp: new Date()
      };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full shadow-lg btn-hover-lift bg-primary hover:bg-primary-hover"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-40 w-96 h-[500px] flex flex-col shadow-2xl modal-backdrop">
          <CardHeader className="flex flex-row items-center justify-between py-3 px-4 border-b">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-sm">Study Abroad Assistant</CardTitle>
                <p className="text-xs text-muted-foreground">EU Education Expert</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          {/* Messages Area */}
          <CardContent className="flex-1 p-0">
            <ScrollArea className="h-full p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.type === 'bot' && (
                          <Bot className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                        )}
                        {message.type === 'user' && (
                          <User className="h-4 w-4 mt-0.5 text-primary-foreground shrink-0" />
                        )}
                        <div className="space-y-2">
                          <p className="text-sm whitespace-pre-line">{message.content}</p>
                          {message.actions && (
                            <div className="flex flex-wrap gap-1">
                              {message.actions.map((action, idx) => (
                                <Button
                                  key={idx}
                                  variant="outline"
                                  size="sm"
                                  onClick={action.action}
                                  className="text-xs h-7"
                                >
                                  {action.label}
                                  {action.label.includes('Book') && (
                                    <ExternalLink className="ml-1 h-3 w-3" />
                                  )}
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                      <div className="flex items-center space-x-2">
                        <Bot className="h-4 w-4 text-primary" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </ScrollArea>
          </CardContent>

          {/* Input Area */}
          <div className="border-t p-3">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about studying in EU..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button
                onClick={() => handleSendMessage()}
                size="icon"
                disabled={!inputValue.trim() || isTyping}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-1 mt-2">
              <Badge
                variant="secondary"
                className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => handleQuickQuery('cost comparison')}
              >
                Compare Costs
              </Badge>
              <Badge
                variant="secondary"
                className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => handleQuickQuery('Germany')}
              >
                Germany
              </Badge>
              <Badge
                variant="secondary"
                className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => handleBookCall()}
              >
                Book Call
              </Badge>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default ChatBot;
