import React from 'react';
import { College } from '../../lib/types';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Button } from './button';
import { useNavigate } from 'react-router-dom';

interface AllCollegeCardProps {
  college: College;
}

const AllCollegeCard: React.FC<AllCollegeCardProps> = ({ college }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/college/${college._id}`);
  };

  return (
    <Card className="glass rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <CardHeader className="p-0">
        {college.profilePic && (
          <img
            src={college.profilePic}
            alt={college.collegeName}
            className="w-full h-48 object-cover"
          />
        )}
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-xl font-bold mb-2 text-white">{college.collegeName}</CardTitle>
        <div className="text-sm text-gray-300 mb-4">
          <p><strong>Location:</strong> {college.location}</p>
          <p><strong>Established:</strong> {college.established}</p>
          <p><strong>NIRF Ranking:</strong> {college.nirfRanking}</p>
          <p><strong>Campus:</strong> {college.campus}</p>
          <p><strong>Total Fees:</strong> {college.totalFees}</p>
        </div>
        <Button onClick={handleViewDetails} className="w-full bg-gradient-to-r from-purple-primary to-purple-light text-white font-bold py-2 px-4 rounded">
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default AllCollegeCard;