// Simple CMS-like content management system
export interface CMSContent {
  id: string;
  type: 'property' | 'page' | 'district';
  locale: 'de' | 'en' | 'th';
  title: string;
  slug: string;
  content: string;
  metadata: {
    description?: string;
    image?: string;
    tags?: string[];
    published?: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export interface PropertyCMS extends CMSContent {
  type: 'property';
  propertyData: {
    price_thb: number;
    bedrooms: number;
    bathrooms: number;
    living_sqm?: number;
    land_sqm?: number;
    type: string;
    location: string;
    features: string[];
    amenities: string[];
    images: string[];
  };
}

export interface PageCMS extends CMSContent {
  type: 'page';
  pageData: {
    template: 'about' | 'services' | 'contact' | 'legal';
    sections: Array<{
      id: string;
      type: 'text' | 'image' | 'hero' | 'cards';
      content: any;
    }>;
  };
}

export interface DistrictCMS extends CMSContent {
  type: 'district';
  districtData: {
    location: {
      lat?: number;
      lng?: number;
    };
    properties: string[]; // Property IDs
    features: string[];
    images: string[];
  };
}

// Mock CMS API functions
export class CMSService {
  private static content: Map<string, CMSContent> = new Map();

  static async getContent(type: string, locale: string, slug?: string): Promise<CMSContent[]> {
    const results: CMSContent[] = [];
    
    for (const [id, content] of this.content.entries()) {
      if (content.type === type && content.locale === locale) {
        if (!slug || content.slug === slug) {
          results.push(content);
        }
      }
    }
    
    return results;
  }

  static async getContentById(id: string): Promise<CMSContent | null> {
    return this.content.get(id) || null;
  }

  static async createContent(content: Omit<CMSContent, 'id' | 'metadata'> & { metadata: Partial<CMSContent['metadata']> }): Promise<CMSContent> {
    const id = `${content.type}-${content.locale}-${content.slug}-${Date.now()}`;
    const now = new Date().toISOString();
    
    const newContent: CMSContent = {
      ...content,
      id,
      metadata: {
        ...content.metadata,
        createdAt: content.metadata.createdAt || now,
        updatedAt: now,
        published: content.metadata.published ?? true,
      }
    };

    this.content.set(id, newContent);
    return newContent;
  }

  static async updateContent(id: string, updates: Partial<CMSContent>): Promise<CMSContent | null> {
    const existing = this.content.get(id);
    if (!existing) return null;

    const updated: CMSContent = {
      ...existing,
      ...updates,
      id,
      metadata: {
        ...existing.metadata,
        ...updates.metadata,
        updatedAt: new Date().toISOString(),
      }
    };

    this.content.set(id, updated);
    return updated;
  }

  static async deleteContent(id: string): Promise<boolean> {
    return this.content.delete(id);
  }

  static async searchContent(query: string, locale?: string): Promise<CMSContent[]> {
    const results: CMSContent[] = [];
    const searchTerm = query.toLowerCase();

    for (const content of this.content.values()) {
      if (locale && content.locale !== locale) continue;
      
      if (
        content.title.toLowerCase().includes(searchTerm) ||
        content.content.toLowerCase().includes(searchTerm) ||
        content.metadata.description?.toLowerCase().includes(searchTerm)
      ) {
        results.push(content);
      }
    }

    return results;
  }

  // Initialize with sample data
  static initializeSampleData() {
    const sampleProperties: PropertyCMS[] = [
      {
        id: 'property-de-park-villa-1',
        type: 'property',
        locale: 'de',
        title: 'Park Villa mit Privatpool',
        slug: 'park-villa-privatpool',
        content: 'Luxuriöse Villa mit eigenem Pool in ruhiger Lage.',
        metadata: {
          description: 'Traumhafte Villa mit Privatpool in Pattaya',
          image: '/images/park-villa.jpg',
          tags: ['villa', 'pool', 'luxus'],
          published: true,
          createdAt: '2025-01-01T00:00:00Z',
          updatedAt: '2025-01-01T00:00:00Z',
        },
        propertyData: {
          price_thb: 15000000,
          bedrooms: 4,
          bathrooms: 3,
          living_sqm: 250,
          land_sqm: 800,
          type: 'villa',
          location: 'Pattaya',
          features: ['Privatpool', 'Garten', 'Parkplatz'],
          amenities: ['AC', 'Internet', 'Sicherheit'],
          images: ['/images/park-villa-1.jpg', '/images/park-villa-2.jpg'],
        }
      }
    ];

    sampleProperties.forEach(prop => {
      this.content.set(prop.id, prop);
    });
  }
}

// Initialize sample data
CMSService.initializeSampleData();
