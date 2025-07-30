import { Container } from '../editor/Container';
import { Text } from '../editor/Text';
import { Button } from '../editor/Button';
import { ImageComponent } from '../editor/Image';

/**
 * Demo Page Templates
 * 
 * Collection of pre-built page templates for different use cases:
 * - Portfolio Template
 * - E-commerce Template
 * - Travel Agency Template
 * - Service/Business Template
 */

// Portfolio Template
export const PortfolioTemplate = () => {
  return (
    <Container
      background="@color.background"
      flexDirection="column"
      gap="@spacing.xl"
      paddingTop="@spacing.lg"
      paddingBottom="@spacing.lg"
    >
      {/* Hero Section */}
      <Container
        background="@color.primary"
        height="500px"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="@spacing.md"
        paddingTop="@spacing.xl"
        paddingBottom="@spacing.xl"
      >
        <Text
          text="John Doe"
          fontSize="@typography.4xl"
          fontWeight="bold"
          color="@color.background"
          textAlign="center"
        />
        <Text
          text="Creative Designer & Developer"
          fontSize="@typography.xl"
          color="@color.background"
          textAlign="center"
        />
        <Text
          text="Crafting beautiful digital experiences with passion and precision"
          fontSize="@typography.base"
          color="@color.background"
          textAlign="center"
        />
        <Button
          text="View My Work"
          backgroundColor="@color.background"
          color="@color.primary"
          borderRadius="@radius.full"
        />
      </Container>

      {/* About Section */}
      <Container
        flexDirection="row"
        gap="@spacing.xl"
        alignItems="center"
        paddingTop="@spacing.xl"
        paddingBottom="@spacing.xl"
      >
        <Container width="50%">
          <ImageComponent
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
            alt="Profile Picture"
            width="100%"
            height="400px"
            borderRadius={20}
            objectFit="cover"
          />
        </Container>
        <Container width="50%" flexDirection="column" gap="@spacing.md">
          <Text
            text="About Me"
            fontSize="@typography.2xl"
            fontWeight="bold"
            color="@color.text"
          />
          <Text
            text="I'm a passionate designer and developer with over 5 years of experience creating beautiful and functional digital products. I specialize in user experience design, front-end development, and brand identity."
            fontSize="@typography.base"
            color="@color.text"
            lineHeight="1.6"
          />
          <Text
            text="My approach combines creativity with technical expertise to deliver solutions that not only look great but also perform exceptionally well."
            fontSize="@typography.base"
            color="@color.text"
            lineHeight="1.6"
          />
          <Button
            text="Download Resume"
            backgroundColor="@color.secondary"
            color="@color.background"
            borderRadius="@radius.md"
          />
        </Container>
      </Container>

      {/* Portfolio Grid */}
      <Container flexDirection="column" gap="@spacing.lg">
        <Text
          text="Featured Projects"
          fontSize="@typography.2xl"
          fontWeight="bold"
          color="@color.text"
          textAlign="center"
        />
        <Container flexDirection="row" gap="@spacing.lg" flexWrap="wrap">
          {/* Project 1 */}
          <Container width="30%" flexDirection="column" gap="@spacing.sm">
            <ImageComponent
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop"
              alt="E-commerce Website"
              width="100%"
              height="200px"
              borderRadius={10}
              objectFit="cover"
            />
            <Text
              text="E-commerce Platform"
              fontSize="@typography.lg"
              fontWeight="semibold"
              color="@color.text"
            />
            <Text
              text="Modern online store with seamless user experience"
              fontSize="@typography.sm"
              color="@color.muted"
            />
          </Container>

          {/* Project 2 */}
          <Container width="30%" flexDirection="column" gap="@spacing.sm">
            <ImageComponent
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
              alt="Mobile App"
              width="100%"
              height="200px"
              borderRadius={10}
              objectFit="cover"
            />
            <Text
              text="Mobile Banking App"
              fontSize="@typography.lg"
              fontWeight="semibold"
              color="@color.text"
            />
            <Text
              text="Secure and intuitive financial management"
              fontSize="@typography.sm"
              color="@color.muted"
            />
          </Container>

          {/* Project 3 */}
          <Container width="30%" flexDirection="column" gap="@spacing.sm">
            <ImageComponent
              src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=300&fit=crop"
              alt="Brand Identity"
              width="100%"
              height="200px"
              borderRadius={10}
              objectFit="cover"
            />
            <Text
              text="Brand Identity Design"
              fontSize="@typography.lg"
              fontWeight="semibold"
              color="@color.text"
            />
            <Text
              text="Complete visual identity for tech startup"
              fontSize="@typography.sm"
              color="@color.muted"
            />
          </Container>
        </Container>
      </Container>

      {/* Contact Section */}
      <Container
        background="@color.muted"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="@spacing.md"
        paddingTop="@spacing.xl"
        paddingBottom="@spacing.xl"
      >
        <Text
          text="Let's Work Together"
          fontSize="@typography.2xl"
          fontWeight="bold"
          color="@color.text"
          textAlign="center"
        />
        <Text
          text="Ready to bring your ideas to life? Let's discuss your next project."
          fontSize="@typography.base"
          color="@color.text"
          textAlign="center"
        />
        <Container flexDirection="row" gap="@spacing.md">
          <Button
            text="Get in Touch"
            backgroundColor="@color.primary"
            color="@color.background"
            borderRadius="@radius.md"
          />
          <Button
            text="View LinkedIn"
            backgroundColor="@color.secondary"
            color="@color.background"
            borderRadius="@radius.md"
          />
        </Container>
      </Container>
    </Container>
  );
};

