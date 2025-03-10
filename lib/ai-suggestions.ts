interface UserPersona {
  description: string;
  expertise: string[];
  industry: string[];
  skillLevel: 'junior' | 'mid' | 'senior';
  typicalRates: {
    [key: string]: number;
  };
}

interface Suggestion {
  name: string;
  rate: number;
  description: string;
}

export async function createUserPersona(description: string): Promise<UserPersona> {
  // This would use OpenAI/other AI service in production
  const keywords = description.toLowerCase();
  
  // Example: "I am a freelance graphic designer specializing in logo design and branding for startups."
  const isDesigner = keywords.includes('design') || keywords.includes('logo') || keywords.includes('brand');
  const isForStartups = keywords.includes('startup');
  const isSenior = keywords.includes('senior') || keywords.includes('10 years') || keywords.includes('expert');
  
  return {
    description,
    expertise: isDesigner ? ['Graphic Design', 'Logo Design', 'Brand Identity'] : [],
    industry: isForStartups ? ['Technology', 'Startups'] : [],
    skillLevel: isSenior ? 'senior' : 'mid',
    typicalRates: {
      'Logo Design': 750,
      'Brand Identity': 2500,
      'Brand Guidelines': 1500,
      'Business Card Design': 250,
      'Social Media Kit': 500
    }
  };
}

export async function suggestInvoiceItems(
  projectDescription: string,
  userPersona: UserPersona
): Promise<Suggestion[]> {
  try {
    const response = await fetch('/api/ai/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        projectDescription,
        userPersona,
      }),
    })

    if (!response.ok) {
      throw new Error('AI analysis failed')
    }

    const data = await response.json()
    return data.items

  } catch (error) {
    console.error('Error getting AI suggestions:', error)
    
    // Fallback to basic analysis if AI fails
    return basicAnalysis(projectDescription, userPersona)
  }
}

// Fallback function using basic keyword matching
function basicAnalysis(
  projectDescription: string,
  userPersona: UserPersona | undefined
): Suggestion[] {
  const keywords = projectDescription.toLowerCase()
  const suggestions: Suggestion[] = []

  // Default rates
  const defaultRates = {
    'Home Page Design': 1200,
    'Inner Page Design': 800,
    'Copywriting': 400,
    'Illustration': 600,
    'Animation': 800,
    'Brand Identity': 2500,
    'Logo Design': 750,
    'UI Design': 800
  }

  if (keywords.includes('website') || keywords.includes('web design')) {
    const pageCount = parseInt(keywords.match(/(\d+)\s*page/)?.[1] || '1')
    const baseRate = (userPersona?.typicalRates?.['Web Design'] || defaultRates['Home Page Design'])

    // Always add home page as it's typically more complex
    suggestions.push({
      name: 'Home Page Design',
      rate: baseRate,
      description: 'Custom homepage design including hero section, key features, and main content areas'
    })

    // Add remaining pages
    if (pageCount > 1) {
      suggestions.push({
        name: `Inner Pages Design (${pageCount - 1} pages)`,
        rate: defaultRates['Inner Page Design'] * (pageCount - 1),
        description: `Design for ${pageCount - 1} additional pages including about, services, contact pages`
      })
    }

    // Check for animations
    if (keywords.includes('animation')) {
      suggestions.push({
        name: 'Interactive Animations',
        rate: defaultRates['Animation'],
        description: 'Custom animations for page transitions, scroll effects, and interactive elements'
      })
    }

    // Check for illustrations
    if (keywords.includes('illustration')) {
      suggestions.push({
        name: 'Custom Illustrations',
        rate: defaultRates['Illustration'],
        description: 'Unique illustrations to enhance visual storytelling and brand identity'
      })
    }

    // Check for copywriting
    if (keywords.includes('copy') || keywords.includes('writing')) {
      suggestions.push({
        name: 'Professional Copywriting',
        rate: defaultRates['Copywriting'] * pageCount,
        description: `Engaging content writing for ${pageCount} pages including SEO optimization`
      })
    }

    // Add responsive design as a standard
    suggestions.push({
      name: 'Responsive Design Implementation',
      rate: baseRate * 0.3,
      description: 'Making the website fully responsive across all devices and screen sizes'
    })
  }

  return suggestions
} 