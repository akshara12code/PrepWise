import React from 'react';
import Agent from "@/components/Agent";
import Image from 'next/image';
import { getCurrentUser } from '@/lib/actions/auth.action';

const InterviewPage = async () => {
  const user = await getCurrentUser();

  return (
    <>
      <div className="flex items-center mt-8 mb-4 ml-8">
        <Image src="/logo.svg" alt="PrepWise Logo" width={48} height={48} />
        <span className="ml-3 text-2xl font-bold text-primary-100">PrepWise</span>
      </div>
      <h3 className="text-center mt-8">Interview Generation</h3>
      {/* Pass user props to Agent */}
      <Agent userName={user?.name} userId={user?.id} type="generate" />
    </>
  );
};

export default InterviewPage;