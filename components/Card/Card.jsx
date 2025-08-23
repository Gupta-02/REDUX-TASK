import clsx from 'clsx';

const Card = ({ children, className = '', ...props }) => {
  return (
    <div
      className={clsx(
        'bg-white rounded-lg border border-gray-200 shadow-sm p-6',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
