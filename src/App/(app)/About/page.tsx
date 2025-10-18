importimport { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl flex items-center gap-4">
            <Building2 className="h-8 w-8 text-primary" />
            About RentalSpot
          </CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none prose-lg">
          <p>
            Welcome to RentalSpot, your number one source for finding the perfect rental home. 
            We're dedicated to giving you the very best of rental listings, with a focus on dependability, 
            customer service, and uniqueness.
          </p>
          <p>
            Founded in 2024, RentalSpot has come a long way from its beginnings. When we first started out, 
            our passion for making the rental process easier and more transparent drove us to create this platform. 
            We now serve customers all over the world and are thrilled to be a part of the quirky, eco-friendly, 
            fair trade wing of the real estate industry.
          </p>
          <p>
            Our mission is to connect property owners with potential tenants in a seamless and efficient manner. 
            We believe that finding a home should be an exciting journey, not a stressful task. That's why we've 
            built a platform that is intuitive, secure, and packed with features to help you find a place you'll love.
          </p>
          <p>
            We hope you enjoy our service as much as we enjoy offering it to you. If you have any questions or 
            comments, please don't hesitate to contact us.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}￼Enter
