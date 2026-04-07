import { ExternalLink } from 'lucide-react';

const oldBookCredits = [
  {
    title: 'Perseus & the Gorgons',
    artist: 'Walter Crane',
    year: 1892,
    source: 'A Wonder Book for Girls & Boys by Nathaniel Hawthorne',
    publisher: 'Houghton Mifflin Company',
    url: 'https://www.oldbookillustrations.com/illustrations/perseus-gorgons/',
  },
  {
    title: 'Guyon of Immodest Merth',
    artist: 'Walter Crane',
    year: 1897,
    source: 'The Faerie Queene by Edmund Spenser',
    publisher: 'George Allen',
    url: 'https://www.oldbookillustrations.com/illustrations/atin-cymochles/',
  },
  {
    title: 'Atin Cymochles Finds',
    artist: 'Walter Crane',
    year: 1897,
    source: 'The Faerie Queene by Edmund Spenser',
    publisher: 'George Allen',
    url: 'https://www.oldbookillustrations.com/illustrations/atin-cymochles/',
  },
  {
    title: 'We Reached the City',
    artist: 'Arthur Rackham',
    year: 1912,
    source: 'The Allies Fairy Book',
    publisher: 'Frederick A. Stokes Company',
    url: 'https://www.oldbookillustrations.com/illustrations/reached-city/',
  },
];

const IllustrationCredits = () => {
  return (
    <section className="py-12 border-t border-moss">
      <h2 className="font-serif text-xl font-bold text-cream mb-6">
        Illustration Credits
      </h2>
      <p className="font-sans text-earth-tan text-sm mb-6 leading-relaxed">
        The illustrations featured on this website are sourced from{' '}
        <a 
          href="https://www.oldbookillustrations.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-olive-light hover:text-tomato transition-colors"
        >
          Old Book Illustrations
        </a>
        , a remarkable archive of antique illustrations from the public domain.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {oldBookCredits.map((credit, index) => (
          <div 
            key={index}
            className="bg-deep-forest border border-moss rounded-lg p-4"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-serif text-cream font-medium">{credit.title}</h3>
              <a
                href={credit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-olive-light hover:text-tomato transition-colors flex-shrink-0"
                aria-label="View original"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <p className="font-sans text-earth-muted text-xs">
              {credit.artist}, {credit.year}
            </p>
            <p className="font-sans text-earth-muted text-xs mt-1">
              <em>{credit.source}</em>
            </p>
            <p className="font-sans text-earth-muted text-xs">
              {credit.publisher}
            </p>
          </div>
        ))}
      </div>
      <p className="font-sans text-earth-muted text-xs mt-6 text-center">
        All illustrations are believed to be in the public domain. 
        Please visit{' '}
        <a 
          href="https://www.oldbookillustrations.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-olive-light hover:text-tomato transition-colors"
        >
          oldbookillustrations.com
        </a>{' '}
        for more beautiful antique illustrations.
      </p>
    </section>
  );
};

export default IllustrationCredits;
