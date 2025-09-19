import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail, User, Calendar } from 'lucide-react';
import { PageHeading } from '@/components/common';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getUserInfo } from '@/data/user';
import { format } from 'date-fns';
import { UserResumeSection } from '@/components/profile';
import { APP_ROUTES } from '@/constants';

const ProfilePage = async () => {
  const user = await getUserInfo();

  return (
    <div>
      <PageHeading
        breadcrumbs={[
          {
            href: APP_ROUTES.DASHBOARD,
            label: 'Dashboard',
          },
          {
            label: 'Profile',
            href: APP_ROUTES.PROFILE,
          },
        ]}
        title="Your Profile"
        subTitle="Manage your profile and track your interview preparation progress"
      />

      <div>
        <Card>
          <CardContent className="flex flex-col items-start gap-4 lg:flex-row">
            <div className="bg-background/30 border-border h-fit w-fit rounded-full border p-1.5">
              <Avatar className="size-24">
                <AvatarImage
                  src={`${user?.image}`}
                  alt={user?.name || 'user-image'}
                />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-300">{user?.name}</h1>

              <div className="flex flex-wrap items-start gap-2 md:gap-4">
                <div className="flex items-center gap-2 py-1 text-gray-400">
                  <Mail className="size-4" />
                  <span>{user?.email}</span>
                </div>

                <div className="flex items-center gap-2 py-1 text-gray-400">
                  <Calendar className="size-4" />
                  <span>
                    Joined{' '}
                    {user?.createdAt && format(user?.createdAt, 'MMM, yyyy')}
                  </span>
                </div>
              </div>

              <Separator className="my-6" />

              <UserResumeSection />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
