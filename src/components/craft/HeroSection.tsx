import { useNode, type UserComponent } from '@craftjs/core'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface HeroSectionProps {
  title?: string
  subtitle?: string
  backgroundImage?: string
  buttonText?: string
  buttonLink?: string
}

export const HeroSection: UserComponent<HeroSectionProps> = ({
  title = 'Welcome to Our Website',
  subtitle = 'Create amazing experiences with our drag and drop builder',
  backgroundImage = '',
  buttonText = 'Get Started',
  buttonLink = '#',
}) => {
  const {
    connectors: { connect, drag },
  } = useNode()

  return (
    <div
      ref={(ref: HTMLDivElement | null) => {
        if (ref) {
          connect(drag(ref))
        }
      }}
      className="relative min-h-[500px] flex items-center justify-center text-white"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          {title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          {subtitle}
        </p>
        {buttonText && (
          <a href={buttonLink}>
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
              {buttonText}
            </Button>
          </a>
        )}
      </div>
    </div>
  )
}

const HeroSectionSettings = () => {
  const {
    actions: { setProp },
    props: { title, subtitle, backgroundImage, buttonText, buttonLink },
  } = useNode((node) => ({
    props: node.data.props,
  }))

  return (
    <div className="space-y-4 p-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title || ''}
          onChange={(e) => setProp((props: HeroSectionProps) => {
            props.title = e.target.value
          })}
          placeholder="Enter hero title"
        />
      </div>

      <div>
        <Label htmlFor="subtitle">Subtitle</Label>
        <Input
          id="subtitle"
          value={subtitle || ''}
          onChange={(e) => setProp((props: HeroSectionProps) => {
            props.subtitle = e.target.value
          })}
          placeholder="Enter hero subtitle"
        />
      </div>

      <div>
        <Label htmlFor="backgroundImage">Background Image URL</Label>
        <Input
          id="backgroundImage"
          value={backgroundImage || ''}
          onChange={(e) => setProp((props: HeroSectionProps) => {
            props.backgroundImage = e.target.value
          })}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div>
        <Label htmlFor="buttonText">Button Text</Label>
        <Input
          id="buttonText"
          value={buttonText || ''}
          onChange={(e) => setProp((props: HeroSectionProps) => {
            props.buttonText = e.target.value
          })}
          placeholder="Button text"
        />
      </div>

      <div>
        <Label htmlFor="buttonLink">Button Link</Label>
        <Input
          id="buttonLink"
          value={buttonLink || ''}
          onChange={(e) => setProp((props: HeroSectionProps) => {
            props.buttonLink = e.target.value
          })}
          placeholder="https://example.com"
        />
      </div>
    </div>
  )
}

HeroSection.craft = {
  props: {
    title: 'Welcome to Our Website',
    subtitle: 'Create amazing experiences with our drag and drop builder',
    backgroundImage: '',
    buttonText: 'Get Started',
    buttonLink: '#',
  },
  related: {
    settings: HeroSectionSettings,
  },
}