// E-commerce Template
export const EcommerceTemplate = () => {
  return (
    <Container
      background="@color.background"
      flexDirection="column"
      gap="@spacing.lg"
    >
      {/* Header/Navigation */}
      <Container
        background="@color.background"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        paddingTop="@spacing.md"
        paddingBottom="@spacing.md"
        paddingLeft="@spacing.lg"
        paddingRight="@spacing.lg"
        shadow={1}
      >
        <Text
          text="StyleStore"
          fontSize="@typography.xl"
          fontWeight="bold"
          color="@color.primary"
        />
        <Container flexDirection="row" gap="@spacing.md" alignItems="center">
          <Text text="Shop" fontSize="@typography.base" color="@color.text" />
          <Text text="About" fontSize="@typography.base" color="@color.text" />
          <Text text="Contact" fontSize="@typography.base" color="@color.text" />
          <Button
            text="Cart (0)"
            backgroundColor="@color.primary"
            color="@color.background"
            borderRadius="@radius.md"
          />
        </Container>
      </Container>

      {/* Hero Banner */}
      <Container
        background="@color.primary"
        height="400px"
        flexDirection="row"
        alignItems="center"
        gap="@spacing.xl"
        paddingLeft="@spacing.xl"
        paddingRight="@spacing.xl"
      >
        <Container width="50%" flexDirection="column" gap="@spacing.md">
          <Text
            text="Summer Collection 2024"
            fontSize="@typography.3xl"
            fontWeight="bold"
            color="@color.background"
          />
          <Text
            text="Discover the latest trends in fashion with our exclusive summer collection. Quality meets style."
            fontSize="@typography.base"
            color="@color.background"
            lineHeight="1.6"
          />
          <Button
            text="Shop Now"
            backgroundColor="@color.background"
            color="@color.primary"
            borderRadius="@radius.md"
          />
        </Container>
        <Container width="50%">
          <ImageComponent
            src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&h=400&fit=crop"
            alt="Summer Fashion"
            width="100%"
            height="350px"
            borderRadius={15}
            objectFit="cover"
          />
        </Container>
      </Container>

      {/* Featured Products */}
      <Container
        flexDirection="column"
        gap="@spacing.lg"
        paddingLeft="@spacing.lg"
        paddingRight="@spacing.lg"
      >
        <Text
          text="Featured Products"
          fontSize="@typography.2xl"
          fontWeight="bold"
          color="@color.text"
          textAlign="center"
        />
        
        <Container flexDirection="row" gap="@spacing.lg" flexWrap="wrap" justifyContent="center">
          {/* Product 1 */}
          <Container 
            width="22%" 
            flexDirection="column" 
            gap="@spacing.sm"
            background="@color.background"
            radius="@radius.lg"
            shadow={2}
            paddingBottom="@spacing.md"
          >
            <ImageComponent
              src="https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=300&h=300&fit=crop"
              alt="Summer Dress"
              width="100%"
              height="250px"
              borderRadius={10}
              objectFit="cover"
            />
            <Container paddingLeft="@spacing.md" paddingRight="@spacing.md" flexDirection="column" gap="@spacing.xs">
              <Text
                text="Elegant Summer Dress"
                fontSize="@typography.base"
                fontWeight="semibold"
                color="@color.text"
              />
              <Text
                text="$89.99"
                fontSize="@typography.lg"
                fontWeight="bold"
                color="@color.primary"
              />
              <Button
                text="Add to Cart"
                backgroundColor="@color.secondary"
                color="@color.background"
                borderRadius="@radius.sm"
              />
            </Container>
          </Container>

          {/* Product 2 */}
          <Container 
            width="22%" 
            flexDirection="column" 
            gap="@spacing.sm"
            background="@color.background"
            radius="@radius.lg"
            shadow={2}
            paddingBottom="@spacing.md"
          >
            <ImageComponent
              src="https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=300&h=300&fit=crop"
              alt="Casual Shirt"
              width="100%"
              height="250px"
              borderRadius={10}
              objectFit="cover"
            />
            <Container paddingLeft="@spacing.md" paddingRight="@spacing.md" flexDirection="column" gap="@spacing.xs">
              <Text
                text="Premium Cotton Shirt"
                fontSize="@typography.base"
                fontWeight="semibold"
                color="@color.text"
              />
              <Text
                text="$65.99"
                fontSize="@typography.lg"
                fontWeight="bold"
                color="@color.primary"
              />
              <Button
                text="Add to Cart"
                backgroundColor="@color.secondary"
                color="@color.background"
                borderRadius="@radius.sm"
              />
            </Container>
          </Container>

          {/* Product 3 */}
          <Container 
            width="22%" 
            flexDirection="column" 
            gap="@spacing.sm"
            background="@color.background"
            radius="@radius.lg"
            shadow={2}
            paddingBottom="@spacing.md"
          >
            <ImageComponent
              src="https://images.unsplash.com/photo-1549062572-544a64fb0c56?w=300&h=300&fit=crop"
              alt="Designer Jeans"
              width="100%"
              height="250px"
              borderRadius={10}
              objectFit="cover"
            />
            <Container paddingLeft="@spacing.md" paddingRight="@spacing.md" flexDirection="column" gap="@spacing.xs">
              <Text
                text="Designer Denim Jeans"
                fontSize="@typography.base"
                fontWeight="semibold"
                color="@color.text"
              />
              <Text
                text="$125.99"
                fontSize="@typography.lg"
                fontWeight="bold"
                color="@color.primary"
              />
              <Button
                text="Add to Cart"
                backgroundColor="@color.secondary"
                color="@color.background"
                borderRadius="@radius.sm"
              />
            </Container>
          </Container>

          {/* Product 4 */}
          <Container 
            width="22%" 
            flexDirection="column" 
            gap="@spacing.sm"
            background="@color.background"
            radius="@radius.lg"
            shadow={2}
            paddingBottom="@spacing.md"
          >
            <ImageComponent
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop"
              alt="Sports Shoes"
              width="100%"
              height="250px"
              borderRadius={10}
              objectFit="cover"
            />
            <Container paddingLeft="@spacing.md" paddingRight="@spacing.md" flexDirection="column" gap="@spacing.xs">
              <Text
                text="Athletic Running Shoes"
                fontSize="@typography.base"
                fontWeight="semibold"
                color="@color.text"
              />
              <Text
                text="$149.99"
                fontSize="@typography.lg"
                fontWeight="bold"
                color="@color.primary"
              />
              <Button
                text="Add to Cart"
                backgroundColor="@color.secondary"
                color="@color.background"
                borderRadius="@radius.sm"
              />
            </Container>
          </Container>
        </Container>
      </Container>

      {/* Newsletter Section */}
      <Container
        background="@color.muted"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="@spacing.md"
        paddingTop="@spacing.xl"
        paddingBottom="@spacing.xl"
      >
        <Text
          text="Stay Updated"
          fontSize="@typography.xl"
          fontWeight="bold"
          color="@color.text"
          textAlign="center"
        />
        <Text
          text="Subscribe to our newsletter for exclusive offers and new arrivals"
          fontSize="@typography.base"
          color="@color.text"
          textAlign="center"
        />
        <Container flexDirection="row" gap="@spacing.sm" alignItems="center">
          <Container
            background="@color.background"
            width="300px"
            height="40px"
            justifyContent="center"
            alignItems="center"
            radius="@radius.sm"
          >
            <Text
              text="Enter your email address"
              fontSize="@typography.base"
              color="@color.muted"
            />
          </Container>
          <Button
            text="Subscribe"
            backgroundColor="@color.primary"
            color="@color.background"
            borderRadius="@radius.md"
          />
        </Container>
      </Container>
    </Container>
  );
};

