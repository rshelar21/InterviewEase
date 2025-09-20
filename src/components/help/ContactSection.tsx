'use client';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpenText, LoaderCircle, NotebookText, Send } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { createSupportQuery } from '@/actions';
import { toast } from 'sonner';

const formSchema = z.object({
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

export const ContactSection = () => {
  const [isLoading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: '',
      description: '',
    },
  });

  async function handleFormSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    try {
      await createSupportQuery(values);
      toast.success('Message Submitted');

      form.reset();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-balance sm:text-4xl">
            Contact{' '}
            <span className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-transparent">
              Us
            </span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl text-balance">
            We typically respond within 24 hours during business days.
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-4">
          <Card>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleFormSubmit)}
                  className="space-y-6"
                >
                  {/* Subject */}
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <BookOpenText className="size-4" />
                          Subject
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter subject" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Description */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <NotebookText className="size-4" />
                          Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter description"
                            className="max-h-[120px] min-h-[120px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="button"
                    disabled={isLoading}
                    onClick={form.handleSubmit(handleFormSubmit)}
                    className="w-full"
                  >
                    Send Message
                    {isLoading ? (
                      <LoaderCircle className="size-4 animate-spin" />
                    ) : (
                      <Send className="size-4" />
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
