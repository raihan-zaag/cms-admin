import React, { useState, useEffect } from 'react';
import { X, Search, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { apiService } from '@/services/api';

interface MediaFile {
  id: string;
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  url: string;
  createdAt: string;
}

interface MediaPickerProps {
  onSelect: (url: string) => void;
  onClose: () => void;
  isOpen: boolean;
}

export const MediaPicker: React.FC<MediaPickerProps> = ({ onSelect, onClose, isOpen }) => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      loadFiles();
    }
  }, [isOpen]);

  const loadFiles = async () => {
    try {
      const response = await apiService.getMediaFiles();
      setFiles(response.files || []);
    } catch (error) {
      console.error('Failed to load media files:', error);
      // Fallback to empty array if API fails
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const response = await apiService.uploadFile(file);
      setFiles([response.file, ...files]);
    } catch (error) {
      console.error('Failed to upload file:', error);
      alert('Failed to upload file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const filteredFiles = files.filter(file =>
    file.originalName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isImage = (mimetype: string) => mimetype.startsWith('image/');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Select Image</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 border-b">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search images..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              variant="outline"
            >
              <Upload className="h-4 w-4 mr-2" />
              {uploading ? 'Uploading...' : 'Upload'}
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              accept="image/*"
            />
          </div>
        </div>

        <div className="p-4 overflow-y-auto max-h-[50vh]">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {filteredFiles.filter(file => isImage(file.mimetype)).map((file) => (
                <Card
                  key={file.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => {
                    onSelect(file.url);
                    onClose();
                  }}
                >
                  <CardContent className="p-2">
                    <img
                      src={file.url}
                      alt={file.originalName}
                      className="w-full h-24 object-cover rounded"
                    />
                    <p className="text-xs text-gray-600 mt-1 truncate">
                      {file.originalName}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!loading && filteredFiles.filter(file => isImage(file.mimetype)).length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No images found. Upload an image to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
