import React from 'react'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { ChevronDown, FileText, GraduationCap, LayoutDashboard, PenBox, StarsIcon } from 'lucide-react'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from './ui/dropdown-menu'
import { checkUser } from '../lib/checkUser'

const Header = async() => {
 await checkUser();
  return (
    <div className='w-screen h-20'>
      <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">

        <nav className='flex justify-between items-center p-4 '>
          <Link href="/">AI</Link>
          <div className='space-x-2 md:space-x-6'>
            <SignedIn>
              <SignInButton >
                <Link href={"/dashboard"}>
                  <Button>
                    <LayoutDashboard className='w-7 h-7' />
                    <div className='hidden md:block'>Industry Insights</div>
                  </Button>
                </Link>
              </SignInButton>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button>
                    <StarsIcon className='w-7 h-7' />
                    <div className='hidden md:block'>Growth Tools</div>
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={"/resume"} className='flex items-center space-x-2'>
                      <FileText className='w-7 h-7' />
                      <span>Build Resume</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={"/ai-cover-letter"} className='flex items-center space-x-2'>
                      <PenBox className='w-7 h-7' />
                      <span>AI Cover Letter</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={"/interview"} className='flex items-center space-x-2'>
                      <GraduationCap className='w-7 h-7' />
                      <span>Network</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <UserButton apperance={{
                elements: {
                  avatarBox: "h-10 w-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-extrabold text-lg",
                }
              }} />
            </SignedIn>
            <SignedOut>
              <SignInButton >
                <Button variant="outline">Sign In</Button>
              </SignInButton>

            </SignedOut>
          </div>
          {/* <SignedOut>
            <SignInButton />
            <SignUpButton>
              <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn> */}



        </nav>
      </header>
    </div>
  )
}

export default Header