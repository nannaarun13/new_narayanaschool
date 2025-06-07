
import { useState } from 'react';
import { useSchool } from '@/contexts/SchoolContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Gallery = () => {
  const { state, dispatch } = useSchool();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'General', 'Event', 'Festivals', 'Activities'];
  
  const filteredImages = selectedCategory === 'All' 
    ? state.data.galleryImages 
    : state.data.galleryImages.filter(img => img.category === selectedCategory);

  // Increment page visits
  useState(() => {
    dispatch({
      type: 'INCREMENT_PAGE_VISITS'
    });
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Page Header */}
        <section className="text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-school-blue mb-4">
            Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Explore moments and memories from our school life
          </p>
        </section>

        {/* Category Filter */}
        <section className="animate-fade-in">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={selectedCategory === category 
                  ? "bg-school-blue hover:bg-school-blue/90" 
                  : "border-school-blue text-school-blue hover:bg-school-blue hover:text-white"}
              >
                {category}
              </Button>
            ))}
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="animate-fade-in">
          {filteredImages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {selectedCategory === 'All' 
                  ? 'No images in gallery yet.' 
                  : `No images in ${selectedCategory} category yet.`}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredImages.map((image) => (
                <Card key={image.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-school-blue/20">
                  <div className="relative">
                    <img
                      src={image.url}
                      alt={image.caption}
                      className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2">
                      <span className="bg-school-blue text-white px-2 py-1 rounded text-xs">
                        {image.category}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-school-blue mb-2">{image.caption}</h3>
                    <p className="text-sm text-gray-600">{image.date}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Gallery;
