// 'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Github, Mail, Target, Users } from 'lucide-react';
// import { userSignIn } from '@/actions/userSignIn';
import { signIn } from '@/lib/auth';

const AuthPage = async () => {
  return (
    <div className="h-screen w-full">
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col gap-10">
          <Card className="w-full max-w-lg border shadow-sm hover:shadow-lg">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
              <CardDescription className="text-muted-foreground text-balance">
                Sign in to continue your interview preparation journey
              </CardDescription>
            </CardHeader>
            <CardContent className="">
              <div className="space-y-4">
                <form
                  action={async () => {
                    'use server';
                    await signIn('google', { redirectTo: '/dashboard' });
                  }}
                >
                  <Button variant="default" className="h-12 w-full" size="lg">
                    Sign in with Google
                    <Mail className="ml-2 size-4" />
                  </Button>
                </form>
                <form
                  action={async () => {
                    'use server';
                    await signIn('github', { redirectTo: '/dashboard' });
                  }}
                >
                  <Button size="lg" variant="default" className="h-12 w-full">
                    Sign in with Github
                    <Github className="ml-2 size-4" />
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4 text-center">
            <div className="text-muted-foreground flex items-center justify-center space-x-6">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span className="text-xs">10k+ users</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4" />
                <span className="text-xs">95% success rate</span>
              </div>
              <div className="flex items-center space-x-2">
                <Briefcase className="h-4 w-4" />
                <span className="text-xs">500+ companies</span>
              </div>
            </div>
            <p className="text-muted-foreground text-xs">
              Trusted by professionals at top companies worldwide
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
