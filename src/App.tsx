import React, { useState } from 'react';
import { MapPin, Calendar, Clock, DollarSign, Thermometer, Camera, Info, Navigation, Mountain, Waves, TreePine, Utensils, Menu, X } from 'lucide-react';
import InteractiveMap from './components/InteractiveMap';
import DayCard from './components/DayCard';
import InfoPanel from './components/InfoPanel';
import { itinerary, attractions, routeInfo } from './data/travelData';

function App() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'map' | 'itinerary' | 'info'>('map');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#171717] via-[#1a1a2e] to-[#171717]">
      {/* Hero Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#9E7FFF]/20 via-[#38bdf8]/20 to-[#f472b6]/20 animate-pulse"></div>
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#9E7FFF] to-[#38bdf8] rounded-2xl flex items-center justify-center shadow-lg shadow-[#9E7FFF]/50">
                <Mountain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                  新疆北疆7日游
                </h1>
                <p className="text-[#A3A3A3] text-lg">探索大西洋最后一滴眼泪的传奇之旅</p>
              </div>
            </div>
            
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-12 h-12 bg-[#262626] rounded-xl flex items-center justify-center border border-[#2F2F2F] hover:bg-[#2F2F2F] transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#262626]/80 backdrop-blur-xl rounded-2xl p-4 border border-[#2F2F2F] hover:border-[#9E7FFF]/50 transition-all hover:scale-105">
              <Calendar className="w-6 h-6 text-[#9E7FFF] mb-2" />
              <div className="text-2xl font-bold text-white">7天</div>
              <div className="text-sm text-[#A3A3A3]">完整行程</div>
            </div>
            <div className="bg-[#262626]/80 backdrop-blur-xl rounded-2xl p-4 border border-[#2F2F2F] hover:border-[#38bdf8]/50 transition-all hover:scale-105">
              <Navigation className="w-6 h-6 text-[#38bdf8] mb-2" />
              <div className="text-2xl font-bold text-white">1500km</div>
              <div className="text-sm text-[#A3A3A3]">总里程</div>
            </div>
            <div className="bg-[#262626]/80 backdrop-blur-xl rounded-2xl p-4 border border-[#2F2F2F] hover:border-[#f472b6]/50 transition-all hover:scale-105">
              <MapPin className="w-6 h-6 text-[#f472b6] mb-2" />
              <div className="text-2xl font-bold text-white">12+</div>
              <div className="text-sm text-[#A3A3A3]">核心景点</div>
            </div>
            <div className="bg-[#262626]/80 backdrop-blur-xl rounded-2xl p-4 border border-[#2F2F2F] hover:border-[#10b981]/50 transition-all hover:scale-105">
              <DollarSign className="w-6 h-6 text-[#10b981] mb-2" />
              <div className="text-2xl font-bold text-white">3k-6k</div>
              <div className="text-sm text-[#A3A3A3]">预算范围</div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className={`sticky top-0 z-40 bg-[#171717]/95 backdrop-blur-xl border-b border-[#2F2F2F] ${isMobileMenuOpen ? 'block' : 'hidden lg:block'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:space-x-2 py-4">
            <button
              onClick={() => { setActiveTab('map'); setIsMobileMenuOpen(false); }}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all mb-2 lg:mb-0 ${
                activeTab === 'map'
                  ? 'bg-gradient-to-r from-[#9E7FFF] to-[#38bdf8] text-white shadow-lg shadow-[#9E7FFF]/30'
                  : 'bg-[#262626] text-[#A3A3A3] hover:bg-[#2F2F2F] hover:text-white'
              }`}
            >
              <MapPin className="w-5 h-5" />
              <span>互动地图</span>
            </button>
            <button
              onClick={() => { setActiveTab('itinerary'); setIsMobileMenuOpen(false); }}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all mb-2 lg:mb-0 ${
                activeTab === 'itinerary'
                  ? 'bg-gradient-to-r from-[#9E7FFF] to-[#38bdf8] text-white shadow-lg shadow-[#9E7FFF]/30'
                  : 'bg-[#262626] text-[#A3A3A3] hover:bg-[#2F2F2F] hover:text-white'
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span>详细行程</span>
            </button>
            <button
              onClick={() => { setActiveTab('info'); setIsMobileMenuOpen(false); }}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'info'
                  ? 'bg-gradient-to-r from-[#9E7FFF] to-[#38bdf8] text-white shadow-lg shadow-[#9E7FFF]/30'
                  : 'bg-[#262626] text-[#A3A3A3] hover:bg-[#2F2F2F] hover:text-white'
              }`}
            >
              <Info className="w-5 h-5" />
              <span>旅游信息</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'map' && (
          <div className="space-y-6">
            <div className="bg-[#262626] rounded-3xl overflow-hidden border border-[#2F2F2F] shadow-2xl">
              <InteractiveMap 
                attractions={attractions}
                selectedDay={selectedDay}
                onSelectDay={setSelectedDay}
              />
            </div>
            
            {/* Day Timeline */}
            <div className="bg-[#262626] rounded-3xl p-6 border border-[#2F2F2F]">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Clock className="w-6 h-6 mr-3 text-[#9E7FFF]" />
                行程时间轴
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {itinerary.map((day) => (
                  <button
                    key={day.day}
                    onClick={() => setSelectedDay(selectedDay === day.day ? null : day.day)}
                    className={`text-left p-4 rounded-2xl border-2 transition-all hover:scale-105 ${
                      selectedDay === day.day
                        ? 'bg-gradient-to-br from-[#9E7FFF]/20 to-[#38bdf8]/20 border-[#9E7FFF]'
                        : 'bg-[#171717] border-[#2F2F2F] hover:border-[#9E7FFF]/50'
                    }`}
                  >
                    <div className="text-sm text-[#9E7FFF] font-semibold mb-1">Day {day.day}</div>
                    <div className="text-white font-medium mb-2">{day.title}</div>
                    <div className="flex items-center text-xs text-[#A3A3A3]">
                      <Navigation className="w-3 h-3 mr-1" />
                      {day.distance}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'itinerary' && (
          <div className="space-y-6">
            {itinerary.map((day) => (
              <DayCard key={day.day} day={day} />
            ))}
          </div>
        )}

        {activeTab === 'info' && (
          <InfoPanel routeInfo={routeInfo} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#171717] border-t border-[#2F2F2F] mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#9E7FFF] to-[#38bdf8] rounded-xl flex items-center justify-center">
                  <Mountain className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-bold text-lg">新疆旅游</span>
              </div>
              <p className="text-[#A3A3A3] text-sm">
                探索新疆北疆的壮丽风光，体验独特的民族文化，留下难忘的旅行回忆。
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">快速链接</h3>
              <ul className="space-y-2 text-sm text-[#A3A3A3]">
                <li className="hover:text-[#9E7FFF] cursor-pointer transition-colors">旅游咨询</li>
                <li className="hover:text-[#9E7FFF] cursor-pointer transition-colors">预订服务</li>
                <li className="hover:text-[#9E7FFF] cursor-pointer transition-colors">安全须知</li>
                <li className="hover:text-[#9E7FFF] cursor-pointer transition-colors">联系我们</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">紧急联系</h3>
              <ul className="space-y-2 text-sm text-[#A3A3A3]">
                <li>旅游投诉: 12301</li>
                <li>旅游咨询: 0991-2801111</li>
                <li>紧急救援: 110/120/119</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-[#2F2F2F] mt-8 pt-8 text-center text-sm text-[#A3A3A3]">
            <p>© 2025 新疆北疆旅游. 版本 V1.0 | 适用期间：五一假期（4-5月）</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
