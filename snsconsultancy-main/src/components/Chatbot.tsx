diff --git a/snsconsultancy-main/src/components/ChatBot.tsx b/snsconsultancy-main/src/components/ChatBot.tsx
index f56f6b96ce5fc722324390ac4aa78bfc1ae25077..90d35cded0eec5a927feea799725d40f9b008591 100644
--- a/snsconsultancy-main/src/components/ChatBot.tsx
+++ b/snsconsultancy-main/src/components/ChatBot.tsx
@@ -1,536 +1,189 @@
 import { useState, useRef, useEffect } from 'react';
 import { Button } from '@/components/ui/button';
 import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
 import { Input } from '@/components/ui/input';
 import { Badge } from '@/components/ui/badge';
 import { MessageCircle, X, Send, Bot, User, ExternalLink } from 'lucide-react';
 import { ScrollArea } from '@/components/ui/scroll-area';
+import { sendChatPrompt } from '@/integrations/chatApi';
 
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
 
-interface CountryInfo {
-  name: string;
-  flag: string;
-  tuition: number;
-  living: number;
-  total: number;
-  overview: string;
-  universities: string[];
-  requirements: string[];
-  benefits: string[];
-}
-
-const countries: { [key: string]: CountryInfo } = {
-  germany: {
-    name: 'Germany',
-    flag: '🇩🇪',
-    tuition: 300,
-    living: 11000,
-    total: 11300,
-    overview: 'Germany offers world-class education with minimal tuition fees, making it one of the most affordable destinations for international students. The country has a strong economy, excellent research facilities, and provides great work opportunities during and after studies.',
-    universities: ['Technical University of Munich', 'University of Heidelberg', 'RWTH Aachen University', 'Humboldt University Berlin', 'University of Freiburg'],
-    requirements: ['APS Certificate (mandatory)', 'IELTS 6.5+ or TOEFL 90+', 'Academic transcripts', 'Blocked account (€11,208)', 'Health insurance'],
-    benefits: ['Extremely low tuition fees', '18-month post-study work visa', 'Strong job market', 'EU residence pathway', 'High quality of life']
-  },
-  france: {
-    name: 'France',
-    flag: '🇫🇷',
-    tuition: 3000,
-    living: 12000,
-    total: 15000,
-    overview: 'France is renowned for its prestigious universities and rich cultural heritage. With world-class education in arts, sciences, and business, France offers an exceptional study experience in the heart of Europe.',
-    universities: ['Sorbonne University', 'École Normale Supérieure', 'Sciences Po Paris', 'University of Lyon', 'École Polytechnique'],
-    requirements: ['DELF/DALF B2 or IELTS 6.5+', 'Campus France application', 'Academic transcripts', 'Financial proof (€615/month)', 'Health insurance'],
-    benefits: ['Prestigious universities', 'Rich cultural experience', 'Central European location', 'Strong research opportunities', 'Gateway to Europe']
-  },
-  hungary: {
-    name: 'Hungary',
-    flag: '🇭🇺',
-    tuition: 1500,
-    living: 8000,
-    total: 9500,
-    overview: 'Hungary offers excellent value for money with affordable education and living costs. Located in Central Europe, it provides EU degree recognition and access to the entire European job market.',
-    universities: ['University of Debrecen', 'Eötvös Loránd University', 'Budapest University of Technology', 'University of Szeged', 'Corvinus University'],
-    requirements: ['IELTS 6.0+ or equivalent', 'High school diploma', 'Entrance exam (some programs)', 'Financial proof', 'Health insurance'],
-    benefits: ['Very affordable costs', 'EU degree recognition', 'Central European location', 'Growing tech sector', 'Scholarship opportunities']
-  },
-  croatia: {
-    name: 'Croatia',
-    flag: '🇭🇷',
-    tuition: 2000,
-    living: 9000,
-    total: 11000,
-    overview: 'Croatia combines beautiful Mediterranean coastline with quality education. As a newer EU member, it offers great opportunities in a growing economy with stunning natural beauty.',
-    universities: ['University of Zagreb', 'University of Split', 'University of Rijeka', 'University of Osijek', 'University of Dubrovnik'],
-    requirements: ['IELTS 6.0+ or equivalent', 'Academic transcripts', 'Letter of motivation', 'Health certificate', 'Financial proof'],
-    benefits: ['Beautiful coastal cities', 'Growing IT and tourism sectors', 'EU membership benefits', 'Moderate living costs', 'English-taught programs']
-  },
-  denmark: {
-    name: 'Denmark',
-    flag: '🇩🇰',
-    tuition: 0,
-    living: 15000,
-    total: 15000,
-    overview: 'Denmark offers free education for EU students and is known for its high quality of life, innovative teaching methods, and strong social support system. Perfect for students seeking a progressive, English-friendly environment.',
-    universities: ['University of Copenhagen', 'Technical University of Denmark', 'Aarhus University', 'Aalborg University', 'Copenhagen Business School'],
-    requirements: ['IELTS 6.5+ or equivalent', 'Academic transcripts', 'Letter of motivation', 'Financial documentation (€1,000/month)', 'EU health insurance'],
-    benefits: ['Free tuition for EU students', 'Highest quality of life', 'Strong social support', 'Many English programs', 'Progressive society']
-  }
-};
-
 const ChatBot = () => {
   const [isOpen, setIsOpen] = useState(false);
   const [messages, setMessages] = useState<Message[]>([
     {
       id: '1',
       type: 'bot',
-      content: "Hello! I'm your Study Abroad Assistant. I can help you with information about studying in EU countries, costs, universities, and requirements. What would you like to know?",
+      content:
+        "Hello! I'm your Study Abroad Assistant. I can help you with information about studying in EU countries, costs, universities, and requirements. What would you like to know?",
       timestamp: new Date()
     }
   ]);
   const [inputValue, setInputValue] = useState('');
+  const [apiKey, setApiKey] = useState('');
   const [isTyping, setIsTyping] = useState(false);
   const messagesEndRef = useRef<HTMLDivElement>(null);
 
-  const scrollToBottom = () => {
-    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
-  };
-
   useEffect(() => {
-    scrollToBottom();
-  }, [messages]);
-
-  const generateResponse = (userInput: string): { content: string; actions?: any[] } => {
-    const input = userInput.toLowerCase().trim();
-    
-    // Country-specific queries
-    for (const [key, country] of Object.entries(countries)) {
-      if (input.includes(key) || input.includes(country.name.toLowerCase())) {
-        if (input.includes('cost') || input.includes('price') || input.includes('fee') || input.includes('expense')) {
-          return {
-            content: `Here's the cost breakdown for **${country.name}** ${country.flag}:
-
-📚 **Tuition Fees:** €${country.tuition.toLocaleString()}/year
-🏠 **Living Costs:** €${country.living.toLocaleString()}/year
-💰 **Total Annual Cost:** €${country.total.toLocaleString()}
-
-${country.overview}
-
-Would you like more details about universities or requirements?`,
-            actions: [
-              {
-                label: 'View Universities',
-                action: () => handleQuickQuery(`universities in ${country.name}`)
-              },
-              {
-                label: 'Book Consultation',
-                action: () => handleBookCall(country.name)
-              }
-            ]
-          };
-        }
-        
-        if (input.includes('universit') || input.includes('college') || input.includes('school')) {
-          return {
-            content: `Top universities in **${country.name}** ${country.flag}:
-
-${country.universities.map((uni, idx) => `${idx + 1}. ${uni}`).join('\n')}
-
-These institutions offer excellent programs with international recognition. Would you like information about admission requirements?`,
-            actions: [
-              {
-                label: 'Admission Requirements',
-                action: () => handleQuickQuery(`requirements for ${country.name}`)
-              },
-              {
-                label: 'Book Consultation',
-                action: () => handleBookCall(country.name)
-              }
-            ]
-          };
-        }
-        
-        if (input.includes('requirement') || input.includes('admission') || input.includes('apply') || input.includes('application')) {
-          return {
-            content: `Admission requirements for **${country.name}** ${country.flag}:
-
-${country.requirements.map((req, idx) => `✅ ${req}`).join('\n')}
-
-**Key Benefits:**
-${country.benefits.slice(0, 3).map((benefit, idx) => `⭐ ${benefit}`).join('\n')}
-
-Ready to start your application process?`,
-            actions: [
-              {
-                label: 'Get Cost Details',
-                action: () => handleQuickQuery(`costs in ${country.name}`)
-              },
-              {
-                label: 'Book Consultation',
-                action: () => handleBookCall(country.name)
-              }
-            ]
-          };
-        }
-        
-        // General country info
-        return {
-          content: `Here's an overview of studying in **${country.name}** ${country.flag}:
-
-${country.overview}
-
-**Quick Facts:**
-💰 Total annual cost: €${country.total.toLocaleString()}
-🎓 Top universities: ${country.universities.slice(0, 2).join(', ')} and more
-✨ Key benefits: ${country.benefits.slice(0, 2).join(', ')}
-
-What specific aspect would you like to explore?`,
-          actions: [
-            {
-              label: 'View Costs',
-              action: () => handleQuickQuery(`costs in ${country.name}`)
-            },
-            {
-              label: 'See Universities',
-              action: () => handleQuickQuery(`universities in ${country.name}`)
-            },
-            {
-              label: 'Book Consultation',
-              action: () => handleBookCall(country.name)
-            }
-          ]
-        };
-      }
+    const stored = localStorage.getItem('chatApiKey');
+    const envKey = import.meta.env.VITE_CHAT_API_KEY as string | undefined;
+    if (stored) {
+      setApiKey(stored);
+    } else if (envKey) {
+      setApiKey(envKey);
     }
-    
-    // General queries
-    if (input.includes('cost') || input.includes('price') || input.includes('fee') || input.includes('cheap') || input.includes('affordable')) {
-      return {
-        content: `Here's a cost comparison of popular EU destinations:
-
-🇭🇺 **Hungary:** €9,500/year (most affordable)
-🇭🇷 **Croatia:** €11,000/year  
-🇩🇪 **Germany:** €11,300/year
-🇩🇰 **Denmark:** €15,000/year (free tuition for EU students)
-🇫🇷 **France:** €15,000/year
-
-Which country interests you most?`,
-        actions: [
-          {
-            label: 'Germany Details',
-            action: () => handleQuickQuery('Germany costs')
-          },
-          {
-            label: 'Hungary Details', 
-            action: () => handleQuickQuery('Hungary costs')
-          },
-          {
-            label: 'Compare All',
-            action: () => handleBookCall()
-          }
-        ]
-      };
-    }
-    
-    if (input.includes('universit') || input.includes('college') || input.includes('school') || input.includes('best')) {
-      return {
-        content: `Here are some top-rated universities across EU countries:
-
-🇩🇪 **Germany:** Technical University of Munich, University of Heidelberg
-🇫🇷 **France:** Sorbonne University, Sciences Po Paris
-🇭🇺 **Hungary:** University of Debrecen, Eötvös Loránd University  
-🇩🇰 **Denmark:** University of Copenhagen, Technical University of Denmark
-🇭🇷 **Croatia:** University of Zagreb, University of Split
-
-Which country's education system interests you?`,
-        actions: [
-          {
-            label: 'Germany Universities',
-            action: () => handleQuickQuery('Germany universities')
-          },
-          {
-            label: 'France Universities',
-            action: () => handleQuickQuery('France universities') 
-          },
-          {
-            label: 'Book Consultation',
-            action: () => handleBookCall()
-          }
-        ]
-      };
-    }
-    
-    if (input.includes('requirement') || input.includes('admission') || input.includes('apply') || input.includes('ielts') || input.includes('toefl')) {
-      return {
-        content: `General admission requirements for EU universities:
-
-📝 **Language Proficiency:**
-- IELTS: 6.0-6.5+ (varies by country)
-- TOEFL: 80-90+ 
-- Some countries accept DUOLINGO
-
-📋 **Documents:**
-- Academic transcripts
-- Letter of motivation/SOP
-- Financial proof
-- Health insurance
-- Country-specific requirements (like Germany's APS)
-
-Which country are you targeting?`,
-        actions: [
-          {
-            label: 'Germany Requirements',
-            action: () => handleQuickQuery('Germany requirements')
-          },
-          {
-            label: 'IELTS Preparation',
-            action: () => handleBookCall()
-          },
-          {
-            label: 'Document Help',
-            action: () => handleBookCall()
-          }
-        ]
-      };
-    }
-    
-    if (input.includes('visa') || input.includes('immigration') || input.includes('residence')) {
-      return {
-        content: `EU Student Visa Information:
-
-📋 **General Process:**
-- Student visa application after university acceptance
-- Financial proof (varies by country: €7,000-15,000/year)
-- Health insurance mandatory
-- Processing time: 2-8 weeks
+  }, []);
 
-🏡 **Post-Study Options:**
-- Most EU countries offer 12-18 month job search visa
-- Path to permanent residence after 5 years
-- EU Blue Card for skilled workers
-
-Need help with visa applications?`,
-        actions: [
-          {
-            label: 'Visa Support Service',
-            action: () => handleBookCall()
-          },
-          {
-            label: 'Country-Specific Info',
-            action: () => handleQuickQuery('country visa requirements')
-          }
-        ]
-      };
-    }
-    
-    if (input.includes('service') || input.includes('help') || input.includes('assistance') || input.includes('package')) {
-      return {
-        content: `Our Study Abroad Services:
-
-🆓 **FREE for English-Speaking Countries**
-Complete assistance for USA, UK, Australia, Canada
-
-💼 **EU Countries Services:**
-- Document Prep & Test Prep: ₹10,000
-- University Selection: ₹10,000  
-- Visa Support: ₹10,000
-- Complete A-Z Package: ₹25,000 (Save ₹5,000!)
-
-🌟 All services include personalized guidance and 24/7 support.
-
-Ready to get started?`,
-        actions: [
-          {
-            label: 'Book Free Consultation',
-            action: () => handleBookCall()
-          },
-          {
-            label: 'View All Pricing',
-            action: () => {
-              setIsOpen(false);
-              setTimeout(() => {
-                document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
-              }, 300);
-            }
-          }
-        ]
-      };
-    }
-    
-    // Greeting responses
-    if (input.includes('hello') || input.includes('hi') || input.includes('hey') || input === '') {
-      return {
-        content: `Hello! I'm here to help you with studying in Europe. I can provide information about:
-
-🌍 Country overviews and costs
-🎓 University recommendations  
-📋 Admission requirements
-📝 Visa processes
-💼 Our services and pricing
-
-What would you like to know about?`,
-        actions: [
-          {
-            label: 'Compare Countries',
-            action: () => handleQuickQuery('cost comparison')
-          },
-          {
-            label: 'Book Consultation',
-            action: () => handleBookCall()
-          }
-        ]
-      };
-    }
-    
-    // Default response
-    return {
-      content: `I'd be happy to help! I specialize in EU study abroad information. You can ask me about:
-
-• Specific countries (Germany, France, Hungary, Croatia, Denmark)
-• University costs and living expenses  
-• Top universities and programs
-• Admission requirements
-• Visa processes
-• Our consultation services
+  useEffect(() => {
+    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
+  }, [messages]);
 
-Try asking something like "Tell me about studying in Germany" or "What are the costs for studying in EU?"`,
-      actions: [
-        {
-          label: 'Popular Countries',
-          action: () => handleQuickQuery('cost comparison')
-        },
-        {
-          label: 'Book Consultation',
-          action: () => handleBookCall()
-        }
-      ]
-    };
+  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
+    const value = e.target.value;
+    setApiKey(value);
+    localStorage.setItem('chatApiKey', value);
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
 
-  const handleSendMessage = (messageText?: string) => {
+  const handleSendMessage = async (messageText?: string) => {
     const text = messageText || inputValue.trim();
     if (!text) return;
 
-    // Add user message
     const userMessage: Message = {
       id: Date.now().toString(),
       type: 'user',
       content: text,
       timestamp: new Date()
     };
 
     setMessages(prev => [...prev, userMessage]);
     setInputValue('');
     setIsTyping(true);
 
-    // Simulate typing delay
-    setTimeout(() => {
-      const response = generateResponse(text);
+    if (!apiKey) {
       const botMessage: Message = {
         id: (Date.now() + 1).toString(),
         type: 'bot',
-        content: response.content,
-        timestamp: new Date(),
-        actions: response.actions
+        content: 'Please enter your API key.',
+        timestamp: new Date()
       };
+      setMessages(prev => [...prev, botMessage]);
+      setIsTyping(false);
+      return;
+    }
 
+    try {
+      const reply = await sendChatPrompt(text, apiKey);
+      const botMessage: Message = {
+        id: (Date.now() + 1).toString(),
+        type: 'bot',
+        content: reply,
+        timestamp: new Date()
+      };
       setMessages(prev => [...prev, botMessage]);
+    } catch (error) {
+      const botMessage: Message = {
+        id: (Date.now() + 1).toString(),
+        type: 'bot',
+        content: 'Sorry, something went wrong. Please try again later.',
+        timestamp: new Date()
+      };
+      setMessages(prev => [...prev, botMessage]);
+    } finally {
       setIsTyping(false);
-    }, 1000 + Math.random() * 1000); // 1-2 second delay
+    }
   };
 
   const handleKeyPress = (e: React.KeyboardEvent) => {
     if (e.key === 'Enter' && !e.shiftKey) {
       e.preventDefault();
       handleSendMessage();
     }
   };
 
   return (
     <>
-      {/* Chat Button */}
       {!isOpen && (
         <Button
           onClick={() => setIsOpen(true)}
           size="lg"
           className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full shadow-lg btn-hover-lift bg-primary hover:bg-primary-hover"
         >
           <MessageCircle className="h-6 w-6" />
         </Button>
       )}
 
-      {/* Chat Window */}
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
-                {messages.map((message) => (
+                {messages.map(message => (
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
diff --git a/snsconsultancy-main/src/components/ChatBot.tsx b/snsconsultancy-main/src/components/ChatBot.tsx
index f56f6b96ce5fc722324390ac4aa78bfc1ae25077..90d35cded0eec5a927feea799725d40f9b008591 100644
--- a/snsconsultancy-main/src/components/ChatBot.tsx
+++ b/snsconsultancy-main/src/components/ChatBot.tsx
@@ -538,89 +191,102 @@ Try asking something like "Tell me about studying in Germany" or "What are the c
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
-                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
-                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
+                          <div
+                            className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
+                            style={{ animationDelay: '0.1s' }}
+                          ></div>
+                          <div
+                            className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
+                            style={{ animationDelay: '0.2s' }}
+                          ></div>
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
-          <div className="border-t p-3">
+          <div className="border-t p-3 space-y-2">
+            <Input
+              type="password"
+              value={apiKey}
+              onChange={handleApiKeyChange}
+              placeholder="API Key"
+            />
             <div className="flex space-x-2">
               <Input
                 value={inputValue}
-                onChange={(e) => setInputValue(e.target.value)}
+                onChange={e => setInputValue(e.target.value)}
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
-            
+
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
 
-export default ChatBot;
+export default ChatBot;
+
