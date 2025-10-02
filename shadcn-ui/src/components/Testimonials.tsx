import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Amara K.",
    role: "Graphic Designer",
    location: "Lagos, Nigeria",
    image: "👩🏾‍💻",
    rating: 5,
    quote: "I learned Photoshop on YouTube but had no way to prove my skills to clients. ProofMode gave me a verified TrustTag that helped me increase my rates by 40%!",
    tag: "Freelancer Success"
  },
  {
    name: "Hassan M.",
    role: "Web Developer",
    location: "Karachi, Pakistan",
    image: "👨🏽‍💻",
    rating: 5,
    quote: "As a self-taught developer, I struggled to compete with people who had degrees. My ProofMode portfolio now shows exactly what I can build.",
    tag: "Self-Taught Developer"
  },
  {
    name: "Maria S.",
    role: "Content Writer",
    location: "São Paulo, Brazil",
    image: "👩🏻‍💼",
    rating: 5,
    quote: "I was doing ghostwriting for years but couldn't show my work. ProofMode helped me create a verified portfolio that landed me better clients.",
    tag: "Content Creator"
  },
  {
    name: "Ahmed R.",
    role: "Digital Marketer",
    location: "Cairo, Egypt",
    image: "👨🏽‍💼",
    rating: 5,
    quote: "No marketing degree, but years of experience. ProofMode verified my campaign results and social media growth. Now agencies take me seriously.",
    tag: "Marketing Expert"
  },
  {
    name: "Priya P.",
    role: "UI/UX Designer",
    location: "Mumbai, India",
    image: "👩🏽‍🎨",
    rating: 5,
    quote: "Coming from a non-design background, I had to prove myself constantly. My ProofMode TrustTags show my design evolution and skill progression.",
    tag: "Career Changer"
  },
  {
    name: "Carlos L.",
    role: "Video Editor",
    location: "Mexico City, Mexico",
    image: "👨🏻‍🎬",
    rating: 5,
    quote: "Film school was too expensive, so I learned editing online. ProofMode verified my video projects and helped me get hired by a production company.",
    tag: "Video Professional"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-green-100 to-blue-100 text-green-800 px-4 py-2">
            Success Stories
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-green-800 bg-clip-text text-transparent">
            Real People, Real Results
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how ProofMode is helping talented individuals worldwide prove their skills 
            and access better opportunities without traditional credentials.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:scale-105 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 opacity-10">
                <Quote className="w-12 h-12 text-blue-600" />
              </div>
              
              <CardContent className="p-6">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">{testimonial.image}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-xs text-gray-500">{testimonial.location}</p>
                  </div>
                </div>

                {/* Tag */}
                <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700">
                  {testimonial.tag}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-8">ProofMode Impact</h3>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">50K+</div>
              <div className="text-blue-100">TrustTags Created</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">180+</div>
              <div className="text-blue-100">Countries Served</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">40%</div>
              <div className="text-blue-100">Average Rate Increase</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">95%</div>
              <div className="text-blue-100">User Satisfaction</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to join thousands of verified professionals?
          </h3>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
            Get Your Free TrustTag Now
          </button>
        </div>
      </div>
    </section>
  );
}