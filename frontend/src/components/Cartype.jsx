import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Cartype.css'; // Assuming you still want the CSS for styling

const CarType = () => {
  // Sample car data (You can replace this with dynamic data from an API or database)
  const cars = [
    { name: 'HONDA', image: 'Honda_CRV.png', route: '/honda' },
    { name: 'FORD', image: 'Ford_Mustang.png', route: '/ford' },
    { name: 'TOYOTA', image: 'Toyota_Camry.png', route: '/toyota' },
    { name: 'TESLA', image: 'Tesla_Model_S.png', route: '/tesla' }
  ];

  return (
    <div id='cartype'>
      <h1 className="car-type-heading">Find By Car Type</h1>
      <p>Simply browse through our extensive selection of cars to find the perfect fit for your needs.</p>

      <div className="car-types">
        {cars.map((car, index) => (
          <div key={index} className="car-type-card">
            <Link to={car.route}> {/* Use Link to redirect */}
              <img src={car.image} alt={car.name} />
              <h3>{car.name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarType;
