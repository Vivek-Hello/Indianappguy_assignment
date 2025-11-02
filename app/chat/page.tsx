"use client";
import React,{useState} from 'react';

import { useRouter } from 'next/navigation';
import ChatIntake from '../components/ChatIntake';

const page = () => {
    const router = useRouter();
    const [loading,setLoading] = useState<boolean>(false);

    const handleComplete = async (data: Record<string, string>) => {
        try {
         
          
          // Send data as JSON (fields at root)
          setLoading(true);
          const res = await fetch('/api/generate-plan', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
          });
      
          // Check for server error
          if (!res.ok) {
            const errorDetails = await res.json();
            alert("There was a problem generating your plan.");
            return;
          }
      
          const plan = await res.json();
          setLoading(false);
          localStorage.setItem('latestPlan', JSON.stringify(plan));
          const localplan = localStorage.getItem('latestPlan');
        
          // Use router.push correctly if in async context
          router.push('/plan');
        } catch (error) {
          console.error('handleComplete error:', error);
          alert("An unexpected error occurred!");
        }
      };
      
    
  return (
    <div>
{loading ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
          <div className="animate-spin h-14 w-14 border-4 border-blue-500 rounded-full mb-6"></div>
          <h2 className="text-xl font-bold mb-2 text-blue-700 text-center">Generating your personalized plan...</h2>
          <p className="text-center text-gray-600">Please wait, this might take 10–20 seconds.<br/>You’ll be automatically redirected to your plan when it’s ready.</p>
        </div>
      ) : (
        <ChatIntake onComplete={handleComplete} />
      )}
    </div>
    
  );
}

export default page;
