// Multi-language content management system
export interface MultiLanguageContent {
  id: string;
  type: 'property' | 'page' | 'district';
  baseSlug: string; // Base slug without locale
  translations: {
    [locale: string]: {
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
    };
  };
  sharedData?: any; // Data shared across all locales (e.g., property data)
}

export interface TranslationStatus {
  locale: string;
  exists: boolean;
  published: boolean;
  lastModified: string;
  needsUpdate: boolean;
}

export class MultiLanguageCMSService {
  private static content: Map<string, MultiLanguageContent> = new Map();
  private static supportedLocales = ['de', 'en', 'th'];

  static async getContent(type: string, locale: string, slug?: string): Promise<MultiLanguageContent[]> {
    const results: MultiLanguageContent[] = [];
    
    for (const content of this.content.values()) {
      if (content.type === type) {
        const translation = content.translations[locale];
        if (translation && (!slug || translation.slug === slug)) {
          results.push(content);
        }
      }
    }
    
    return results;
  }

  static async getContentById(id: string): Promise<MultiLanguageContent | null> {
    return this.content.get(id) || null;
  }

  static async getTranslationStatus(id: string): Promise<TranslationStatus[]> {
    const content = this.content.get(id);
    if (!content) return [];

    return this.supportedLocales.map(locale => {
      const translation = content.translations[locale];
      return {
        locale,
        exists: !!translation,
        published: translation?.metadata.published || false,
        lastModified: translation?.metadata.updatedAt || '',
        needsUpdate: this.needsUpdate(content, locale)
      };
    });
  }

  static async createContent(
    type: string,
    baseSlug: string,
    translations: { [locale: string]: any },
    sharedData?: any
  ): Promise<MultiLanguageContent> {
    const id = `${type}-${baseSlug}-${Date.now()}`;
    const now = new Date().toISOString();
    
    const newContent: MultiLanguageContent = {
      id,
      type: type as any,
      baseSlug,
      translations: {},
      sharedData
    };

    // Create translations for each locale
    for (const [locale, translationData] of Object.entries(translations)) {
      newContent.translations[locale] = {
        ...translationData,
        metadata: {
          ...translationData.metadata,
          createdAt: translationData.metadata?.createdAt || now,
          updatedAt: now,
          published: translationData.metadata?.published ?? true,
        }
      };
    }

    this.content.set(id, newContent);
    return newContent;
  }

  static async updateTranslation(
    id: string,
    locale: string,
    updates: any
  ): Promise<MultiLanguageContent | null> {
    const content = this.content.get(id);
    if (!content) return null;

    const existingTranslation = content.translations[locale];
    if (!existingTranslation) {
      // Create new translation
      content.translations[locale] = {
        ...updates,
        metadata: {
          ...updates.metadata,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          published: updates.metadata?.published ?? true,
        }
      };
    } else {
      // Update existing translation
      content.translations[locale] = {
        ...existingTranslation,
        ...updates,
        metadata: {
          ...existingTranslation.metadata,
          ...updates.metadata,
          updatedAt: new Date().toISOString(),
        }
      };
    }

    this.content.set(id, content);
    return content;
  }

  static async deleteContent(id: string): Promise<boolean> {
    return this.content.delete(id);
  }

  static async deleteTranslation(id: string, locale: string): Promise<boolean> {
    const content = this.content.get(id);
    if (!content) return false;

    delete content.translations[locale];
    this.content.set(id, content);
    return true;
  }

  static async copyTranslation(
    id: string,
    sourceLocale: string,
    targetLocale: string
  ): Promise<MultiLanguageContent | null> {
    const content = this.content.get(id);
    if (!content) return null;

    const sourceTranslation = content.translations[sourceLocale];
    if (!sourceTranslation) return null;

    const now = new Date().toISOString();
    content.translations[targetLocale] = {
      ...sourceTranslation,
      slug: `${sourceTranslation.slug}-${targetLocale}`, // Make slug unique
      metadata: {
        ...sourceTranslation.metadata,
        createdAt: now,
        updatedAt: now,
        published: false, // Mark as draft when copying
      }
    };

    this.content.set(id, content);
    return content;
  }

