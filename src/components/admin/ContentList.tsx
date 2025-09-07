import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { Card, CardBody } from '../ui/card';
import { CMSService, CMSContent } from '../../lib/cms';
import { Edit, Trash2, Eye, Plus } from 'lucide-react';

interface ContentListProps {
  contentType: 'property' | 'page' | 'district';
  locale: 'de' | 'en' | 'th';
  onEdit?: (content: CMSContent) => void;
  onDelete?: (contentId: string) => void;
  onView?: (content: CMSContent) => void;
  onCreate?: () => void;
}

export default function ContentList({ 
  contentType, 
  locale, 
  onEdit, 
  onDelete, 
  onView, 
  onCreate 
}: ContentListProps) {
  const [contents, setContents] = useState<CMSContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPublished, setFilterPublished] = useState<'all' | 'published' | 'draft'>('all');

  useEffect(() => {
    loadContents();
  }, [contentType, locale]);

  const loadContents = async () => {
    setLoading(true);
    try {
      const results = await CMSService.getContent(contentType, locale);
      setContents(results);
    } catch (error) {
      console.error('Error loading contents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadContents();
      return;
    }

    setLoading(true);
    try {
      const results = await CMSService.searchContent(searchQuery, locale);
      setContents(results.filter(c => c.type === contentType));
    } catch (error) {
      console.error('Error searching contents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (contentId: string) => {
    if (!confirm('Sind Sie sicher, dass Sie diesen Inhalt löschen möchten?')) {
      return;
    }

    try {
      await CMSService.deleteContent(contentId);
      setContents(prev => prev.filter(c => c.id !== contentId));
      onDelete?.(contentId);
    } catch (error) {
      console.error('Error deleting content:', error);
    }
  };

  const filteredContents = contents.filter(content => {
    if (filterPublished === 'published') return content.metadata.published;
    if (filterPublished === 'draft') return !content.metadata.published;
    return true;
  });

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'property': return 'Immobilie';
      case 'page': return 'Seite';
      case 'district': return 'Stadtteil';
      default: return type;
    }
  };

  const getLocaleLabel = (locale: string) => {
    switch (locale) {
      case 'de': return 'Deutsch';
      case 'en': return 'English';
      case 'th': return 'ไทย';
      default: return locale;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Lade Inhalte...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold" style={{color: 'var(--color-text)'}}>
          {getTypeLabel(contentType)} - {getLocaleLabel(locale)}
        </h1>
        <Button 
          onClick={onCreate}
          style={{
            backgroundColor: 'var(--color-primary)',
            borderColor: 'var(--color-primary)'
          }}
        >
          <Plus size={16} className="mr-2" />
          Neu erstellen
        </Button>
      </div>

      {/* Search and Filter */}
      <Card style={{borderColor: 'var(--card-border)'}}>
        <CardBody>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Inhalte durchsuchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div className="flex gap-2">
              <Select
                value={filterPublished}
                onChange={(e) => setFilterPublished(e.target.value as any)}
              >
                <option value="all">Alle</option>
                <option value="published">Veröffentlicht</option>
                <option value="draft">Entwurf</option>
              </Select>
              <Button 
                onClick={handleSearch}
                variant="outline"
                style={{borderColor: 'var(--card-border)'}}
              >
                Suchen
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Content List */}
      <div className="space-y-4">
        {filteredContents.length === 0 ? (
          <Card style={{borderColor: 'var(--card-border)'}}>
            <CardBody className="text-center py-12">
              <p style={{color: 'var(--color-muted)'}}>
                {searchQuery ? 'Keine Inhalte gefunden.' : 'Noch keine Inhalte vorhanden.'}
              </p>
            </CardBody>
          </Card>
        ) : (
          filteredContents.map((content) => (
            <Card key={content.id} style={{borderColor: 'var(--card-border)'}}>
              <CardBody>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold" style={{color: 'var(--color-text)'}}>
                        {content.title}
                      </h3>
                      <span 
                        className={`px-2 py-1 rounded-full text-xs ${
                          content.metadata.published 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {content.metadata.published ? 'Veröffentlicht' : 'Entwurf'}
                      </span>
                    </div>
                    
                    <p className="text-sm mb-2" style={{color: 'var(--color-muted)'}}>
                      {content.metadata.description || 'Keine Beschreibung'}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs" style={{color: 'var(--color-muted)'}}>
                      <span>Slug: {content.slug}</span>
                      <span>Erstellt: {new Date(content.metadata.createdAt).toLocaleDateString('de-DE')}</span>
                      <span>Geändert: {new Date(content.metadata.updatedAt).toLocaleDateString('de-DE')}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onView?.(content)}
                      style={{borderColor: 'var(--card-border)'}}
                    >
                      <Eye size={14} />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit?.(content)}
                      style={{borderColor: 'var(--card-border)'}}
                    >
                      <Edit size={14} />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(content.id)}
                      style={{borderColor: 'var(--card-border)', color: '#ef4444'}}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
