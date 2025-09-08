import { Button } from '@/components/ui/button';
import { signOut } from '@/lib/auth';

const DashboardPage = async () => {
  return (
    <div>
      <form
        action={async () => {
          'use server';
          await signOut({ redirectTo: '/' });
        }}
      >
        <Button>Sign Out</Button>
      </form>
    </div>
  );
};

export default DashboardPage;
