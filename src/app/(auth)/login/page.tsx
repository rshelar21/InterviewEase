import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Github, Mail, MoveLeft, Target, Users } from 'lucide-react';
import Link from 'next/link';
import { signIn } from '@/lib/auth';

const AuthPage = async () => {
  return (
    <div className="from-background to-background relative h-screen w-full overflow-hidden bg-gradient-to-br via-[#1a1a22]/50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_30%,rgba(120,119,198,0.05)_50%,transparent_70%)]" />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(245,247,250,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(245,247,250,0.02)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_40%,transparent_100%)] bg-[size:20px_20px]" />
      <div className="absolute top-3 left-3">
        <Link href="/">
          <Button variant="outline" size="sm">
            <MoveLeft />
            Back
          </Button>
        </Link>
      </div>
      <div className="flex h-full items-center justify-center bg-transparent px-4">
        <div className="flex flex-col gap-10">
          <Card className="z-50 w-full border bg-transparent shadow-sm hover:shadow-lg md:max-w-lg">
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
                  <Button
                    variant="default"
                    className="h-12 w-full cursor-pointer"
                    size="lg"
                  >
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
            <div className="text-muted-foreground flex flex-wrap items-center justify-center gap-4 space-x-6">
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
                <span className="text-xs">50K+ interviews</span>
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
