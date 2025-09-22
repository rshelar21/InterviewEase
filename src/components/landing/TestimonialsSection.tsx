import Marquee from 'react-fast-marquee';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Software Engineer at Google',
    avatar: '/professional-woman-headshot.png',
    content:
      'InterviewEase helped me land my dream job at Google. The AI feedback was incredibly detailed and helped me improve my technical communication skills.',
    rating: 5,
  },
  {
    name: 'Marcus Johnson',
    role: 'Product Manager at Microsoft',
    avatar: '/professional-man-headshot.png',
    content:
      'The mock interviews felt so realistic. I went into my actual interview feeling confident and prepared. Highly recommend!',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Data Scientist at Amazon',
    avatar: '/latina-professional-headshot.png',
    content:
      'The industry-specific questions were spot on. I practiced scenarios that came up in my actual interviews. Game changer!',
    rating: 5,
  },
];
export function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-muted/30 py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-balance sm:text-5xl">
            Loved by{' '}
            <span className="from-primary to-accent bg-gradient-to-r bg-clip-text text-transparent">
              professionals
            </span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg text-balance">
            See what our users say about their interview success stories.
          </p>
        </div>
        <div>
          <Marquee
            // gradient={true}
            // gradientColor="#0e0e13"
            // gradientWidth={10}
            className="relative mx-auto h-full min-h-[150px] w-full"
          >
            <div className="flex items-center gap-7">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full max-w-[450px] flex-shrink-0">
                  <Card className="border-border">
                    <CardContent className="p-6">
                      <div className="mb-4 flex items-center">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <p className="text-foreground mb-6 leading-relaxed">
                        &quot;{testimonial.content}&quot;
                      </p>
                      <div className="flex items-center">
                        <Avatar className="mr-3 h-10 w-10">
                          <AvatarImage
                            src={testimonial.avatar || '/placeholder.svg'}
                            alt={testimonial.name}
                          />
                          <AvatarFallback>
                            {testimonial.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-foreground font-semibold">
                            {testimonial.name}
                          </div>
                          <div className="text-muted-foreground text-sm">
                            {testimonial.role}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </Marquee>
        </div>
      </div>
    </section>
  );
}