// Travel Agency Template  
export const TravelTemplate = () => {
  return (
    <Container
      background="@color.background"
      flexDirection="column"
      gap="@spacing.lg"
    >
      {/* Hero Section with Background Image */}
      <Container
        height="600px"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="@spacing.lg"
        background="linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=600&fit=crop')"
      >
        <Container
          background="rgba(0,0,0,0.5)"
          flexDirection="column"
          alignItems="center"
          gap="@spacing.md"
          paddingTop="@spacing.xl"
          paddingBottom="@spacing.xl"
          paddingLeft="@spacing.lg"
          paddingRight="@spacing.lg"
          radius="@radius.lg"
        >
          <Text
            text="Wanderlust Adventures"
            fontSize="@typography.4xl"
            fontWeight="bold"
            color="@color.background"
            textAlign="center"
          />
          <Text
            text="Discover Amazing Places Around the World"
            fontSize="@typography.xl"
            color="@color.background"
            textAlign="center"
          />
          <Text
            text="Create unforgettable memories with our carefully curated travel experiences"
            fontSize="@typography.base"
            color="@color.background"
            textAlign="center"
          />
          <Container flexDirection="row" gap="@spacing.md">
            <Button
              text="Explore Destinations"
              backgroundColor="@color.primary"
              color="@color.background"
              borderRadius="@radius.md"
            />
            <Button
              text="Plan Your Trip"
              backgroundColor="@color.secondary"
              color="@color.background"
              borderRadius="@radius.md"
            />
          </Container>
        </Container>
      </Container>

      {/* Popular Destinations */}
      <Container
        flexDirection="column"
        gap="@spacing.lg"
        paddingLeft="@spacing.lg"
        paddingRight="@spacing.lg"
      >
        <Text
          text="Popular Destinations"
          fontSize="@typography.2xl"
          fontWeight="bold"
          color="@color.text"
          textAlign="center"
        />

        <Container flexDirection="row" gap="@spacing.lg" flexWrap="wrap">
          {/* Destination 1 */}
          <Container width="30%" flexDirection="column" gap="@spacing.sm">
            <ImageComponent
              src="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&h=300&fit=crop"
              alt="Santorini, Greece"
              width="100%"
              height="250px"
              borderRadius={15}
              objectFit="cover"
            />
            <Text
              text="Santorini, Greece"
              fontSize="@typography.lg"
              fontWeight="bold"
              color="@color.text"
            />
            <Text
              text="Experience the magic of white-washed buildings and stunning sunsets in this Greek paradise."
              fontSize="@typography.sm"
              color="@color.muted"
              lineHeight="1.5"
            />
            <Text
              text="Starting from $1,299"
              fontSize="@typography.base"
              fontWeight="semibold"
              color="@color.primary"
            />
            <Button
              text="View Details"
              backgroundColor="@color.secondary"
              color="@color.background"
              borderRadius="@radius.sm"
            />
          </Container>

          {/* Destination 2 */}
          <Container width="30%" flexDirection="column" gap="@spacing.sm">
            <ImageComponent
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
              alt="Bali, Indonesia"
              width="100%"
              height="250px"
              borderRadius={15}
              objectFit="cover"
            />
            <Text
              text="Bali, Indonesia"
              fontSize="@typography.lg"
              fontWeight="bold"
              color="@color.text"
            />
            <Text
              text="Immerse yourself in tropical beauty, rich culture, and pristine beaches."
              fontSize="@typography.sm"
              color="@color.muted"
              lineHeight="1.5"
            />
            <Text
              text="Starting from $899"
              fontSize="@typography.base"
              fontWeight="semibold"
              color="@color.primary"
            />
            <Button
              text="View Details"
              backgroundColor="@color.secondary"
              color="@color.background"
              borderRadius="@radius.sm"
            />
          </Container>

          {/* Destination 3 */}
          <Container width="30%" flexDirection="column" gap="@spacing.sm">
            <ImageComponent
              src="https://images.unsplash.com/photo-1502780402662-acc01917871e?w=400&h=300&fit=crop"
              alt="Tokyo, Japan"
              width="100%"
              height="200px"
              borderRadius={10}
              objectFit="cover"
            />
            <Text
              text="Tokyo, Japan"
              fontSize="@typography.lg"
              fontWeight="bold"
              color="@color.text"
            />
            <Text
              text="Discover the perfect blend of traditional culture and modern innovation."
              fontSize="@typography.sm"
              color="@color.muted"
              lineHeight="1.5"
            />
            <Text
              text="Starting from $1,599"
              fontSize="@typography.base"
              fontWeight="semibold"
              color="@color.primary"
            />
            <Button
              text="View Details"
              backgroundColor="@color.secondary"
              color="@color.background"
              borderRadius="@radius.sm"
            />
          </Container>
        </Container>
      </Container>

      {/* Services Section */}
      <Container
        background="@color.muted"
        flexDirection="column"
        gap="@spacing.lg"
        paddingTop="@spacing.xl"
        paddingBottom="@spacing.xl"
        paddingLeft="@spacing.lg"
        paddingRight="@spacing.lg"
      >
        <Text
          text="Why Choose Us"
          fontSize="@typography.2xl"
          fontWeight="bold"
          color="@color.text"
          textAlign="center"
        />

        <Container flexDirection="row" gap="@spacing.lg" justifyContent="center">
          <Container width="25%" flexDirection="column" alignItems="center" gap="@spacing.sm">
            <Container
              width="80px"
              height="80px"
              background="@color.primary"
              radius="@radius.full"
              justifyContent="center"
              alignItems="center"
            >
              <Text text="✈️" fontSize="@typography.2xl" />
            </Container>
            <Text
              text="Expert Planning"
              fontSize="@typography.base"
              fontWeight="semibold"
              color="@color.text"
              textAlign="center"
            />
            <Text
              text="Our travel experts create personalized itineraries"
              fontSize="@typography.sm"
              color="@color.muted"
              textAlign="center"
            />
          </Container>

          <Container width="25%" flexDirection="column" alignItems="center" gap="@spacing.sm">
            <Container
              width="80px"
              height="80px"
              background="@color.secondary"
              radius="@radius.full"
              justifyContent="center"
              alignItems="center"
            >
              <Text text="🛡️" fontSize="@typography.2xl" />
            </Container>
            <Text
              text="24/7 Support"
              fontSize="@typography.base"
              fontWeight="semibold"
              color="@color.text"
              textAlign="center"
            />
            <Text
              text="Round-the-clock assistance during your journey"
              fontSize="@typography.sm"
              color="@color.muted"
              textAlign="center"
            />
          </Container>

          <Container width="25%" flexDirection="column" alignItems="center" gap="@spacing.sm">
            <Container
              width="80px"
              height="80px"
              background="@color.primary"
              radius="@radius.full"
              justifyContent="center"
              alignItems="center"
            >
              <Text text="💰" fontSize="@typography.2xl" />
            </Container>
            <Text
              text="Best Prices"
              fontSize="@typography.base"
              fontWeight="semibold"
              color="@color.text"
              textAlign="center"
            />
            <Text
              text="Competitive rates with no hidden fees"
              fontSize="@typography.sm"
              color="@color.muted"
              textAlign="center"
            />
          </Container>

          <Container width="25%" flexDirection="column" alignItems="center" gap="@spacing.sm">
            <Container
              width="80px"
              height="80px"
              background="@color.secondary"
              radius="@radius.full"
              justifyContent="center"
              alignItems="center"
            >
              <Text text="⭐" fontSize="@typography.2xl" />
            </Container>
            <Text
              text="Trusted Reviews"
              fontSize="@typography.base"
              fontWeight="semibold"
              color="@color.text"
              textAlign="center"
            />
            <Text
              text="Thousands of satisfied travelers worldwide"
              fontSize="@typography.sm"
              color="@color.muted"
              textAlign="center"
            />
          </Container>
        </Container>
      </Container>

      {/* Contact Section */}
      <Container
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="@spacing.md"
        paddingTop="@spacing.xl"
        paddingBottom="@spacing.xl"
      >
        <Text
          text="Ready for Your Next Adventure?"
          fontSize="@typography.2xl"
          fontWeight="bold"
          color="@color.text"
          textAlign="center"
        />
        <Text
          text="Contact our travel experts to start planning your dream vacation today"
          fontSize="@typography.base"
          color="@color.text"
          textAlign="center"
        />
        <Container flexDirection="row" gap="@spacing.md">
          <Button
            text="Get Quote"
            backgroundColor="@color.primary"
            color="@color.background"
            borderRadius="@radius.md"
          />
          <Button
            text="Call Us Now"
            backgroundColor="@color.secondary"
            color="@color.background"
            borderRadius="@radius.md"
          />
        </Container>
      </Container>
    </Container>
  );
};

