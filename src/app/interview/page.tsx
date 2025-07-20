import React from 'react'
import Agent from "@/components/Agent";

const Page = () => {
    return (
        <>
            <h3 className="text-center mt-8">Interview Generation</h3>
            <Agent userName="you" userId="user1" type="generate"/>
        </>
    )
}

export default Page;