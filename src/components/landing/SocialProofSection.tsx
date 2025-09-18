export function SocialProofSection() {
  const companies = [
    { name: 'Google', logo: '/google-logo.png' },
    { name: 'Microsoft', logo: '/microsoft-logo.png' },
    { name: 'Amazon', logo: '/amazon-logo.png' },
    { name: 'Apple', logo: '/apple-logo.png' },
    { name: 'Meta', logo: '/meta-logo-abstract.png' },
    { name: 'Netflix', logo: '/netflix-inspired-logo.png' },
  ];

  return (
    <section className="bg-muted/30 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
            Trusted by professionals at leading companies
          </p>
        </div>

        <div className="grid grid-cols-2 items-center justify-items-center gap-8 md:grid-cols-3 lg:grid-cols-6">
          {companies.map((company) => (
            <div
              key={company.name}
              className="opacity-60 transition-opacity hover:opacity-100"
            >
              <img
                src={company.logo || '/placeholder.svg'}
                alt={`${company.name} logo`}
                className="h-8 w-auto grayscale transition-all hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
