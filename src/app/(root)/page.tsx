import React from 'react';
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { dummyInterviews } from '../../../constants'; // Fixed import path
import InterviewCard from '@/components/InterviewCard';

const Page = () => {
  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
          <p className="text-lg">
            Practice on real interview questions & get instant feedback
          </p>
          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>
        <Image
          src="/robot.png"
          width={400}
          height={400}
          alt="AI Robot"
          className="max-sm:hidden"
        />
      </section>
     
      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interview</h2>
        <div className="interviews-section">
          {dummyInterviews.length > 0 ? (
            dummyInterviews.map((interview) => (
              <InterviewCard
                key={interview.id}
                interviewId={interview.id}
                userId="user1" // Add actual user ID here
                role={interview.role}
                type={interview.type || "Mixed"} // Add type or default to "Mixed"
                techstack={interview.techstack}
                createdAt={interview.createdAt || new Date().toISOString()} // Add createdAt or default to current date
              />
            ))
          ) : (
            <p>You haven&apos;t taken any Interviews yet</p>
          )}
        </div>
      </section>
     
      <section className="flex flex-col gap-6 mt-8">
        <h2>Take an Interview</h2>
        <div className="interview-section">
          {dummyInterviews.length > 0 ? (
            dummyInterviews.map((interview) => (
              <InterviewCard
                key={interview.id}
                interviewId={interview.id}
                userId="user1" // Add actual user ID here
                role={interview.role}
                type={interview.type || "Mixed"} // Add type or default to "Mixed"
                techstack={interview.techstack}
                createdAt={interview.createdAt || new Date().toISOString()} // Add createdAt or default to current date
              />
            ))
          ) : (
            <p>There are no Interviews available</p>
          )}
        </div>
      </section>
    </>
  )
}

export default Page;