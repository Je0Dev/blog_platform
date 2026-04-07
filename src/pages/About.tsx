import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { LightboxTrigger } from '../components/Lightbox';
import { posts } from '../data/posts';

const oldBookImages = [
  'https://www.oldbookillustrations.com/site/assets/files/14298/perseus-gorgons.jpg',
  'https://www.oldbookillustrations.com/site/assets/files/11021/fights-cymochles.jpg',
  'https://www.oldbookillustrations.com/site/assets/files/9859/atin-cymochles.jpg',
  'https://www.oldbookillustrations.com/site/assets/files/12863/reached-city.jpg',
];

const About = () => {
  const totalArticles = posts.length;
  const totalReadTime = posts.reduce((acc, post) => {
    const minutes = parseInt(post.readTime);
    return acc + (isNaN(minutes) ? 0 : minutes);
  }, 0);

  return (
    <section className="pt-20 pb-12">
      <div className="max-w-prose mx-auto px-6">
        <div className="flex flex-col items-center mb-16">
          <div className="illustration-container w-40 h-40 mb-6">
            <img 
              src={oldBookImages[3]}
              alt="Portrait illustration"
              className="w-full h-full object-cover rounded-full border-2 border-moss shadow-lg"
              loading="eager"
            />
          </div>
          <h1 className="font-serif text-3xl font-bold mb-2">
            <span className="text-cream relative inline-block after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-olive-light after:transition-all after:duration-300 hover:after:w-full">
              George
            </span>
          </h1>
          <p className="font-sans text-earth-tan mb-2">
            <span className="text-olive-light">Electrical & Computer Engineering</span> Student
          </p>
          <p className="font-sans text-earth-tan text-center max-w-prose mb-8">
            <span className="text-tomato">Builder</span> of things. Exploring the intersection of 
            <span className="text-olive-light">hardware</span> and <span className="text-olive-light">software</span>.
            Currently studying at the{' '}
            <a 
              href="https://www.uop.gr/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-olive-light hover:text-tomato underline underline-offset-2 hover:underline-offset-4 transition-all duration-200"
            >
              University of Peloponnese
            </a>{' '}
            in Greece.
          </p>
          
          <div className="illustration-container max-w-md w-full mb-8">
            <LightboxTrigger 
              src={oldBookImages[0]}
              alt="The pursuit of knowledge"
              caption="The pursuit of knowledge"
            >
              <img 
                src={oldBookImages[0]}
                alt="Antique illustration from Old Book Illustrations"
                className="w-full rounded-lg shadow-md"
                loading="eager"
              />
            </LightboxTrigger>
            <p className="illustration-caption">The pursuit of knowledge</p>
          </div>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3 text-center mb-16">
          <div className="border border-moss rounded-lg p-6 hover:border-olive-light transition-colors">
            <div className="font-serif text-3xl font-bold text-tomato mb-2">
              {totalArticles}
            </div>
            <p className="font-sans text-earth-tan text-sm">Articles</p>
          </div>
          <div className="border border-moss rounded-lg p-6 hover:border-olive-light transition-colors">
            <div className="font-serif text-3xl font-bold text-olive-light mb-2">
              {totalReadTime}
            </div>
            <p className="font-sans text-earth-tan text-sm">Minutes Read</p>
          </div>
          <div className="border border-moss rounded-lg p-6 hover:border-olive-light transition-colors">
            <div className="font-serif text-3xl font-bold text-cream mb-2">
              6
            </div>
            <p className="font-sans text-earth-tan text-sm">Projects</p>
          </div>
        </div>
        
        <div className="illustration-container max-w-md w-full mx-auto mb-12">
          <LightboxTrigger 
            src={oldBookImages[1]}
            alt="The journey of learning"
            caption="The journey of learning"
          >
            <img 
              src={oldBookImages[1]}
              alt="Knight in combat"
              className="w-full rounded-lg shadow-md"
              loading="lazy"
            />
          </LightboxTrigger>
          <p className="illustration-caption">The journey of learning</p>
        </div>
        
        <div className="space-y-8">
          <div>
            <h2 className="font-serif text-2xl font-bold text-cream mb-4">
              <span className="relative inline-block after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-olive-light after:transition-all after:duration-300 hover:after:w-full">
                About
              </span>
            </h2>
            <div className="space-y-4 text-earth-tan font-sans leading-relaxed">
              <p>
                Hello! I'm <span className="text-tomato font-semibold">George</span>, an <span className="text-olive-light">electrical and computer engineering</span> student with a passion 
                for building things that bridge the gap between <span className="text-olive-light">hardware</span> and <span className="text-olive-light">software</span>.
              </p>
              <p>
                This website is my <span className="text-tomato">digital garden</span> — a place where I share thoughts on 
                <span className="text-olive-light">technology</span>, <span className="text-olive-light">craftsmanship</span>, and the practice of making things that last.
                It's inspired by the quiet web, by sites like{' '}
                <a href="https://www.fromjason.xyz/" target="_blank" rel="noopener noreferrer" className="text-olive-light hover:text-tomato underline underline-offset-2 hover:underline-offset-4 transition-all duration-200">
                  fromjason.xyz
                </a>,{' '}
                <a href="https://maggieappleton.com/" target="_blank" rel="noopener noreferrer" className="text-olive-light hover:text-tomato underline underline-offset-2 hover:underline-offset-4 transition-all duration-200">
                  maggieappleton.com
                </a>, and the <span className="text-olive-light">IndieWeb</span> community.
              </p>
              <p>
                When I'm not coding, you'll find me exploring <span className="text-olive-light">embedded systems</span>, contributing 
                to <span className="text-olive-light">open source</span>, or reading about the <span className="text-tomato">history of technology</span>.
              </p>
            </div>
          </div>
          
          <div>
            <h2 className="font-serif text-2xl font-bold text-cream mb-4">
              <span className="relative inline-block after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-olive-light after:transition-all after:duration-300 hover:after:w-full">
                Elsewhere
              </span>
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href="https://github.com/Je0Dev"
                className="flex items-center gap-3 p-4 bg-deep-forest border border-moss rounded-lg hover:bg-deep-sage hover:border-earth-tan transition-colors group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-5 h-5 text-earth-muted group-hover:text-tomato transition-colors" />
                <div>
                  <p className="font-sans text-cream font-medium">
                    <span className="relative inline-block after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-cream after:transition-all after:duration-300 group-hover:after:w-full">
                      GitHub
                    </span>
                  </p>
                  <p className="font-sans text-earth-muted text-sm">@Je0Dev</p>
                </div>
                <ExternalLink className="w-4 h-4 text-earth-muted ml-auto" />
              </a>
              <a
                href="https://www.linkedin.com/in/geomas/"
                className="flex items-center gap-3 p-4 bg-deep-forest border border-moss rounded-lg hover:bg-deep-sage hover:border-earth-tan transition-colors group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-5 h-5 text-earth-muted group-hover:text-tomato transition-colors" />
                <div>
                  <p className="font-sans text-cream font-medium">
                    <span className="relative inline-block after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-cream after:transition-all after:duration-300 group-hover:after:w-full">
                      LinkedIn
                    </span>
                  </p>
                  <p className="font-sans text-earth-muted text-sm">George Mas</p>
                </div>
                <ExternalLink className="w-4 h-4 text-earth-muted ml-auto" />
              </a>
              <a
                href="mailto:george@example.com"
                className="flex items-center gap-3 p-4 bg-deep-forest border border-moss rounded-lg hover:bg-deep-sage hover:border-earth-tan transition-colors group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Mail className="w-5 h-5 text-earth-muted group-hover:text-tomato transition-colors" />
                <div>
                  <p className="font-sans text-cream font-medium">
                    <span className="relative inline-block after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-cream after:transition-all after:duration-300 group-hover:after:w-full">
                      Email
                    </span>
                  </p>
                  <p className="font-sans text-earth-muted text-sm">Get in touch</p>
                </div>
                <ExternalLink className="w-4 h-4 text-earth-muted ml-auto" />
              </a>
            </div>
          </div>
          
          <div>
            <h2 className="font-serif text-2xl font-bold text-cream mb-4">
              <span className="relative inline-block after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-olive-light after:transition-all after:duration-300 hover:after:w-full">
                Inspiration
              </span>
            </h2>
            <p className="text-earth-tan font-sans mb-4 leading-relaxed">
              This site takes inspiration from wonderful <span className="text-olive-light">personal websites</span> and <span className="text-tomato">digital gardens</span>:
            </p>
            <div className="space-y-3">
              <a href="https://www.fromjason.xyz/" target="_blank" rel="noopener noreferrer" className="link-card flex items-center gap-3 hover:bg-deep-sage p-3 rounded-lg transition-colors">
                <ExternalLink className="w-4 h-4 text-olive-light mt-0.5 flex-shrink-0" />
                <div>
                  <p className="link-card-title hover:text-tomato transition-colors">
                    <span className="relative inline-block after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-olive-light after:transition-all after:duration-300 hover:after:w-full">
                      fromjason.xyz
                    </span>
                  </p>
                  <p className="link-card-desc">Jason Velazquez's digital garden</p>
                </div>
              </a>
              <a href="https://maggieappleton.com/" target="_blank" rel="noopener noreferrer" className="link-card flex items-center gap-3 hover:bg-deep-sage p-3 rounded-lg transition-colors">
                <ExternalLink className="w-4 h-4 text-olive-light mt-0.5 flex-shrink-0" />
                <div>
                  <p className="link-card-title hover:text-tomato transition-colors">
                    <span className="relative inline-block after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-olive-light after:transition-all after:duration-300 hover:after:w-full">
                      maggieappleton.com
                    </span>
                  </p>
                  <p className="link-card-desc">Maggie Appleton's visual essays</p>
                </div>
              </a>
              <a href="https://manuelmoreale.com/" target="_blank" rel="noopener noreferrer" className="link-card flex items-center gap-3 hover:bg-deep-sage p-3 rounded-lg transition-colors">
                <ExternalLink className="w-4 h-4 text-olive-light mt-0.5 flex-shrink-0" />
                <div>
                  <p className="link-card-title hover:text-tomato transition-colors">
                    <span className="relative inline-block after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-olive-light after:transition-all after:duration-300 hover:after:w-full">
                      manuelmoreale.com
                    </span>
                  </p>
                  <p className="link-card-desc">People and Blogs interviews</p>
                </div>
              </a>
              <a href="https://www.oldbookillustrations.com/" target="_blank" rel="noopener noreferrer" className="link-card flex items-center gap-3 hover:bg-deep-sage p-3 rounded-lg transition-colors">
                <ExternalLink className="w-4 h-4 text-olive-light mt-0.5 flex-shrink-0" />
                <div>
                  <p className="link-card-title hover:text-tomato transition-colors">
                    <span className="relative inline-block after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-olive-light after:transition-all after:duration-300 hover:after:w-full">
                      oldbookillustrations.com
                    </span>
                  </p>
                  <p className="link-card-desc">Antique illustrations for the web</p>
                </div>
              </a>
            </div>
          </div>
          
          <div className="illustration-container max-w-md w-full mx-auto">
            <LightboxTrigger 
              src={oldBookImages[2]}
              alt="The Faerie Queene — adventure awaits"
              caption="The Faerie Queene — adventure awaits"
            >
              <img 
                src={oldBookImages[2]}
                alt="From The Faerie Queene"
                className="w-full rounded-lg shadow-md"
                loading="lazy"
              />
            </LightboxTrigger>
            <p className="illustration-caption">The Faerie Queene — adventure awaits</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
