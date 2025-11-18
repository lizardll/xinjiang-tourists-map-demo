import React from 'react';
import { DollarSign, Thermometer, Package, AlertCircle, Phone, Shield, Utensils, Camera } from 'lucide-react';

interface RouteInfo {
  budget: {
    groupTour: string;
    privateTour: string;
    tickets: { name: string; price: string }[];
  };
  weather: {
    temperature: string;
    characteristics: string[];
  };
  essentials: {
    protection: string[];
    clothing: string[];
    electronics: string[];
    medicine: string[];
  };
  food: {
    location: string;
    dishes: string[];
    rating: number;
  }[];
  tips: string[];
  emergency: {
    tourism: string;
    consultation: string;
    rescue: string;
  };
}

interface InfoPanelProps {
  routeInfo: RouteInfo;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ routeInfo }) => {
  return (
    <div className="space-y-6">
      {/* Budget Section */}
      <div className="bg-[#262626] rounded-3xl p-6 border border-[#2F2F2F]">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <DollarSign className="w-6 h-6 mr-3 text-[#10b981]" />
          预算参考
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#171717] p-6 rounded-2xl border border-[#2F2F2F]">
            <div className="text-[#A3A3A3] text-sm mb-2">跟团游</div>
            <div className="text-3xl font-bold text-white mb-2">{routeInfo.budget.groupTour}</div>
            <div className="text-sm text-[#A3A3A3]">包含住宿、交通、门票</div>
          </div>
          <div className="bg-[#171717] p-6 rounded-2xl border border-[#2F2F2F]">
            <div className="text-[#A3A3A3] text-sm mb-2">包车自由行</div>
            <div className="text-3xl font-bold text-white mb-2">{routeInfo.budget.privateTour}</div>
            <div className="text-sm text-[#A3A3A3]">更灵活的行程安排</div>
          </div>
        </div>
        <div className="space-y-3">
          <h3 className="text-white font-semibold mb-3">主要门票价格</h3>
          {routeInfo.budget.tickets.map((ticket, idx) => (
            <div key={idx} className="flex items-center justify-between bg-[#171717] p-4 rounded-xl border border-[#2F2F2F]">
              <span className="text-[#A3A3A3]">{ticket.name}</span>
              <span className="text-[#10b981] font-bold">{ticket.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Weather & Equipment */}
      <div className="bg-[#262626] rounded-3xl p-6 border border-[#2F2F2F]">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Thermometer className="w-6 h-6 mr-3 text-[#f59e0b]" />
          天气与装备
        </h2>
        <div className="mb-6">
          <div className="bg-[#171717] p-6 rounded-2xl border border-[#2F2F2F]">
            <div className="text-[#A3A3A3] text-sm mb-2">五一期间温度</div>
            <div className="text-2xl font-bold text-white mb-4">{routeInfo.weather.temperature}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {routeInfo.weather.characteristics.map((char, idx) => (
                <div key={idx} className="flex items-center text-sm text-[#A3A3A3]">
                  <div className="w-2 h-2 bg-[#f59e0b] rounded-full mr-2"></div>
                  {char}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-white font-semibold mb-3 flex items-center">
              <Shield className="w-4 h-4 mr-2 text-[#9E7FFF]" />
              防护用品
            </h3>
            <div className="space-y-2">
              {routeInfo.essentials.protection.map((item, idx) => (
                <div key={idx} className="bg-[#171717] p-3 rounded-xl border border-[#2F2F2F] text-sm text-[#A3A3A3]">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3 flex items-center">
              <Package className="w-4 h-4 mr-2 text-[#38bdf8]" />
              服装建议
            </h3>
            <div className="space-y-2">
              {routeInfo.essentials.clothing.map((item, idx) => (
                <div key={idx} className="bg-[#171717] p-3 rounded-xl border border-[#2F2F2F] text-sm text-[#A3A3A3]">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Food Recommendations */}
      <div className="bg-[#262626] rounded-3xl p-6 border border-[#2F2F2F]">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Utensils className="w-6 h-6 mr-3 text-[#f472b6]" />
          特色美食
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {routeInfo.food.map((food, idx) => (
            <div key={idx} className="bg-[#171717] p-5 rounded-2xl border border-[#2F2F2F] hover:border-[#f472b6]/30 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-semibold">{food.location}</h3>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-lg ${i < food.rating ? 'text-[#f59e0b]' : 'text-[#2F2F2F]'}`}>
                      ⭐
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                {food.dishes.map((dish, dishIdx) => (
                  <div key={dishIdx} className="flex items-center text-sm text-[#A3A3A3]">
                    <div className="w-1.5 h-1.5 bg-[#f472b6] rounded-full mr-2"></div>
                    {dish}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Important Tips */}
      <div className="bg-[#262626] rounded-3xl p-6 border border-[#2F2F2F]">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <AlertCircle className="w-6 h-6 mr-3 text-[#ef4444]" />
          重要提示
        </h2>
        <div className="space-y-3">
          {routeInfo.tips.map((tip, idx) => (
            <div key={idx} className="flex items-start space-x-3 bg-[#171717] p-4 rounded-xl border border-[#2F2F2F]">
              <div className="w-6 h-6 bg-[#ef4444]/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[#ef4444] font-bold text-sm">{idx + 1}</span>
              </div>
              <p className="text-[#A3A3A3] text-sm">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-gradient-to-br from-[#ef4444]/10 to-[#f59e0b]/10 rounded-3xl p-6 border border-[#ef4444]/20">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Phone className="w-6 h-6 mr-3 text-[#ef4444]" />
          紧急联系方式
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#171717]/80 p-5 rounded-2xl border border-[#2F2F2F]">
            <div className="text-[#A3A3A3] text-sm mb-2">旅游投诉热线</div>
            <div className="text-2xl font-bold text-white">{routeInfo.emergency.tourism}</div>
          </div>
          <div className="bg-[#171717]/80 p-5 rounded-2xl border border-[#2F2F2F]">
            <div className="text-[#A3A3A3] text-sm mb-2">新疆旅游咨询</div>
            <div className="text-2xl font-bold text-white">{routeInfo.emergency.consultation}</div>
          </div>
          <div className="bg-[#171717]/80 p-5 rounded-2xl border border-[#2F2F2F]">
            <div className="text-[#A3A3A3] text-sm mb-2">紧急救援</div>
            <div className="text-2xl font-bold text-white">{routeInfo.emergency.rescue}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;
