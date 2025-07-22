'use client';
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { cn } from "@/lib/utils"; // Assuming you're using a cn utility function
import { useRouter } from 'next/navigation';
import { vapi } from "@/lib/vapi.sdk";

enum CallStatus {
  INACTIVE = 'INACTIVE',
  CONNECTING = 'CONNECTING',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
}

interface AgentProps {
  userName: string;
  userId?: string;
  type?: string;
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

interface Message {
  type: string;
  transcriptType?: string;
  role: "user" | "system" | "assistant";
  transcript: string;
}

const Agent = ({ userName,userId,type}: AgentProps) => { 
  const router = useRouter();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED);
    const onMessage = (message: Message) => {
      if (message.type === 'transcript' && message.transcriptType === 'final') {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]);
      }
    };
    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd= () => setIsSpeaking(false);

    const onError = (error:Error) =>console.log('Error',error);

    vapi.on('call-start',onCallStart);
    vapi.on('call-end', onCallEnd);
    vapi.on('message', onMessage);
    vapi.on('speech-start', onSpeechStart);
    vapi.on('speech-end' , onSpeechEnd);
    vapi.on('error', onError);

    return() =>{
        vapi.off('call-start',onCallStart);
    vapi.off('call-end', onCallEnd);
    vapi.off('message', onMessage);
    vapi.off('speech-start', onSpeechStart);
    vapi.off('speech-end' , onSpeechEnd);
    vapi.off('error', onError);
    }
  }, []);

  useEffect(() => {
    if (callStatus === CallStatus.FINISHED) {
      router.push('/dashboard');
    }
  }, [callStatus, router,type,userId,messages]);

  const handleCall = async () => {
    
      setCallStatus(CallStatus.CONNECTING);
      await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
        variableValues: {
          username: userName,
          userid: userId,
        }
      
      })
  };

  const handleDisconnect = async () => {
    
      setCallStatus(CallStatus.FINISHED);
      vapi.stop();
    
  };

  const latestMessage = messages[messages.length - 1]?.content;
  const isCallInactiveOrFinished = callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED;
  // Mock data for demonstration - remove this when you have real data
  // const mockMessages = [
  //   'Whats your name?',
  //   'My name is John Doe, nice to meet you!'
  // ];
  
  // // Use real messages if available, otherwise use mock data
  // const displayMessages = messages.length > 0 ? messages.map(m => m.content) : mockMessages;
  // const lastMessage = displayMessages[displayMessages.length - 1];

  // const handleCallAction = () => {
  //   if (callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED) {
  //     setCallStatus(CallStatus.CONNECTING);
  //     // Add your call start logic here
  //     setTimeout(() => {
  //       setCallStatus(CallStatus.ACTIVE);
  //     }, 2000); // Simulate connection delay
  //   } else if (callStatus === CallStatus.ACTIVE) {
  //     setCallStatus(CallStatus.FINISHED);
  //     // Add your call end logic here
  //   }
  // };

  return (
    <>
      {/* First Container - Call View */}
      <div className="mt-8 mb-6 my-20 mx-20">
        <div className="call-view">
          <div className="card-interviewer">
            <div className="avatar">
              <Image
                src="/ai-avatar.png"
                alt="vapi"
                width={65}
                height={54}
                className="object-cover"
              />
              {isSpeaking && <span className="animate-speak"></span>}
            </div>
            <h3>AI Interviewer</h3>
          </div>
          <div className="card-border">
            <div className="card-content">
              <Image
                src="/user-avatar.png"
                alt="user avatar"
                width={540}
                height={540}
                className="rounded-full object-cover size-[120px]"
              />
              <h3>{userName}</h3>
            </div>
          </div>
        </div>
      </div>
     
      {/* Second Container - Messages and Button with margin top */}
      <div className="mt-10 mb-8 my-20 mx-20">
        {messages.length > 0 && (
          <div className="transcript-border mt-6">
            <div className="transcript">
              <p
                key={latestMessage}
                className={cn('transition-opacity duration-500 opacity-0', 'animate-fadeIn opacity-100')}
              >
                {latestMessage}
              </p>
            </div>
          </div>
        )}
       
        <div className="w-full flex justify-center mt-8">
          {callStatus !== CallStatus.ACTIVE ? (
            <button 
              className="relative btn-call" onClick={handleCall}
              // onClick={handleCallAction}
              // disabled={callStatus === CallStatus.CONNECTING}
            >
              <span
                className={cn(
                  'absolute animate-ping rounded-full opacity-75',
                  callStatus !== CallStatus.CONNECTING && 'hidden'
                )}
              ></span>
              <span>
                {isCallInactiveOrFinished ? 'Call' : '. . .'}
              </span>
            </button>
          ) : (
            <button 
              className="btn-disconnect"
              onClick={handleDisconnect}
            >
              End
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Agent;