import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Founder {
  name: string;
  role: string;
  bio: string;
  initials: string;
  image?: string;
}

const founders: Founder[] = [
  {
    name: 'Zaid',
    role: 'Co-Founder',
    bio: 'With a passion for international education and years of experience navigating the complexities of studying abroad, Zaid brings deep insights into helping students achieve their overseas dreams. His expertise lies in understanding the unique challenges faced by international students.',
    initials: 'ZK',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face'
  },
  {
    name: 'Saurabh',
    role: 'Co-Founder', 
    bio: 'Saurabh combines technical expertise with a student-first approach to educational consulting. His background in analyzing educational systems and immigration processes enables him to provide students with accurate, up-to-date guidance for their study abroad journey.',
    initials: 'SP',
    image: 'https://media.licdn.com/dms/image/v2/D4D03AQFNfq3UlTn6dA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1691828472124?e=1758758400&v=beta&t=aZeqRDq8H7MYaKGYtLoAf73dTIjJRWbUUaTqJUZWZbs'
  },
  {
    name: 'Vivian',
    role: 'Co-Founder',
    bio: 'Vivian brings a wealth of experience in student services and cross-cultural communication. Her dedication to personalized support ensures that each student receives tailored guidance that addresses their specific needs and goals for studying and settling abroad.',
    initials: 'VM',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face'
  }
];

const About = () => {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-muted/50 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            About <span className="text-primary">S&S Abroad</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Your trusted partners in international education
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-8 lg:p-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center">
                Our Story
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="text-lg leading-relaxed mb-6">
                  We once dreamed of studying and living abroad. Coming from different backgrounds, we faced the same struggles — overpriced consultancies, little real support, and the burden of figuring everything out on our own.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  We know how overwhelming the process feels and exactly what kind of help students need. That's why we created SaSa: not to sell dreams, but to guide you step by step until they become real — so you're ready and confident to live them yourself.
                </p>
                <p className="text-lg leading-relaxed text-primary font-medium">
                  We don't sell promises, we guide you to make it real.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Meet Our Founders</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Passionate advocates for international education with personal experience in studying abroad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {founders.map((founder) => (
              <Card key={founder.name} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="text-center pb-4">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={founder.image} alt={founder.name} />
                    <AvatarFallback className="text-lg font-semibold bg-primary text-primary-foreground">
                      {founder.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{founder.name}</h3>
                    <p className="text-primary font-medium">{founder.role}</p>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground text-sm leading-relaxed text-center">
                    {founder.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">Honesty First</h3>
                <p className="text-muted-foreground">
                  We provide realistic expectations and transparent guidance. No false promises, no hidden costs.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">Practical Support</h3>
                <p className="text-muted-foreground">
                  Our services are designed based on real student needs and challenges we've personally experienced.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">Student-Centric</h3>
                <p className="text-muted-foreground">
                  Every decision we make prioritizes what's best for the student, not what's most profitable for us.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">Long-term Partnership</h3>
                <p className="text-muted-foreground">
                  We're with you from application to settlement, ensuring you're truly ready for life abroad.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
