import * as React from "react"
import { Outlet } from "react-router-dom"
export default function HomePage() {
  return (
    <div>
      HomePage
      <pre>
        <code>
          {`
            // 忽略警告
            // eslint-disable-next-line react-hooks/exhaustive-deps 
            // eslint-disable-next-line react-hooks/exhaustive-deps
            import React, { useState, useEffect } from 'react'

            import { fetchUserAction } from '../api/actions.js'
            
            const UserContainer = () => {
              const [user, setUser] = useState(null);
            
              const handleUserFetch = async () => {
                const result = await fetchUserAction();
                setUser(result);
              };
            
              useEffect(() => {
                handleUserFetch();
                // 忽略警告
                // eslint-disable-next-line react-hooks/exhaustive-deps 
              }, []);
            
              if (!user) return <p>No data available.</p>
            
              return <UserCard data={user} />
            };
          `}
        </code>
      </pre>
      <Outlet></Outlet>
    </div>
  )
}
