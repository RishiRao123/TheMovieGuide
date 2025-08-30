import React from "react";

const Section = () => {
  return (
    <section className='py-20 bg-gradient-to-b from-background to-card/30'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <div className='text-center mb-16'>
          <h2 className='text-4xl font-bold text-foreground mb-4'>
            Why Choose TheMovieGuide?
          </h2>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
            Experience the ultimate movie discovery platform with personalized
            recommendations, comprehensive reviews, and seamless watchlist
            management.
          </p>
        </div>

        {/* Features Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {/* Feature 1 */}
          <div className='glass-effect rounded-xl p-8 text-center group hover:scale-105 transition-transform duration-300'>
            <div className='w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:animate-glow'>
              <svg
                className='w-8 h-8 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </div>
            <h3 className='text-xl font-semibold text-foreground mb-4'>
              Smart Discovery
            </h3>
            <p className='text-muted-foreground'>
              Advanced search and filtering system to help you discover movies
              and TV shows that match your taste perfectly.
            </p>
          </div>

          {/* Feature 2 */}
          <div className='glass-effect rounded-xl p-8 text-center group hover:scale-105 transition-transform duration-300'>
            <div className='w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:animate-glow'>
              <svg
                className='w-8 h-8 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
                />
              </svg>
            </div>
            <h3 className='text-xl font-semibold text-foreground mb-4'>
              Personal Reviews
            </h3>
            <p className='text-muted-foreground'>
              Read authentic user reviews and share your own thoughts about
              movies and shows with our community.
            </p>
          </div>

          {/* Feature 3 */}
          <div className='glass-effect rounded-xl p-8 text-center group hover:scale-105 transition-transform duration-300'>
            <div className='w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:animate-glow'>
              <svg
                className='w-8 h-8 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z'
                />
              </svg>
            </div>
            <h3 className='text-xl font-semibold text-foreground mb-4'>
              Smart Watchlists
            </h3>
            <p className='text-muted-foreground'>
              Organize your favorite content with customizable watchlists and
              get notified about new releases.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;
