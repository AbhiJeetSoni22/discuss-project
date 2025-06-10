'use client'
import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';
const AuthHeader = () => {
    const session = useSession();
    if(!session?.data?.user){
        return <></>; // If no user data, return empty fragment
    }
   let authContext : React.ReactNode;
    if(session.data?.user){
        authContext =
          <Popover>
            <PopoverTrigger asChild>
              <Avatar>
                <AvatarImage src={session.data.user.image || ""} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent>
              <h1>{session.data.user.name}</h1>
              <Separator className="my-2" />
              <Button className="cursor-pointer" type="button" onClick={() => signOut()}>
                <LogOut /> Logout
              </Button>
            </PopoverContent>
          </Popover>
        
    }
    else{
      authContext =  (
          <>
            <Button type="button" variant={"outline"} onClick={() => signIn()}>
              Sign In
            </Button>
            <Button type="button" onClick={() => signIn()}>
              Sign Up
            </Button>
          </>
        )
    }
  return authContext;
}

export default AuthHeader
