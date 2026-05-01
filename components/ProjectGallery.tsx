import Image from 'next/image';

interface ProjectGalleryProps {
  images: string[];
  titles?: string[];
  displayMode?: 'grid' | 'carousel';
}

export default function ProjectGallery({ 
  images, 
  titles = [], 
  displayMode = 'grid' 
}: ProjectGalleryProps) {
  if (images.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="font-display text-xl font-bold mb-4 text-black">Project Gallery</h3>
      {displayMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img, index) => (
            <div key={index} className="rounded-xl overflow-hidden border border-black/10 shadow-sm">
              <Image 
                src={img} 
                alt={titles[index] || `Project image ${index + 1}`} 
                width={400}
                height={300}
                className="w-full h-auto object-cover"
                priority={index === 0}
              />
              {titles[index] && (
                <p className="text-sm text-black/60 mt-2 px-2">{titles[index]}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="relative">
          <div className="flex overflow-x-auto pb-2 space-x-4">
            {images.map((img, index) => (
              <div key={index} className="flex-shrink-0 rounded-xl overflow-hidden border border-black/10 shadow-sm w-64">
                <Image 
                  src={img} 
                  alt={titles[index] || `Project image ${index + 1}`} 
                  width={256}
                  height={192}
                  className="w-full h-auto object-cover"
                  priority={index === 0}
                />
                {titles[index] && (
                  <p className="text-xs text-black/60 mt-1 px-2">{titles[index]}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}