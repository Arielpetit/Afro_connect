import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface Resource {
  title: string;
  source: string;
  description: string;
  category: string;
  url: string;
  image: string;
}

const ResourceFormPage = () => {
  const navigate = useNavigate();
  const { resourceId } = useParams();
  const [resource, setResource] = useState<Resource>({
    title: '',
    source: '',
    description: '',
    category: 'market-trends',
    url: '',
    image: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const resourceCategories = [
    { id: 'market-trends', name: 'Market Trends' },
    { id: 'buying-guides', name: 'Buying Guides' },
    { id: 'legal-advice', name: 'Legal Advice' },
    { id: 'investment-strategies', name: 'Investment Strategies' },
  ];

  useEffect(() => {
    if (resourceId) {
      const fetchResource = async () => {
        try {
          const docRef = doc(db, 'resources', resourceId);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            setResource(docSnap.data() as Resource);
          } else {
            toast.error('Resource not found');
            navigate('/admin');
          }
        } catch (error) {
          console.error('Error fetching resource:', error);
          toast.error('Failed to load resource');
        }
      };
      
      fetchResource();
    }
  }, [resourceId, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      if (resourceId) {
        // Update existing resource
        await updateDoc(doc(db, 'resources', resourceId), resource);
        toast.success('Resource updated successfully');
      } else {
        // Create new resource
        await addDoc(collection(db, 'resources'), {
          ...resource,
          createdAt: new Date()
        });
        toast.success('Resource added successfully');
      }
      navigate(-1);
    } catch (error) {
      console.error('Error:', error);
      toast.error(`Failed to ${resourceId ? 'update' : 'add'} resource`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to admin
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">
            {resourceId ? 'Edit Resource' : 'Add New Resource'}
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form fields remain the same, just update value references to resource */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={resource.title}
                onChange={(e) => setResource({ ...resource, title: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Enter resource title"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Source</label>
                <input
                  type="text"
                  value={resource.source}
                  onChange={(e) => setResource({ ...resource, source: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Source organization"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={resource.category}
                  onChange={(e) => setResource({ ...resource, category: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  {resourceCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={resource.description}
                onChange={(e) => setResource({ ...resource, description: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                rows={4}
                placeholder="Brief description of the resource"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Resource URL</label>
                <input
                  type="url"
                  value={resource.url}
                  onChange={(e) => setResource({ ...resource, url: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="https://example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <input
                  type="text"
                  value={resource.image}
                  onChange={(e) => setResource({ ...resource, image: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>
            </div>

            <div className="pt-6 border-t">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={submitting}
              >
                {submitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {resourceId ? 'Updating...' : 'Submitting...'}
                  </span>
                ) : (
                  resourceId ? 'Update Resource' : 'Publish Resource'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResourceFormPage;