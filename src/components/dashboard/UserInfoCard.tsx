import { getUser } from '@/api/user/getUser';
import { Button } from '@/components/ui/button';
import { ChevronDown, LogOut, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOut } from '@/lib/auth';
import Link from 'next/link';
import { APP_ROUTES } from '@/constants';

export const UserInfoCard = async () => {
  const session = await getUser();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="border-none outline-none focus-visible:border-none"
        >
          <Button
            variant="ghost"
            className="flex items-center space-x-2 border-none p-2 outline-none focus-visible:border-none"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={`${session?.user?.image}`}
                // src="/placeholder.svg?height=32&width=32"
                alt={session?.user?.name || 'user-image'}
              />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="hidden flex-col items-start lg:flex">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {session?.user?.name}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {session?.user?.email}
              </span>
            </div>
            <ChevronDown className="hidden h-4 w-4 text-gray-500 lg:block" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={`${APP_ROUTES.PROFILE}`} className="flex w-full">
              <User className="mr-2 h-4 w-4" />
              Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600">
            <div className="w-full">
              <form
                action={async () => {
                  'use server';
                  await signOut({ redirectTo: '/' });
                }}
              >
                <Button
                  type="submit"
                  className="h-fit bg-transparent px-0 py-0 text-red-500 hover:bg-transparent has-[>svg]:px-0"
                >
                  <LogOut className="mr-2 h-4 w-4 px-0 text-red-500" />
                  Sign out
                </Button>
              </form>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
