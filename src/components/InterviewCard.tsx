import React from 'react'
import dayjs from 'dayjs'
import Image from 'next/image';
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getRandomInterviewCover } from "@/lib/utils"

import DisplayTechIcons from './DisplayTechIcons';

interface InterviewCardProps {
  interviewId: string;
  userId: string;
  role: string;
  type: string;
  techstack: string;
  createdAt: string;
}

// Mock function for feedback - replace with actual implementation later
const getFeedbackByInterviewId = async ({}) => {
  // Mock return data - replace with actual API call
  return null; // Return null to simulate no feedback yet
};

const InterviewCard = async ({ interviewId, userId, role, type, techstack, createdAt }: InterviewCardProps) => {
  const normalizedType = /mix/gi.test(type) ? 'Mixed' : type;
  const formattedDate = dayjs(createdAt).format("MMM D, YYYY");
 
  const feedback = userId && interviewId
    ? await getFeedbackByInterviewId({
        interviewId,
        userId,
      })
    : null;

  return (
    <div className="card-border w-[360px] max-sm:w-full min-h-96">
      <div className="card-interview">
        <div className="relative">
          {/* Type Badge */}
          <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600">
            <p className="badge-text">{normalizedType}</p>
          </div>
         
          {/* Cover Image */}
          <Image
            src={getRandomInterviewCover()}
            alt="cover-image"
            width={90}
            height={90}
            className="rounded-full object-cover size-[90px]"
          />
         
          {/* Interview Role */}
          <h3 className="mt-5 capitalize">{role} Interview</h3>
         
          {/* Date & Score */}
          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row gap-2">
              <Image
                src="/calendar.svg"
                width={22}
                height={22}
                alt="calendar"
              />
              <p>{formattedDate}</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <Image src="/star.svg" width={22} height={22} alt="star" />
              <p>{feedback?.totalScore || "---"}/100</p>
            </div>
          </div>
         
          {/* Feedback or Placeholder Text */}
          <p className="line-clamp-2 mt-5">
            {feedback?.finalAssessment ||
              "You haven't taken this interview yet. Take it now to improve your skills."}
          </p>
        </div>
        
        <div className="flex flex-row justify-between items-center mt-4">
         <DisplayTechIcons techStack={techstack ?? []}/>
          <Button className="btn-primary">
            <Link href={feedback ? `/interview/${interviewId}/feedback` : `/interview/${interviewId}`}>
              {feedback ? 'Check Feedback' : 'View Interview'}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default InterviewCard;