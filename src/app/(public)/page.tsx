import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="h-screen bg-white text-black">
      <nav className="flex items-center justify-between px-4 py-2">
        <h2 className="text-2xl font-semibold">InterviewEaze</h2>
        <Button variant="default" className="cursor-pointer">
          Sign Up
        </Button>
      </nav>
    </div>
  );
}
