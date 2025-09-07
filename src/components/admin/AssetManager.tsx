import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardBody } from '../ui/card';
import { Upload, Image, File, Trash2, Download, Eye } from 'lucide-react';

interface Asset {
  id: string;
  name: string;
  type: 'image' | 'document' | 'video';
  url: string;
  size: number;
  uploadedAt: string;
  alt?: string;
  description?: string;
}

interface AssetManagerProps {
  onSelect?: (asset: Asset) => void;
  onClose?: () => void;
  selectMode?: boolean;
}

export default function AssetManager({ onSelect, onClose, selectMode = false }: AssetManagerProps) {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'image' | 'document' | 'video'>('all');

  useEffect(() => {
    loadAssets();
  }, []);

  const loadAssets = async () => {
    setLoading(true);
    try {
      // Mock data - in real implementation, this would fetch from API
      const mockAssets: Asset[] = [
        {
          id: '1',
          name: 'park-villa-1.jpg',
          type: 'image',
          url: '/images/park-villa-1.jpg',
          size: 1024000,
          uploadedAt: '2025-01-01T00:00:00Z',
          alt: 'Park Villa Außenansicht',
          description: 'Hauptansicht der Park Villa'
        },
        {
          id: '2',
          name: 'luxury-condo.jpg',
          type: 'image',
          url: '/images/luxury-condo.jpg',
          size: 856000,
          uploadedAt: '2025-01-01T00:00:00Z',
          alt: 'Luxury Condo',
          description: 'Moderne Condo-Anlage'
        },
        {
          id: '3',
          name: 'property-brochure.pdf',
          type: 'document',
          url: '/documents/property-brochure.pdf',
          size: 2048000,
          uploadedAt: '2025-01-01T00:00:00Z',
          description: 'Immobilien-Broschüre'
        }
      ];
      
      setAssets(mockAssets);
    } catch (error) {
      console.error('Error loading assets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      // Mock upload - in real implementation, this would upload to server
      for (const file of Array.from(files)) {
        const newAsset: Asset = {
          id: Date.now().toString(),
          name: file.name,
          type: file.type.startsWith('image/') ? 'image' : 
                file.type.startsWith('video/') ? 'video' : 'document',
          url: URL.createObjectURL(file),
          size: file.size,
          uploadedAt: new Date().toISOString(),
        };
        
        setAssets(prev => [newAsset, ...prev]);
      }
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (assetId: string) => {
    if (!confirm('Sind Sie sicher, dass Sie diese Datei löschen möchten?')) {
      return;
    }

    try {
      setAssets(prev => prev.filter(asset => asset.id !== assetId));
    } catch (error) {
      console.error('Error deleting asset:', error);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image size={20} />;
      case 'video': return <File size={20} />;
      default: return <File size={20} />;
    }
  };

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         asset.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || asset.type === filterType;
    return matchesSearch && matchesType;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Lade Assets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold" style={{color: 'var(--color-text)'}}>
          Asset-Manager
        </h1>
        {onClose && (
          <Button 
            variant="outline" 
            onClick={onClose}
            style={{borderColor: 'var(--card-border)'}}
          >
            Schließen
          </Button>
        )}
      </div>

      {/* Upload Section */}
      <Card style={{borderColor: 'var(--card-border)'}}>
        <CardBody>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Input
                type="file"
                multiple
                accept="image/*,video/*,.pdf,.doc,.docx"
                onChange={handleFileUpload}
                disabled={uploading}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
            {uploading && (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span className="text-sm">Upload...</span>
              </div>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Search and Filter */}
      <Card style={{borderColor: 'var(--card-border)'}}>
        <CardBody>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Assets durchsuchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="px-3 py-2 border rounded-lg text-sm"
                style={{
                  backgroundColor: 'var(--input-bg)',
                  borderColor: 'var(--input-border)',
                  color: 'var(--color-text)'
                }}
              >
                <option value="all">Alle Typen</option>
                <option value="image">Bilder</option>
                <option value="video">Videos</option>
                <option value="document">Dokumente</option>
              </select>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAssets.map((asset) => (
          <Card key={asset.id} style={{borderColor: 'var(--card-border)'}}>
            <CardBody>
              <div className="space-y-3">
                {/* Asset Preview */}
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                  {asset.type === 'image' ? (
                    <img 
                      src={asset.url} 
                      alt={asset.alt || asset.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      {getFileIcon(asset.type)}
                      <p className="text-xs mt-1" style={{color: 'var(--color-muted)'}}>
                        {asset.type.toUpperCase()}
                      </p>
                    </div>
                  )}
                </div>

                {/* Asset Info */}
                <div>
                  <h3 className="font-semibold text-sm truncate" style={{color: 'var(--color-text)'}}>
                    {asset.name}
                  </h3>
                  <p className="text-xs" style={{color: 'var(--color-muted)'}}>
                    {formatFileSize(asset.size)}
                  </p>
                  {asset.description && (
                    <p className="text-xs mt-1" style={{color: 'var(--color-muted)'}}>
                      {asset.description}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {selectMode && (
                    <Button
                      size="sm"
                      onClick={() => onSelect?.(asset)}
                      style={{
                        backgroundColor: 'var(--color-primary)',
                        borderColor: 'var(--color-primary)'
                      }}
                    >
                      Auswählen
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(asset.url, '_blank')}
                    style={{borderColor: 'var(--card-border)'}}
                  >
                    <Eye size={14} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = asset.url;
                      link.download = asset.name;
                      link.click();
                    }}
                    style={{borderColor: 'var(--card-border)'}}
                  >
                    <Download size={14} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(asset.id)}
                    style={{borderColor: 'var(--card-border)', color: '#ef4444'}}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {filteredAssets.length === 0 && (
        <Card style={{borderColor: 'var(--card-border)'}}>
          <CardBody className="text-center py-12">
            <p style={{color: 'var(--color-muted)'}}>
              {searchQuery ? 'Keine Assets gefunden.' : 'Noch keine Assets vorhanden.'}
            </p>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
