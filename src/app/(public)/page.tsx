import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function Home() {
  return (
    <div className="h-screen">
      <nav className="flex items-center justify-between px-4 py-2">
        <h2 className="text-2xl font-semibold">InterviewEaze</h2>
        <Link href="/login">
          <Button variant="default" className="cursor-pointer">
            Sign In
          </Button>
        </Link>
      </nav>
    </div>
  );
}
