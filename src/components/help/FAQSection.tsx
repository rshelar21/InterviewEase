'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'Is InterviewEase really completely free?',
    answer:
      'Yes! InterviewEase is 100% free with no hidden costs, subscriptions, or premium tiers. We believe everyone deserves access to high-quality interview preparation, regardless of their financial situation.',
  },
  {
    question: 'How does the AI coaching work?',
    answer:
      'Our AI analyzes your responses, body language, and speech patterns to provide personalized feedback on areas like clarity, confidence, and technical accuracy. It learns from thousands of successful interviews to give you actionable insights.',
  },
  {
    question: 'Are there any limits on usage?',
    answer:
      'No limits at all! You can practice unlimited mock interviews, access all question banks, and use every feature as much as you need. We want you to succeed without any restrictions.',
  },
  {
    question: 'Can I practice for specific companies?',
    answer:
      'Yes! We have question banks tailored to specific companies like Google, Microsoft, Amazon, and many others. Our AI adapts the difficulty and style based on your target company and role.',
  },
  //   {
  //     question: "How do you keep the platform free?",
  //     answer:
  //       "We're passionate about democratizing access to career opportunities. Our platform is supported by partnerships with companies who value well-prepared candidates and believe in our mission.",
  //   },
  {
    question: 'Can I use this for technical interviews?',
    answer:
      'Yes! We support technical interviews for software engineering, data science, product management, and other technical roles. Our AI can evaluate both your problem-solving approach and communication skills.',
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-balance sm:text-4xl">
            Frequently Asked{' '}
            <span className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl text-balance">
            Everything you need to know about our free AI interview coaching
            platform.
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((faq, index) => (
            <Card
              key={index}
              className="border-border/50 hover:border-accent/50 transition-all duration-300"
            >
              <CardHeader
                className="cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <CardTitle className="flex items-center justify-between text-lg">
                  {faq.question}
                  {openIndex === index ? (
                    <ChevronUp className="text-muted-foreground h-5 w-5" />
                  ) : (
                    <ChevronDown className="text-muted-foreground h-5 w-5" />
                  )}
                </CardTitle>
              </CardHeader>
              {openIndex === index && (
                <CardContent className="pt-0">
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
