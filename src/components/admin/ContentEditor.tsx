import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select } from '../ui/select';
import { Label } from '../ui/label';
import { Card, CardBody } from '../ui/card';
import { CMSService, CMSContent, PropertyCMS, PageCMS, DistrictCMS } from '../../lib/cms';

interface ContentEditorProps {
  contentType: 'property' | 'page' | 'district';
  locale: 'de' | 'en' | 'th';
  contentId?: string;
  onSave?: (content: CMSContent) => void;
  onCancel?: () => void;
}

export default function ContentEditor({ 
  contentType, 
  locale, 
  contentId, 
  onSave, 
  onCancel 
}: ContentEditorProps) {
  const [content, setContent] = useState<Partial<CMSContent>>({
    type: contentType,
    locale,
    title: '',
    slug: '',
    content: '',
    metadata: {
      description: '',
      image: '',
      tags: [],
      published: true,
    }
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (contentId) {
      loadContent();
    }
  }, [contentId]);

  const loadContent = async () => {
    if (!contentId) return;
    
    setLoading(true);
    try {
      const existingContent = await CMSService.getContentById(contentId);
      if (existingContent) {
        setContent(existingContent);
      }
    } catch (error) {
      console.error('Error loading content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      let savedContent: CMSContent;
      
      if (contentId) {
        savedContent = await CMSService.updateContent(contentId, content) as CMSContent;
      } else {
        savedContent = await CMSService.createContent(content as any);
      }
      
      onSave?.(savedContent);
    } catch (error) {
      console.error('Error saving content:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setContent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMetadataChange = (field: string, value: any) => {
    setContent(prev => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        [field]: value
      }
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Lade Inhalt...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold" style={{color: 'var(--color-text)'}}>
          {contentId ? 'Inhalt bearbeiten' : 'Neuen Inhalt erstellen'}
        </h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={onCancel}
            style={{borderColor: 'var(--card-border)'}}
          >
            Abbrechen
          </Button>
          <Button 
            onClick={handleSave}
            disabled={saving}
            style={{
              backgroundColor: 'var(--color-primary)',
              borderColor: 'var(--color-primary)'
            }}
          >
            {saving ? 'Speichern...' : 'Speichern'}
          </Button>
        </div>
      </div>

      <Card style={{borderColor: 'var(--card-border)'}}>
        <CardBody className="space-y-6">
          {/* Basic Content Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Titel *</Label>
              <Input
                id="title"
                value={content.title || ''}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Titel eingeben"
              />
            </div>
            <div>
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                value={content.slug || ''}
                onChange={(e) => handleInputChange('slug', e.target.value)}
                placeholder="url-freundlicher-name"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="content">Inhalt</Label>
            <Textarea
              id="content"
              value={content.content || ''}
              onChange={(e) => handleInputChange('content', e.target.value)}
              rows={8}
              placeholder="Inhalt eingeben..."
            />
          </div>

          {/* Metadata Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="description">Beschreibung</Label>
              <Input
                id="description"
                value={content.metadata?.description || ''}
                onChange={(e) => handleMetadataChange('description', e.target.value)}
                placeholder="Kurze Beschreibung"
              />
            </div>
            <div>
              <Label htmlFor="image">Bild-URL</Label>
              <Input
                id="image"
                value={content.metadata?.image || ''}
                onChange={(e) => handleMetadataChange('image', e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="tags">Tags (kommagetrennt)</Label>
            <Input
              id="tags"
              value={content.metadata?.tags?.join(', ') || ''}
              onChange={(e) => handleMetadataChange('tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
              placeholder="tag1, tag2, tag3"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="published"
              checked={content.metadata?.published || false}
              onChange={(e) => handleMetadataChange('published', e.target.checked)}
              className="rounded"
            />
            <Label htmlFor="published">Veröffentlicht</Label>
          </div>

          {/* Type-specific fields */}
          {contentType === 'property' && (
            <PropertyEditorFields 
              content={content as PropertyCMS}
              onChange={handleInputChange}
            />
          )}
        </CardBody>
      </Card>
    </div>
  );
}

function PropertyEditorFields({ 
  content, 
  onChange 
}: { 
  content: Partial<PropertyCMS>; 
  onChange: (field: string, value: any) => void;
}) {
  const handlePropertyDataChange = (field: string, value: any) => {
    onChange('propertyData', {
      ...content.propertyData,
      [field]: value
    });
  };

  return (
    <div className="border-t pt-6" style={{borderColor: 'var(--card-border)'}}>
      <h3 className="text-lg font-semibold mb-4" style={{color: 'var(--color-text)'}}>
        Immobilien-Daten
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="price">Preis (THB)</Label>
          <Input
            id="price"
            type="number"
            value={content.propertyData?.price_thb || ''}
            onChange={(e) => handlePropertyDataChange('price_thb', parseInt(e.target.value))}
            placeholder="15000000"
          />
        </div>
        <div>
          <Label htmlFor="bedrooms">Schlafzimmer</Label>
          <Input
            id="bedrooms"
            type="number"
            value={content.propertyData?.bedrooms || ''}
            onChange={(e) => handlePropertyDataChange('bedrooms', parseInt(e.target.value))}
            placeholder="4"
          />
        </div>
        <div>
          <Label htmlFor="bathrooms">Badezimmer</Label>
          <Input
            id="bathrooms"
            type="number"
            value={content.propertyData?.bathrooms || ''}
            onChange={(e) => handlePropertyDataChange('bathrooms', parseInt(e.target.value))}
            placeholder="3"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <Label htmlFor="living_sqm">Wohnfläche (m²)</Label>
          <Input
            id="living_sqm"
            type="number"
            value={content.propertyData?.living_sqm || ''}
            onChange={(e) => handlePropertyDataChange('living_sqm', parseInt(e.target.value))}
            placeholder="250"
          />
        </div>
        <div>
          <Label htmlFor="land_sqm">Grundstück (m²)</Label>
          <Input
            id="land_sqm"
            type="number"
            value={content.propertyData?.land_sqm || ''}
            onChange={(e) => handlePropertyDataChange('land_sqm', parseInt(e.target.value))}
            placeholder="800"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <Label htmlFor="type">Typ</Label>
          <Select
            id="type"
            value={content.propertyData?.type || ''}
            onChange={(e) => handlePropertyDataChange('type', e.target.value)}
          >
            <option value="">Typ wählen</option>
            <option value="villa">Villa</option>
            <option value="house">Haus</option>
            <option value="condo">Condo</option>
            <option value="apartment">Apartment</option>
            <option value="townhouse">Townhouse</option>
            <option value="land">Grundstück</option>
          </Select>
        </div>
        <div>
          <Label htmlFor="location">Standort</Label>
          <Input
            id="location"
            value={content.propertyData?.location || ''}
            onChange={(e) => handlePropertyDataChange('location', e.target.value)}
            placeholder="Pattaya"
          />
        </div>
      </div>
    </div>
  );
}
