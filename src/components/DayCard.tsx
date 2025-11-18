import React from 'react';
import { Calendar, MapPin, Clock, Navigation, Camera, Utensils, Hotel } from 'lucide-react';

interface Activity {
  time: string;
  activity: string;
  location: string;
}

interface DayItinerary {
  day: number;
  title: string;
  subtitle: string;
  distance: string;
  duration: string;
  activities: Activity[];
  highlights: string[];
  accommodation: string;
  meals: string[];
  image: string;
}

interface DayCardProps {
  day: DayItinerary;
}

const DayCard: React.FC<DayCardProps> = ({ day }) => {
  return (
    <div className="bg-[#262626] rounded-3xl overflow-hidden border border-[#2F2F2F] hover:border-[#9E7FFF]/50 transition-all group">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={day.image} 
          alt={day.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/50 to-transparent"></div>
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center space-x-3 mb-2">
            <span className="px-4 py-2 bg-gradient-to-r from-[#9E7FFF] to-[#38bdf8] text-white text-sm font-bold rounded-full">
              Day {day.day}
            </span>
            <div className="flex items-center text-white/80 text-sm">
              <Navigation className="w-4 h-4 mr-1" />
              {day.distance}
            </div>
            <div className="flex items-center text-white/80 text-sm">
              <Clock className="w-4 h-4 mr-1" />
              {day.duration}
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{day.title}</h3>
          <p className="text-[#A3A3A3]">{day.subtitle}</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Activities Timeline */}
        <div>
          <h4 className="text-white font-semibold mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-[#9E7FFF]" />
            行程安排
          </h4>
          <div className="space-y-3">
            {day.activities.map((activity, idx) => (
              <div key={idx} className="flex items-start space-x-4 group/item">
                <div className="flex-shrink-0 w-20 text-sm font-medium text-[#9E7FFF] bg-[#171717] px-3 py-2 rounded-xl border border-[#2F2F2F]">
                  {activity.time}
                </div>
                <div className="flex-1 bg-[#171717] p-4 rounded-xl border border-[#2F2F2F] group-hover/item:border-[#9E7FFF]/30 transition-colors">
                  <div className="text-white font-medium mb-1">{activity.activity}</div>
                  <div className="flex items-center text-sm text-[#A3A3A3]">
                    <MapPin className="w-3 h-3 mr-1" />
                    {activity.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Highlights */}
        <div>
          <h4 className="text-white font-semibold mb-4 flex items-center">
            <Camera className="w-5 h-5 mr-2 text-[#38bdf8]" />
            精彩亮点
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {day.highlights.map((highlight, idx) => (
              <div 
                key={idx}
                className="flex items-start space-x-3 bg-[#171717] p-3 rounded-xl border border-[#2F2F2F] hover:border-[#38bdf8]/30 transition-colors"
              >
                <div className="w-2 h-2 bg-[#38bdf8] rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm text-[#A3A3A3]">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#2F2F2F]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#171717] rounded-xl flex items-center justify-center border border-[#2F2F2F]">
              <Hotel className="w-5 h-5 text-[#f472b6]" />
            </div>
            <div>
              <div className="text-xs text-[#A3A3A3]">住宿</div>
              <div className="text-sm text-white font-medium">{day.accommodation}</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#171717] rounded-xl flex items-center justify-center border border-[#2F2F2F]">
              <Utensils className="w-5 h-5 text-[#10b981]" />
            </div>
            <div>
              <div className="text-xs text-[#A3A3A3]">美食推荐</div>
              <div className="text-sm text-white font-medium">{day.meals.join('、')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayCard;
