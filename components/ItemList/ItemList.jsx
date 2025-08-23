import clsx from 'clsx';
import Card from '../Card/Card';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';

const ItemList = ({ 
  items = [], 
  loading = false, 
  renderItem, 
  emptyMessage = 'No items found',
  className = '',
  gridCols = 'md:grid-cols-2 lg:grid-cols-3'
}) => {
  if (loading) {
    return <Loader size="lg" className="py-12" />;
  }

  if (!Array.isArray(items)) {
    return (
      <Card className="text-center py-12 bg-red-50">
        <div className="text-6xl mb-4">⚠️</div>
        <h3 className="text-xl font-semibold text-red-600 mb-2">
          Invalid data format
        </h3>
        <p className="text-red-600">
          Expected an array of items but received something else.
        </p>
      </Card>
    );
  }

  if (items.length === 0) {
    console.log('ItemList: empty items array');
    return (
      <Card className="text-center py-12">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {emptyMessage}
        </h3>
        <p className="text-gray-600">
          Be the first to share your thoughts with the community!
        </p>
      </Card>
    );
  }

  return (
    <div className={clsx('grid gap-6', gridCols, className)}>
      {items.map((item, index) => (
        <div key={item.id || index}>
          {renderItem ? renderItem(item) : <div>{JSON.stringify(item)}</div>}
        </div>
      ))}
    </div>
  );
};

export default ItemList;
