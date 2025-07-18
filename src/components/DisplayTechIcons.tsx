import React from 'react'
import Image from 'next/image'
import { getTechLogos } from '@/lib/utils';
import cn from 'classnames';
// interface TechIconProps {
//   techStack: string;
// }

const DisplayTechIcons = async ({ techStack }: TechIconProps) => {
  const techIcons = await getTechLogos(techStack);
  
  return (
    <div className="flex flex-row gap-2">
      {techIcons.slice(0, 3).map(({ tech, url }, index) => (
        <div 
          key={tech}
          className={cn("relative group bg-dark-300 rounded-full p-2 flex-center", index >=1 && '-ml-3')}
        >
            <span className="tech-tooltip ">
            {tech}
          </span>
          <Image
            src={url}
            alt={tech}
            width={24}
            height={24}
            className="object-contain"
          />
          
        </div>
      ))}
    </div>
  )
}

export default DisplayTechIcons;