  static async searchContent(
    query: string,
    locale?: string,
    type?: string
  ): Promise<MultiLanguageContent[]> {
    const results: MultiLanguageContent[] = [];
    const searchTerm = query.toLowerCase();

    for (const content of this.content.values()) {
      if (type && content.type !== type) continue;

      const searchLocales = locale ? [locale] : this.supportedLocales;
      
      for (const searchLocale of searchLocales) {
        const translation = content.translations[searchLocale];
        if (!translation) continue;

        if (
          translation.title.toLowerCase().includes(searchTerm) ||
          translation.content.toLowerCase().includes(searchTerm) ||
          translation.metadata.description?.toLowerCase().includes(searchTerm)
        ) {
          results.push(content);
          break; // Only add once per content
        }
      }
    }

    return results;
  }

  static async getMissingTranslations(): Promise<Array<{
    content: MultiLanguageContent;
    missingLocales: string[];
  }>> {
    const missing: Array<{
      content: MultiLanguageContent;
      missingLocales: string[];
    }> = [];

    for (const content of this.content.values()) {
      const missingLocales = this.supportedLocales.filter(
        locale => !content.translations[locale]
      );
      
      if (missingLocales.length > 0) {
        missing.push({ content, missingLocales });
      }
    }

    return missing;
  }

  static async getOutdatedTranslations(): Promise<Array<{
    content: MultiLanguageContent;
    outdatedLocales: string[];
  }>> {
    const outdated: Array<{
      content: MultiLanguageContent;
      outdatedLocales: string[];
    }> = [];

    for (const content of this.content.values()) {
      const outdatedLocales = this.supportedLocales.filter(
        locale => this.needsUpdate(content, locale)
      );
      
      if (outdatedLocales.length > 0) {
        outdated.push({ content, outdatedLocales });
      }
    }

    return outdated;
  }

  private static needsUpdate(content: MultiLanguageContent, locale: string): boolean {
    const translation = content.translations[locale];
    if (!translation) return true;

    // Find the most recently updated translation
    const allTranslations = Object.values(content.translations);
    const mostRecent = allTranslations.reduce((latest, current) => {
      return new Date(current.metadata.updatedAt) > new Date(latest.metadata.updatedAt) 
        ? current 
        : latest;
    });

    // Check if this translation is older than the most recent one
    return new Date(translation.metadata.updatedAt) < new Date(mostRecent.metadata.updatedAt);
  }

  static getSupportedLocales(): string[] {
    return [...this.supportedLocales];
  }

  static getLocaleLabel(locale: string): string {
    const labels: { [key: string]: string } = {
      'de': 'Deutsch',
      'en': 'English',
      'th': 'ไทย'
    };
    return labels[locale] || locale;
  }

  // Initialize with sample data
  static initializeSampleData() {
    const sampleContent: MultiLanguageContent = {
      id: 'property-park-villa-1',
      type: 'property',
      baseSlug: 'park-villa-privatpool',
      sharedData: {
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
      },
      translations: {
        de: {
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
          }
        },
        en: {
          title: 'Park Villa with Private Pool',
          slug: 'park-villa-private-pool',
          content: 'Luxurious villa with private pool in quiet location.',
          metadata: {
            description: 'Dream villa with private pool in Pattaya',
            image: '/images/park-villa.jpg',
            tags: ['villa', 'pool', 'luxury'],
            published: true,
            createdAt: '2025-01-01T00:00:00Z',
            updatedAt: '2025-01-01T00:00:00Z',
          }
        },
        th: {
          title: 'วิลล่าพาร์คพร้อมสระว่ายน้ำส่วนตัว',
          slug: 'park-villa-private-pool-th',
          content: 'วิลล่าหรูหราพร้อมสระว่ายน้ำส่วนตัวในทำเลเงียบสงบ',
          metadata: {
            description: 'วิลล่าฝันพร้อมสระว่ายน้ำส่วนตัวในพัทยา',
            image: '/images/park-villa.jpg',
            tags: ['วิลล่า', 'สระว่ายน้ำ', 'หรูหรา'],
            published: false, // Not yet published in Thai
            createdAt: '2025-01-01T00:00:00Z',
            updatedAt: '2025-01-01T00:00:00Z',
          }
        }
      }
    };

    this.content.set(sampleContent.id, sampleContent);
  }
}

// Initialize sample data
MultiLanguageCMSService.initializeSampleData();