// Service/Business Template
export const ServiceTemplate = () => {
  return (
    <Container
      background="@color.background"
      flexDirection="column"
      gap="@spacing.lg"
    >
      {/* Hero Section */}
      <Container
        background="@color.primary"
        height="500px"
        flexDirection="row"
        alignItems="center"
        gap="@spacing.xl"
        paddingLeft="@spacing.xl"
        paddingRight="@spacing.xl"
      >
        <Container width="50%" flexDirection="column" gap="@spacing.md">
          <Text
            text="Digital Solutions Agency"
            fontSize="@typography.3xl"
            fontWeight="bold"
            color="@color.background"
          />
          <Text
            text="We help businesses grow with innovative digital strategies and cutting-edge technology solutions."
            fontSize="@typography.base"
            color="@color.background"
            lineHeight="1.6"
          />
          <Container flexDirection="row" gap="@spacing.sm">
            <Button
              text="Get Started"
              backgroundColor="@color.background"
              color="@color.primary"
              borderRadius="@radius.md"
            />
            <Button
              text="View Portfolio"
              backgroundColor="@color.secondary"
              color="@color.background"
              borderRadius="@radius.md"
            />
          </Container>
        </Container>
        <Container width="50%">
          <ImageComponent
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=400&fit=crop"
            alt="Team Collaboration"
            width="100%"
            height="400px"
            borderRadius={15}
            objectFit="cover"
          />
        </Container>
      </Container>

      {/* Services Section */}
      <Container
        flexDirection="column"
        gap="@spacing.lg"
        paddingLeft="@spacing.lg"
        paddingRight="@spacing.lg"
        paddingTop="@spacing.xl"
      >
        <Text
          text="Our Services"
          fontSize="@typography.2xl"
          fontWeight="bold"
          color="@color.text"
          textAlign="center"
        />

        <Container flexDirection="row" gap="@spacing.lg" flexWrap="wrap">
          {/* Service 1 */}
          <Container 
            width="30%" 
            flexDirection="column" 
            gap="@spacing.md"
            background="@color.background"
            radius="@radius.lg"
            shadow={2}
            paddingTop="@spacing.lg"
            paddingBottom="@spacing.lg"
            paddingLeft="@spacing.md"
            paddingRight="@spacing.md"
            alignItems="center"
          >
            <Container
              width="100px"
              height="100px"
              background="@color.primary"
              radius="@radius.full"
              justifyContent="center"
              alignItems="center"
            >
              <Text text="💻" fontSize="@typography.3xl" />
            </Container>
            <Text
              text="Web Development"
              fontSize="@typography.lg"
              fontWeight="bold"
              color="@color.text"
              textAlign="center"
            />
            <Text
              text="Custom websites and web applications built with modern technologies for optimal performance and user experience."
              fontSize="@typography.sm"
              color="@color.muted"
              textAlign="center"
              lineHeight="1.5"
            />
            <Button
              text="Learn More"
              backgroundColor="@color.secondary"
              color="@color.background"
              borderRadius="@radius.sm"
            />
          </Container>

          {/* Service 2 */}
          <Container 
            width="30%" 
            flexDirection="column" 
            gap="@spacing.md"
            background="@color.background"
            radius="@radius.lg"
            shadow={2}
            paddingTop="@spacing.lg"
            paddingBottom="@spacing.lg"
            paddingLeft="@spacing.md"
            paddingRight="@spacing.md"
            alignItems="center"
          >
            <Container
              width="100px"
              height="100px"
              background="@color.secondary"
              radius="@radius.full"
              justifyContent="center"
              alignItems="center"
            >
              <Text text="📱" fontSize="@typography.3xl" />
            </Container>
            <Text
              text="Mobile Apps"
              fontSize="@typography.lg"
              fontWeight="bold"
              color="@color.text"
              textAlign="center"
            />
            <Text
              text="Native and cross-platform mobile applications that engage users and drive business growth."
              fontSize="@typography.sm"
              color="@color.muted"
              textAlign="center"
              lineHeight="1.5"
            />
            <Button
              text="Learn More"
              backgroundColor="@color.secondary"
              color="@color.background"
              borderRadius="@radius.sm"
            />
          </Container>

          {/* Service 3 */}
          <Container 
            width="30%" 
            flexDirection="column" 
            gap="@spacing.md"
            background="@color.background"
            radius="@radius.lg"
            shadow={2}
            paddingTop="@spacing.lg"
            paddingBottom="@spacing.lg"
            paddingLeft="@spacing.md"
            paddingRight="@spacing.md"
            alignItems="center"
          >
            <Container
              width="100px"
              height="100px"
              background="@color.primary"
              radius="@radius.full"
              justifyContent="center"
              alignItems="center"
            >
              <Text text="🎨" fontSize="@typography.3xl" />
            </Container>
            <Text
              text="UI/UX Design"
              fontSize="@typography.lg"
              fontWeight="bold"
              color="@color.text"
              textAlign="center"
            />
            <Text
              text="Beautiful and intuitive designs that enhance user experience and reflect your brand identity."
              fontSize="@typography.sm"
              color="@color.muted"
              textAlign="center"
              lineHeight="1.5"
            />
            <Button
              text="Learn More"
              backgroundColor="@color.secondary"
              color="@color.background"
              borderRadius="@radius.sm"
            />
          </Container>
        </Container>
      </Container>

      {/* Stats Section */}
      <Container
        background="@color.muted"
        flexDirection="row"
        gap="@spacing.lg"
        paddingTop="@spacing.xl"
        paddingBottom="@spacing.xl"
        justifyContent="center"
      >
        <Container width="20%" flexDirection="column" alignItems="center" gap="@spacing.xs">
          <Text
            text="150+"
            fontSize="@typography.3xl"
            fontWeight="bold"
            color="@color.primary"
            textAlign="center"
          />
          <Text
            text="Projects Completed"
            fontSize="@typography.base"
            color="@color.text"
            textAlign="center"
          />
        </Container>

        <Container width="20%" flexDirection="column" alignItems="center" gap="@spacing.xs">
          <Text
            text="98%"
            fontSize="@typography.3xl"
            fontWeight="bold"
            color="@color.primary"
            textAlign="center"
          />
          <Text
            text="Client Satisfaction"
            fontSize="@typography.base"
            color="@color.text"
            textAlign="center"
          />
        </Container>

        <Container width="20%" flexDirection="column" alignItems="center" gap="@spacing.xs">
          <Text
            text="5+"
            fontSize="@typography.3xl"
            fontWeight="bold"
            color="@color.primary"
            textAlign="center"
          />
          <Text
            text="Years Experience"
            fontSize="@typography.base"
            color="@color.text"
            textAlign="center"
          />
        </Container>

        <Container width="20%" flexDirection="column" alignItems="center" gap="@spacing.xs">
          <Text
            text="24/7"
            fontSize="@typography.3xl"
            fontWeight="bold"
            color="@color.primary"
            textAlign="center"
          />
          <Text
            text="Support Available"
            fontSize="@typography.base"
            color="@color.text"
            textAlign="center"
          />
        </Container>
      </Container>

      {/* Testimonials */}
      <Container
        flexDirection="column"
        gap="@spacing.lg"
        paddingLeft="@spacing.lg"
        paddingRight="@spacing.lg"
        paddingTop="@spacing.xl"
      >
        <Text
          text="What Our Clients Say"
          fontSize="@typography.2xl"
          fontWeight="bold"
          color="@color.text"
          textAlign="center"
        />

        <Container flexDirection="row" gap="@spacing.lg">
          {/* Testimonial 1 */}
          <Container 
            width="50%" 
            flexDirection="column" 
            gap="@spacing.md"
            background="@color.background"
            radius="@radius.lg"
            shadow={1}
            paddingTop="@spacing.lg"
            paddingBottom="@spacing.lg"
            paddingLeft="@spacing.md"
            paddingRight="@spacing.md"
          >
            <Text
              text='"The team delivered an exceptional website that exceeded our expectations. Professional, creative, and reliable."'
              fontSize="@typography.base"
              color="@color.text"
              lineHeight="1.6"
              textAlign="center"
            />
            <Container flexDirection="row" gap="@spacing.md" alignItems="center" justifyContent="center">
              <ImageComponent
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face"
                alt="Client"
                width="60px"
                height="60px"
                borderRadius={30}
                objectFit="cover"
              />
              <Container flexDirection="column">
                <Text
                  text="John Smith"
                  fontSize="@typography.base"
                  fontWeight="semibold"
                  color="@color.text"
                />
                <Text
                  text="CEO, Tech Startup"
                  fontSize="@typography.sm"
                  color="@color.muted"
                />
              </Container>
            </Container>
          </Container>

          {/* Testimonial 2 */}
          <Container 
            width="50%" 
            flexDirection="column" 
            gap="@spacing.md"
            background="@color.background"
            radius="@radius.lg"
            shadow={1}
            paddingTop="@spacing.lg"
            paddingBottom="@spacing.lg"
            paddingLeft="@spacing.md"
            paddingRight="@spacing.md"
          >
            <Text
              text='"Outstanding mobile app development. The app is user-friendly, fast, and exactly what we needed for our business."'
              fontSize="@typography.base"
              color="@color.text"
              lineHeight="1.6"
              textAlign="center"
            />
            <Container flexDirection="row" gap="@spacing.md" alignItems="center" justifyContent="center">
              <ImageComponent
                src="https://images.unsplash.com/photo-1494790108755-2616b612b1bc?w=60&h=60&fit=crop&crop=face"
                alt="Client"
                width="60px"
                height="60px"
                borderRadius={30}
                objectFit="cover"
              />
              <Container flexDirection="column">
                <Text
                  text="Sarah Johnson"
                  fontSize="@typography.base"
                  fontWeight="semibold"
                  color="@color.text"
                />
                <Text
                  text="Marketing Director"
                  fontSize="@typography.sm"
                  color="@color.muted"
                />
              </Container>
            </Container>
          </Container>
        </Container>
      </Container>

      {/* CTA Section */}
      <Container
        background="@color.primary"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="@spacing.md"
        paddingTop="@spacing.xl"
        paddingBottom="@spacing.xl"
      >
        <Text
          text="Ready to Transform Your Business?"
          fontSize="@typography.2xl"
          fontWeight="bold"
          color="@color.background"
          textAlign="center"
        />
        <Text
          text="Let's discuss your project and create something amazing together"
          fontSize="@typography.base"
          color="@color.background"
          textAlign="center"
        />
        <Container flexDirection="row" gap="@spacing.md">
          <Button
            text="Start Your Project"
            backgroundColor="@color.background"
            color="@color.primary"
            borderRadius="@radius.md"
          />
          <Button
            text="Schedule Consultation"
            backgroundColor="@color.secondary"
            color="@color.background"
            borderRadius="@radius.md"
          />
        </Container>
      </Container>
    </Container>
  );
};

export default {
  PortfolioTemplate,
  EcommerceTemplate,  
  TravelTemplate,
  ServiceTemplate
};
